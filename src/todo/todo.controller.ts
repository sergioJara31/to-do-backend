import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import CreateTaskDto from './dto/create-task.dto';
import UpdateTaskDto from './dto/update-task.dto';


/* http/localhost:3000/todo */
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

/* http/localhost:3000/todo/all = obtener todas las tareas */
  @Get('all')
  async findAll() {
    return await this.todoService.getAll();
  }

  /* http/localhost:3000/todo/create = Crear una nueva tarea*/
  @Post('create')
  async create(@Body() task: CreateTaskDto) {
    return await this.todoService.create(task);
  }

  /* http/localhost:3000/todo/update/{id} = editar/actualizar una tarea especifica */
  @Put('update/:id')
  async update(@Param('id') id: number, @Body() task: UpdateTaskDto) {
    return await this.todoService.update(id, task);
  }

  /* http/localhost:3000/todo/delete/{id} = eliminar una tarea especifica */
  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    return await this.todoService.delete(id);
  } 
}
