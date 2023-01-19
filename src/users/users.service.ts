import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

export type UserID = {
  id: number;
  name: string;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  // private readonly users: UserID[] = [
  //   {
  //     id: 1,
  //     name: 'deka',
  //     username: 'dekapra',
  //     password: 'deka',
  //   },
  //   {
  //     id: 2,
  //     name: 'bella',
  //     username: 'bella',
  //     password: 'bella',
  //   },
  // ];

  async findOne(username: string): Promise<User> {
    return await this.userModel.findOne({ username: username });
  }
}
