import { Role } from 'src/roles/roles.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [String], enum: Role, default: [Role.User] })
  role: Role[];
  parent: any;
}

export const UserSchema = SchemaFactory.createForClass(User);
