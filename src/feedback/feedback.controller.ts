import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { Feedback } from './schemas/feedback.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { isValidObjectId } from 'mongoose';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  async create(
    @Body() createFeedbackDto: CreateFeedbackDto,
  ): Promise<Feedback> {
    return this.feedbackService.create(createFeedbackDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Feedback[]> {
    return this.feedbackService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<Feedback | null> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid MongoDB ObjectId: ${id}`);
    }
    return this.feedbackService.findById(id);
  }
}
