import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DbModule } from 'src/db/db.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWTStrategy } from './jwtStrategy';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
      }),
      
    }),
    ConfigModule , 
    DbModule
  ],
  controllers:[AuthController],
  providers:[JWTStrategy , AuthService] , 
  exports:[PassportModule ,JwtModule]
})

export class AuthModule {}
