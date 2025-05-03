import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { Types } from 'mongoose';
import { UserResponse } from 'src/users/schemas/user.schema';

interface JwtPayload {
  email: string;
  sub: Types.ObjectId;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserResponse | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword as UserResponse;
  }

  login(user: UserResponse) {
    const payload: JwtPayload = { email: user.email, sub: user._id };
    return {
      token: this.jwtService.sign(payload),
      name: user.name,
    };
  }
}
