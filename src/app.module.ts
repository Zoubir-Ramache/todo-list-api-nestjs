import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { dbConfig } from './db/db.config';
@Module({
  imports: [TodosModule , SequelizeModule.forRoot(dbConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
