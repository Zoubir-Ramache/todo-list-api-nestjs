import { Controller, Get, Post, Body, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { CreateSignUpDto } from './dto/create-sign-up.dto';

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

}
