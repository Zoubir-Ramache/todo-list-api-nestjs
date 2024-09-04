import { Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
export class CreateTodosDto implements Prisma.TodosCreateInput{

    @ApiProperty({
        title:"title", 
    })
    title: string;
    @ApiProperty({
        title:"content"
    })
    content: string;
    @ApiProperty({
        title:"owner"
    })
    owner: Prisma.UserCreateNestedOneWithoutUsertodosInput;


}