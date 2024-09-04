import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { Todos } from './todos';
import { DbModule } from 'src/db/db.module';
@Module({
  controllers: [TodosController],
  providers: [Todos] , 
  imports:[DbModule]
})
export class TodosModule {}
