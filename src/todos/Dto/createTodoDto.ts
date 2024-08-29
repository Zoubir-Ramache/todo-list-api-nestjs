import {ApiProperty} from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsNumber  } from 'class-validator';

export class CreateTodoDto{

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"title for the todo"})
    private title:string
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"content of todo"})
    private content:string

    
}
