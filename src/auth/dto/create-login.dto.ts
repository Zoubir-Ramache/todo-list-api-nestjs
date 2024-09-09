import { ApiProperty } from '@nestjs/swagger';
export class CreateLoginDto   {
    @ApiProperty({
        title:"username" ,
    })
    username: string;

    @ApiProperty({
        title:"password" , 
    })
    password: string;
}
