import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
export class CreateSignUpDto implements Prisma.UserCreateInput {
  @ApiProperty({
    title: 'username',
  })
  @IsNotEmpty()
  @IsEmail()
  username: string;
  @ApiProperty({
    title: 'password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
  @ApiProperty({
    title: 'firstName',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @ApiProperty({
    title: 'lastName',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;
}
