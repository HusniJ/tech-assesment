import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User, UserSchema} from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://test:123qwe@cluster0.dcn8b.mongodb.net/assesment?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{name : User.name, schema: UserSchema}])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
