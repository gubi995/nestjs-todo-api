import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';

const connectionUri =
  'mongodb+srv://testUser:<password>@sandbox-tdoan.mongodb.net/todo-db?retryWrites=true&w=majority';

@Module({
  imports: [
    TodoModule,
    MongooseModule.forRoot(connectionUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
