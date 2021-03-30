import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User, UserSchema} from './schema/user.schema';
import { UserImage, UserImageSchema } from './schema/userimages.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_CONN),
    MongooseModule.forFeature([
      {name : User.name, schema: UserSchema},
      {name : UserImage.name, schema: UserImageSchema}
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
