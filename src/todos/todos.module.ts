import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { Todos } from './todos';

@Module({
  controllers: [TodosController],
  providers: [Todos]
})
export class TodosModule {}
