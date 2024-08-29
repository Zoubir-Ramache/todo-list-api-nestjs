import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { Todos } from './todos';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from './entities/todo.entity';

@Module({
  imports:[SequelizeModule.forFeature([Todo])],
  controllers: [TodosController],
  providers: [Todos]
})
export class TodosModule {}
