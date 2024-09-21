import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'src/db/db';
import { REQUEST } from '@nestjs/core';
import { CreateTodosDto } from './dto/create-todos.dto';
import { updateTodoDto } from './dto/update-todos.dto';
import { JwtRequest } from 'src/types/jwt-request.interface';
@Injectable()
export class Todos {
  constructor(
    private readonly db: Db,
    @Inject(REQUEST) private readonly req: JwtRequest,
  ) {}

  private getUserID() {
    return this.req.user.userId;
  }
  async getAllTodos() {
    return await this.db.todos.findMany({
      where: {
        ownerId: this.getUserID(),
      },
      select: {
        title: true,
        content: true,
        id: true,
        owner: {
          select: {
            firstName: true,
            lastName: true,
            username: true,
          },
        },
      },
    });
  }

  async addTodo(createTodoDto: CreateTodosDto) {
    return this.db.todos.create({
      data: {
        ...createTodoDto,
        ownerId: this.getUserID(),
      }, omit:{
        ownerId:true
      }
    });
  }

  async updateTodo(id: number, updateTodoDto: updateTodoDto) {
    return this.db.todos.update({
      where: {
        id,
      },
      data: { ...updateTodoDto, ownerId: this.getUserID() },
    });
  }
}
