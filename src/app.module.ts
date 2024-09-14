import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [TodosModule, DbModule,  AuthModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
