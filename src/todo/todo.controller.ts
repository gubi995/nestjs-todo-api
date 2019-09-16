import { Controller, Get, Param } from '@nestjs/common';

import { TodoService } from './todo.service';
import { Todo } from './models/todo.interface';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  find(@Param('id') id: string): Promise<Todo> {
    return this.todoService.find(id);
  }
}
