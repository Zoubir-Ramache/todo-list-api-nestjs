import { Prisma } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
export class CreateTodosDto {

    @ApiProperty({
        title:"title", 
    })
    title: string;
    @ApiProperty({
        title:"content"
    })
    content: string;
    


}