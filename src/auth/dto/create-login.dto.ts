import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateLoginDto   {
    @ApiProperty({
        title:"username" ,
    })
    @IsEmail()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        title:"password" , 
    })
    @IsNotEmpty()
    password: string;
}
