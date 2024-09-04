import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { DbModule } from './db/db.module';
import { LoginModule } from './login/login.module';
import { UserInfoModule } from './user-info/user-info.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { AuthModule } from './guards/auth/auth.module';


@Module({
  imports: [TodosModule, DbModule, LoginModule, SignUpModule, UserInfoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
