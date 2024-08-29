import { Controller , Post  , Body, Get, Patch, Param, ParseIntPipe} from '@nestjs/common';
import { CreateTodoDto } from './Dto/createTodoDto';
import { Todos } from './todos';
import { UpdateTodoDto } from './Dto/updateTodoDto';
import { ApiParam  } from '@nestjs/swagger';
@Controller('todos')
export class TodosController {

    constructor(private readonly todos:Todos){}
    @Get()
    getAllTodos(){
        return this.todos.getAllTodos()
    }

    @Post()
    createTodo(@Body() todoDto:CreateTodoDto){
        return this.todos.addTodo(todoDto)
    }
    @Patch(':id')
    @ApiParam({
        name:'id' , 
        type:Number ,
        description:"id of the todo list " 
    })
    updateTodo(@Param('id' , ParseIntPipe) id:number ,@Body() updateTodoDto:UpdateTodoDto ){
        return this.todos.updateTodo(id , updateTodoDto)
    }
}
