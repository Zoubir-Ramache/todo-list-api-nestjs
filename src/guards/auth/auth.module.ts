import { Module } from '@nestjs/common';
import { JWTStrategy } from './jwtStrategy';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret:configService.get<string>("JWT_SECRET") , 
        signOptions:{expiresIn:"1h"}
      }),
      
    }),
    ConfigModule
  ],
  providers:[JWTStrategy] , 
  exports:[PassportModule ,JwtModule]
})
export class AuthModule {}
