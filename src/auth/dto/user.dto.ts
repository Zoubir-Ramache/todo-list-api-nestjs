import { Prisma } from '@prisma/client';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
export class UserDto implements Prisma.UserUpdateInput {
  @IsNotEmpty()
  @IsEmail()
  username: string;
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  id: string ;
}
