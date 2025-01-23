import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class BaseUser {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: null })
  phoneNumber?: string;
}

export const BaseUserSchema = SchemaFactory.createForClass(BaseUser);
export type BaseUserDocument = HydratedDocument<BaseUser>;
