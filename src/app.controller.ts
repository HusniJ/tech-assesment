import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './schema/user.schema';
@Controller("user")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("hello-world")
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("insert")
  async Insert(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.appService.create(createUserDto).catch(error => {
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
}
