import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
