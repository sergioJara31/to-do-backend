import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Task } from './todo/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.modules';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://todo_app_owner:8epK6WQlfGCj@ep-nameless-leaf-a5e3ugab.us-east-2.aws.neon.tech/todo_app?sslmode=require',
      ssl: true,
      entities: [Task],
      synchronize: true
  }),
  TodoModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
