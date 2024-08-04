import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './todo.entity';
import { Repository } from 'typeorm';
import CreateTaskDto from './dto/create-task.dto';
import { OkResponse } from 'src/types';

@Injectable()
export class TodoService {

  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) { }


  /**
   * @description Obtiene todas las tareas
   * @author Sergio Jaramillo
   * @date 03/08/2024
   * @returns {Promise<Task[]>} Retorna un arreglo de tareas
  */
  async getAll(): Promise<Task[]> {
    try {
      const tasks = await this.taskRepository.find();

      if (!tasks) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      return tasks;
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * @description Crea una nueva tarea
   * @param {CreateTaskDto} task - Objeto con la información de la tarea
   * @author Sergio Jaramillo
   * @date 03/08/2024
   * @returns {Promise<Task>} Retorna la tarea creada
  */
  async create(task: CreateTaskDto): Promise<Task> {
    try {
      const newTask = this.taskRepository.create(task);
      return await this.taskRepository.save(newTask);
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * @description Actualiza una tarea
   * @param {number} id - Identificador de la tarea
   * @param {CreateTaskDto} task - Objeto con la información de la tarea
   * @author Sergio Jaramillo
   * @date 04/08/2024
   * @returns {Promise<OkResponse>} Retorna un mensaje de éxito
  */  
  async update(id: number, task: CreateTaskDto): Promise<OkResponse> {
    try {
      const updatedTask = await this.taskRepository.update(id, task);

      if (!updatedTask) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      return {
        message: 'Task updated successfully',
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * @description Elimina una tarea
   * @param {number} id - Identificador de la tarea
   * @author Sergio Jaramillo
   * @date 04/08/2024
   * @returns {Promise<OkResponse>} Retorna un mensaje de éxito
  */
  async delete(id: number): Promise<OkResponse> {
    try {
      const task = await this.taskRepository.findOne({ where: { id } });

      if (!task) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      await this.taskRepository.delete(id);

      return {
        message: 'Task deleted successfully',
        status: HttpStatus.OK
      };
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}