import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import path from 'path';
import { User, UserSchema } from './user.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          schema.plugin(require('mongoose-unique-validator'), {
            message: '{PATH} Sudah Ada.',
          }); // or you can integrate it without the options   schema.plugin(require('mongoose-unique-validator')
          return schema;
        },
      },
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
