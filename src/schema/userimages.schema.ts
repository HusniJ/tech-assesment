import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserImageDocument  = UserImage & Document;

@Schema()
export class UserImage {
    @Prop()
    userId: string;

    @Prop([String])
    imagePaths: string[];
}

export const UserImageSchema = SchemaFactory.createForClass(UserImage);