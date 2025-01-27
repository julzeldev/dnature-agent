import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { MONGO_DUPLICATE_KEY_ERROR } from 'src/common/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  // Create a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      let username = `${createUserDto.firstName.toLowerCase()}.${createUserDto.lastName.toLowerCase()}`;

      // Check if the username already exists and find a unique one if needed
      let existingUser = await this.userModel.findOne({ username }).exec();
      let counter = 1;

      while (existingUser) {
        username = `${createUserDto.firstName.toLowerCase()}.${createUserDto.lastName.toLowerCase()}.${counter}`;
        existingUser = await this.userModel.findOne({ username }).exec();
        counter++;
      }
      // Hash the password before saving it to the database
      const salt = await bcrypt.genSalt(10); // generate a salt
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt); // hash the password

      const createdUser = new this.userModel({
        ...createUserDto,
        username,
        password: hashedPassword,
      });
      return await createdUser.save();
    } catch (error) {
      if (error.code === MONGO_DUPLICATE_KEY_ERROR) {
        throw new ConflictException('Username already exists');
      }
      throw error;
    }
  }

  // Get all users
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Get a user by id
  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Get a user by username
  async findByUsername(username: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }

  // Update an existing user
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userModel.findById(id).exec();
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Update the user with the provided data
    Object.assign(existingUser, updateUserDto);
    return existingUser.save();
  }

  // Remove a user by id
  async remove(id: string): Promise<void> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userModel.deleteOne({ _id: id }).exec();
  }
}
