import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoService {
  findAll(): string {
    return 'findAll';
  }

  find(id: string): string {
    return `find ${id}`;
  }
}
