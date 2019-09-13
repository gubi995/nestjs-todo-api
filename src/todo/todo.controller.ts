import { Controller, Get, Param, Post } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(): string {
    return this.todoService.findAll();
  }

  @Get(':id')
  find(@Param('id') id: string): string {
    return this.todoService.find(id);
  }
}
