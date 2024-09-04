import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Db } from 'src/db/db';
@Injectable()
export class Todos {
  constructor(private readonly db: Db) {}

  async getAllTodos() {
    return await this.db.todos.findMany();
  }

  async addTodo(createTodoDto: Prisma.TodosCreateInput) {
    return this.db.todos.create({
      data: createTodoDto,
    });
  }

  async updateTodo(id: number, updateTodoDto: Prisma.TodosUpdateInput) {
    return this.db.todos.update({
      where: {
        id,
      },
      data: updateTodoDto,
    });
  }
}
