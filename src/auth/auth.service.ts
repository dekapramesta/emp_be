/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { HttpStatus } from '@nestjs/common/enums';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (!user) throw new NotFoundException('User Not Found');
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const { password, email, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(user: any) {
    const token = await { email: user._doc.email, id: user._doc._id };
    return await this.jwtService.sign(token);
  }
}
