import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './Dto/createTodoDto';
import { UpdateTodoDto } from './Dto/updateTodoDto';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from './entities/todo.entity';
@Injectable()
export class Todos {
  constructor(
    @InjectModel(Todo)
    private todoRepository: typeof Todo,
  ) {}

  getAllTodos() {
    return this.todoRepository.findAll();
  }
  addTodo(createTodoDto: CreateTodoDto) {
    return this.todoRepository.create(createTodoDto as any);
  }
  updateTodo(id: number, updateTodoDto: UpdateTodoDto) {
    return id;
  }
}
