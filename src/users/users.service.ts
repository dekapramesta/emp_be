/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './create-user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email });
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    return await new this.userModel(createUserDto).save();
  }
}
