import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Db } from 'src/db/db';
import { CreateSignUpDto } from './dto/create-sign-up.dto';
import { CreateLoginDto } from './dto/create-login.dto';
import { JwtRequest } from 'src/types/jwt-request.interface';

@Injectable()
export class AuthService {
  constructor(
    private db: Db,
    private jwtService: JwtService,
  ) {}

  //! create user
  async createUser(createUserDto: CreateSignUpDto) {
    const { password, username } = createUserDto;

    const existingUser = await this.db.user.findUnique({
      where: {
        username,
      },
    });
    if (existingUser) {
      throw new ConflictException('User already exists ');
    }

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await this.db.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
      omit: {
        password: true,
      },
    });

    const { accessToken, refreshToken } = await this.generateUserTokens(user);
    delete user.id
    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  //! login
  async findUser(userDto: CreateLoginDto) {
    const user = await this.db.user.findFirst({
      where: {
        username: userDto.username,
      },
    });

    this.verifyUser(userDto, user);
    const { accessToken, refreshToken } = await this.generateUserTokens(user);
    delete user.password
    delete user.id
    return {
      user ,
      accessToken,
      refreshToken,
    };
  }

  //! get user info
  async getUserInfo(req: JwtRequest) {
    const id = req.user.userId;

    const userInfo = await this.db.user.findFirst({
      where: { id },
      omit: {
        password: true,
        id:true
      },
    });

    if (userInfo) {
      return { ...userInfo };
    }
    throw new UnauthorizedException('user not found');
  }

  //! get refresh token
  async getRefreshToken(req: JwtRequest) {
    const authHeader = req.headers['authorization'] as string;
    if (!authHeader) throw new UnauthorizedException(' token required');
    const [Bearer, authToken] = authHeader.split('');
    if (Bearer !== 'Bearer' || !authToken)
      throw new UnauthorizedException(' invalid bearer token format');

    const token = await this.db.refreshToken.findFirst({
      where: {
        token: authToken,
        expirationDate: {
          gte: new Date(),
        },
      },
    });

    if (!token) {
      throw new UnauthorizedException('token expired or not found');
    }
    const user = {
      id: req.user.userId,
      username: req.user.username,
    };
    const { accessToken, refreshToken } = await this.generateUserTokens(user);
    return {
      accessToken,
      refreshToken,
    };
  }

  private verifyUser(loginDto: CreateLoginDto, user: CreateLoginDto) {
    if (user) {
      const verifiedUser = bcrypt.compare(user.password, loginDto.password);
      if (verifiedUser) {
        return;
      }
    }
    throw new UnauthorizedException(' wrong cridentials');
  }

  private async generateUserTokens(user: { username: string; id: string }) {
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
    });
    const refreshToken = this.jwtService.sign(payload);
    const refreshTokenExpireDate = new Date();
    refreshTokenExpireDate.setDate(refreshTokenExpireDate.getDate() + 3);
    await this.db.refreshToken.upsert({
      where: { userId: user.id },
      update: {
        token: refreshToken,
        expirationDate: refreshTokenExpireDate,
      },
      create: {
        token: refreshToken,
        expirationDate: refreshTokenExpireDate,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
