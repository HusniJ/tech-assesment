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

    // Validate Body Param
    if (createUserDto.name.trim() === '') {
      throw new HttpException({
        message: "Invalid Name"
      }, HttpStatus.NOT_ACCEPTABLE)
    }

    if (createUserDto.userId.trim() === '') {
      throw new HttpException({
        message: "Invalid User Id"
      }, HttpStatus.NOT_ACCEPTABLE)
    }

    let existingUser = await this.appService.getById(createUserDto.userId);

    // Check for the User and if there are existing records then abort 
    // the operation
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

    // Check for User and if there are no existing records then abort 
    // the operation
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

    // Check for Existing user and if there are no existing records then abort 
    // the operation
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

    // Validate Body Param
    if (createUserImagesDto.userId.trim() === '') {
      throw new HttpException({
        message: "Invalid User Id"
      }, HttpStatus.NOT_ACCEPTABLE)
    }

    if (!Array.isArray(createUserImagesDto.imagePaths)) {
      throw new HttpException({
        message: "Invalid Format"
      }, HttpStatus.NOT_ACCEPTABLE)
    }

    if (createUserImagesDto.imagePaths.length !== 9) {
      throw new HttpException({
        message: "Please Send only 9 Images"
      }, HttpStatus.NOT_ACCEPTABLE)
    }

    let existingImagesForUser = await this.appService.getImagesByUser(createUserImagesDto.userId);

    // Check for Existing Images for the User and if there are existing records then abort 
    // the operation
    if (existingImagesForUser !== null) {
      throw new HttpException({
        message: "Images Already Exists"
      }, HttpStatus.BAD_REQUEST)
    }

    return this.appService.createImages(createUserImagesDto).catch(error => {
      throw new HttpException({
        message: error.message
      }, HttpStatus.BAD_REQUEST);
    });
  }

  @Put("images/update")
  async UpdateImages(@Body() createUserImagesDto: CreateUserImagesDto): Promise<UserImage> {
    // Validate Body Param
    if (createUserImagesDto.userId.trim() === '') {
      throw new HttpException({
        message: "Invalid User Id"
      }, HttpStatus.NOT_ACCEPTABLE)
    }

    if (!Array.isArray(createUserImagesDto.imagePaths)) {
      throw new HttpException({
        message: "Invalid Format"
      }, HttpStatus.NOT_ACCEPTABLE)
    }

    if (createUserImagesDto.imagePaths.length !== 9) {
      throw new HttpException({
        message: "Please Send only 9 Images"
      }, HttpStatus.NOT_ACCEPTABLE)
    }

    let existingImages = await this.appService.getImagesByUser(createUserImagesDto.userId);

    // Check for Existing Images for the User and if there are no existing records then abort 
    // the operation
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
