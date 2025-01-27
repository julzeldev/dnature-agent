import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Create a new user
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error('Internal Server Error');
    }
  }

  // Get all users
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // Get a user by id
  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    try {
      return await this.usersService.findById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Internal Server Error');
    }
  }

  // Get a user by username
  @Get('username/:username')
  async findByUsername(@Param('username') username: string): Promise<User> {
    try {
      return await this.usersService.findByUsername(username);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Internal Server Error');
    }
  }

  // Update an existing user
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      return await this.usersService.update(id, updateUserDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Internal Server Error');
    }
  }

  // Remove a user by id
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      return await this.usersService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Internal Server Error');
    }
  }
}
