import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import * as mongodb from 'mongodb';

import { Todo } from './models/todo.interface';

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  async findAll(): Promise<Todo[]> {
    const todosFromDb = await this.todoModel.find().exec();

    const todos = todosFromDb.map(todo => ({
      id: todo.id,
      name: todo.name,
      completed: todo.completed,
      archived: todo.archived,
    }));

    return todos;
  }

  async find(id: string): Promise<any> {
    const todoFromDb = await this.todoModel.findOne({
      _id: mongodb.ObjectID(id),
    });

    if (!todoFromDb) {
      throw new NotFoundException();
    }

    return {
      id: todoFromDb.id,
      name: todoFromDb.name,
      completed: todoFromDb.completed,
      archived: todoFromDb.archived,
    };
  }
}
