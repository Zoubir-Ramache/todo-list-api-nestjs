import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateSignUpDto } from './dto/create-sign-up.dto';
import { CreateLoginDto } from './dto/create-login.dto';
import { JwtService } from '@nestjs/jwt';
import { Db } from 'src/db/db';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private db: Db,
    private jwtService: JwtService,
  ) {}

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
    });

    const { accessToken, refreshToken } = this.generateUserTokens(user);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async findUser(userDto: CreateLoginDto) {
    const user = await this.db.user.findFirst({
      where: {
        username: userDto.username,
      },
    });

    this.verifyUser(userDto, user);
    const { accessToken, refreshToken } = this.generateUserTokens(user);
    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  private verifyUser(loginDto: CreateLoginDto, user: CreateLoginDto) {
    const verifiedUser = bcrypt.compare(user.password, loginDto.password);
    if (!verifiedUser) {
      throw new UnauthorizedException(' wrong cridentials');
    }
  }
  private generateUserTokens(user: Prisma.UserCreateInput) {
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h'
    });
    const refreshToken = this.jwtService.sign(payload );
    const refreshTokenExpireDate = new Date();
    refreshTokenExpireDate.setDate(refreshTokenExpireDate.getDate() + 3);
    this.db.refreshToken.create({
      data: {
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
