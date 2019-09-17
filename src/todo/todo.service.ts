import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import * as mongodb from 'mongodb';

import { Todo } from './models/todo.interface';
import { TodoDto } from './models/todo.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  async findAll(): Promise<Todo[]> {
    const todosFromDb = await this.todoModel.find();

    const todos = todosFromDb.map(todo => ({
      id: todo.id,
      name: todo.name,
      completed: todo.completed,
      archived: todo.archived,
    }));

    return todos;
  }

  async find(id: string): Promise<Todo> {
    const todoFromDb = await this.todoModel.findById(id);

    if (!todoFromDb) {
      throw new NotFoundException('Todo not found');
    }

    return {
      id: todoFromDb.id,
      name: todoFromDb.name,
      completed: todoFromDb.completed,
      archived: todoFromDb.archived,
    };
  }

  async create(name: string): Promise<Todo> {
    const todo = { name, completed: false, archived: false };
    const todoFromDb = await this.todoModel.create(todo);

    return {
      id: todoFromDb.id,
      name: todoFromDb.name,
      completed: todoFromDb.completed,
      archived: todoFromDb.archived,
    };
  }

  async update(id: string, todoDto: TodoDto): Promise<void> {
    const todoFromDb = await this.todoModel.updateOne(
      { _id: new mongodb.ObjectID(id) },
      { $set: { ...todoDto } },
    );

    if (!todoFromDb.n) {
      throw new NotFoundException('Update was unsuccessful. Todo not found');
    }
  }

  async delete(id: string): Promise<void> {
    const todoFromDb = await this.todoModel.deleteOne({
      _id: new mongodb.ObjectID(id),
    });

    if (!todoFromDb.n) {
      throw new NotFoundException('Delete was unsuccessful. Todo not found');
    }
  }
}
