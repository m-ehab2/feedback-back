import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FeedbackDocument = Feedback & Document;

@Schema()
export class Feedback {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
