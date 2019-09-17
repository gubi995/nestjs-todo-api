import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';

import { TodoService } from './todo.service';
import { Todo } from './models/todo.interface';
import { TodoDto } from './models/todo.dto';

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

  @Post()
  create(@Body('name') name: string): Promise<Todo> {
    return this.todoService.create(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() todoDto: TodoDto): Promise<void> {
    return this.todoService.update(id, todoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.todoService.delete(id);
  }
}
