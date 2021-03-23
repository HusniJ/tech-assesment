import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { UserImage, UserImageDocument} from './schema/userimages.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { CreateUserImagesDto } from './dto/createUserImages.dto';

@Injectable()
export class AppService {

  constructor(
    @InjectModel(User.name) private userModal: Model<UserDocument>,
    @InjectModel(UserImage.name) private userImageModal: Model<UserImageDocument>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModal(createUserDto);
    return createdUser.save();
  }

  async getAll(): Promise<User[]> {
    return this.userModal.find().exec();
  }

  async getById(userId: string): Promise<User> {
    return this.userModal.findOne({ userId: userId}).exec();
  }

  async update(createUserDto: CreateUserDto): Promise<User> {
    return this.userModal.findOneAndUpdate({ userId: createUserDto.userId}, createUserDto).exec();
  }

  async delete(userId: string): Promise<User> {
    return this.userModal.findOneAndDelete({ userId: userId}).exec();
  }

  async createImages(createUserImagesDto: CreateUserImagesDto): Promise<UserImage> {
    const createdImages = new this.userImageModal(createUserImagesDto);
    return createdImages.save();
  }

  async getImagesByUser(userId: string): Promise<UserImage> {
    return this.userImageModal.findOne({ userId: userId}).exec();
  }

  async deleteImagesForUser(userId: string): Promise<UserImage> {
    return this.userImageModal.findOneAndDelete({ userId: userId}).exec();
  }

  async updateImages(createUserImagesDto: CreateUserImagesDto): Promise<CreateUserImagesDto> {
    return this.userImageModal.findOneAndUpdate({ userId: createUserImagesDto.userId}, createUserImagesDto).exec();
  }
}
