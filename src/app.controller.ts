import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Res,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { response, Response } from 'express';
import { AuthenticatedGuard } from './auth/authenticated-guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/create-user.dto';
import * as bcrypt from 'bcrypt';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<any> {
    try {
      const data = await this.authService.login(req.user);
      if (!data)
        return response.json('pass atau email tidak ditemukan').status(404);
      return { data: data };
    } catch (error) {
      return response.json({ data: error.errors }).status(404);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Request() req): string {
    return req.user;
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const saltOrRounds = 12;
      const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
      createUserDto.password = hash;
      await this.userService.register(createUserDto);
      return res
        .json({ msg: 'success', data: createUserDto })
        .status(201)
        .send();
    } catch (err) {
      const val = err.errors[Object.keys(err.errors)[0]];
      return res.json({ message: val.message }).status(403).send();
    }
  }
}
