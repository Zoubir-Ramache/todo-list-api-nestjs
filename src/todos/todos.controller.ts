import { Controller , Post  , Body, Get, Patch, Param, ParseIntPipe , UseGuards} from '@nestjs/common';
import { Todos } from './todos';
import { ApiParam  } from '@nestjs/swagger';
import { CreateTodosDto } from './dto/create-todos.dto';
import { updateTodoDto } from './dto/update-todos.dto';
// import { JWTAuthGuard } from 'src/guards/auth/auth.guard';
@Controller('todos')
// @UseGuards(JWTAuthGuard)
export class TodosController {

    constructor(private readonly todos:Todos){}
    @Get()
    getAllTodos(){
        return this.todos.getAllTodos()
    }

    @Post()
    createTodo(@Body() todoDto:CreateTodosDto){
        return this.todos.addTodo(todoDto)
    }
    @Patch(':id')
    @ApiParam({
        name:'id' , 
        type:Number ,
        description:"id of the todo list " 
    })
    updateTodo(@Param('id' , ParseIntPipe) id:number ,@Body() updateTodoDto:updateTodoDto){
        return this.todos.updateTodo(id , updateTodoDto)
    }
}
