import { Controller, Get, Post, Body, Req, UseGuards, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { CreateSignUpDto } from './dto/create-sign-up.dto';
import { JWTAuthGuard } from './guards/auth.guard';
import { JwtRequest } from 'src/types/jwt-request.interface';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  findUser(@Body() createLoginDto:CreateLoginDto ) {
    return this.authService.findUser(createLoginDto);
  }

  @Post("sign-up")
  createUser(@Body() createUserDto :CreateSignUpDto) {
    return this.authService.createUser(createUserDto);
  }

  @UseGuards(JWTAuthGuard)
  @Get("user-info")
  getUserInfo(@Req() req:JwtRequest ){
    return this.authService.getUserInfo(req)
  }
  @UseGuards(JWTAuthGuard)
  @Get("refresh-token")
  getRefreshToken(@Req() req:JwtRequest){
    return this.authService.getRefreshToken(req)
  }
}
