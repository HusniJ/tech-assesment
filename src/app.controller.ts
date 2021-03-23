import { Controller, Get, Post, Put, Delete, Body, HttpException, HttpStatus, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/createUser.dto';
import { CreateUserImagesDto } from './dto/createUserImages.dto';
import { User } from './schema/user.schema';
import { UserImage } from './schema/userimages.schema';

@Controller("user")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("insert")
  async Insert(@Body() createUserDto: CreateUserDto): Promise<User> {

    let existingUser = await this.appService.getById(createUserDto.userId);

    if (existingUser !== null) {
      throw new HttpException({
        message: "User Already Exists"
      }, HttpStatus.NOT_ACCEPTABLE)
    }

    return this.appService.create(createUserDto).catch(error => {
      throw new HttpException({
        message: error.message
      }, HttpStatus.BAD_REQUEST);
    });
  }

  @Put("update")
  async Update(@Body() createUserDto: CreateUserDto): Promise<User> {
    let existingUser = await this.appService.getById(createUserDto.userId);

    if (existingUser === null) {
      throw new HttpException({
        message: "User Does Not Exists"
      }, HttpStatus.NOT_ACCEPTABLE)
    }

    return this.appService.update(createUserDto).catch(error => {
      throw new HttpException({
        message: error.message
      }, HttpStatus.BAD_REQUEST);
    });
  }

  @Delete("delete/:id")
  async Delete(@Param("id") id: string): Promise<User> {
    let existingUser = await this.appService.getById(id);

    if (existingUser === null) {
      throw new HttpException({
        message: "User Does Not Exists"
      }, HttpStatus.NOT_ACCEPTABLE)
    }

    return this.appService.delete(id).catch(error => {
      throw new HttpException({
        message: error.message
      }, HttpStatus.BAD_REQUEST);
    });
  }

  @Get("all")
  async All(): Promise<User[]> {
    return this.appService.getAll().catch(error => {
      throw new HttpException({
        message: error.message
      }, HttpStatus.BAD_REQUEST);
    });
  }

  @Get("find/:id")
  async Find(@Param("id") id: string): Promise<User> {
    return this.appService.getById(id).catch(error => {
      throw new HttpException({
        message: error.message
      }, HttpStatus.BAD_REQUEST);
    });
  }

  @Post("images/insert")
  async InsertImages(@Body() createUserImagesDto: CreateUserImagesDto): Promise<UserImage> {

    let existingImagesForUser = await this.appService.getImagesByUser(createUserImagesDto.userId);

    if (existingImagesForUser !== null) {
      throw new HttpException({
        message: "Images Already Exists"
      }, HttpStatus.NOT_ACCEPTABLE)
    }

    return this.appService.createImages(createUserImagesDto).catch(error => {
      throw new HttpException({
        message: error.message
      }, HttpStatus.BAD_REQUEST);
    });
  }

  @Put("images/update")
  async UpdateImages(@Body() createUserImagesDto: CreateUserImagesDto): Promise<UserImage> {
    let existingImages = await this.appService.getImagesByUser(createUserImagesDto.userId);

    if (existingImages === null) {
      throw new HttpException({
        message: "Images Does Not Exists"
      }, HttpStatus.NOT_ACCEPTABLE)
    }

    return this.appService.updateImages(createUserImagesDto).catch(error => {
      throw new HttpException({
        message: error.message
      }, HttpStatus.BAD_REQUEST);
    });
  }

  @Get("images/find/:id")
  async FindImages(@Param("id") id: string): Promise<UserImage> {
    return this.appService.getImagesByUser(id).catch(error => {
      throw new HttpException({
        message: error.message
      }, HttpStatus.BAD_REQUEST);
    });
  }
}
