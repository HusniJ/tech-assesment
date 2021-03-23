import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class AppService {

  constructor(@InjectModel(User.name) private userModal: Model<UserDocument>) {}

  getHello(): string {
    return 'Hello World!';
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModal(createUserDto);
    return createdUser.save();
  }

  async getAll(): Promise<User[]> {
    return this.userModal.find().exec();
  }
}
