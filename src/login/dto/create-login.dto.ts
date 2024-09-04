import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class CreateLoginDto   implements Prisma.TodosCreateInput{
    @ApiProperty({
        title:"todo title " ,
        example:"study math"  
    })
    title: string;

    @ApiProperty({
        title:"owner id  " , 
    })
    owner: Prisma.UserCreateNestedOneWithoutUsertodosInput;
    @ApiProperty({
        title:"content" , 
    })
    content: string;
}
