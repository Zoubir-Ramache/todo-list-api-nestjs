import { Controller , Post  , Body} from '@nestjs/common';
import {ApiProperty} from "@nestjs/swagger"
import { IsString, IsInt } from 'class-validator';
class TodoDto{
    @IsString()
    @ApiProperty({description:"tis is name"})
    public name:string
    
    public description:string

    
}
@Controller('todos')
export class TodosController {



    @Post()
    addTodo(@Body() todoDto:TodoDto  ){
        return {message:"done"}
    }
}
