/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ timestamps: true })
export class Project {
  @Prop()
  projectName: string;

  @Prop()
  kodeProject: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'users' })
  creator: Types.ObjectId;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
