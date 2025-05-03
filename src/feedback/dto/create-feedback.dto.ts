import {
  IsString,
  IsEmail,
  IsInt,
  Min,
  Max,
  IsNotEmpty,
} from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsInt()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rating: number;
}
