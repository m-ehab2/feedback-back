import {
  Injectable,
  Logger,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    try {
      const result = await super.canActivate(context);

      if (result) {
        return true;
      }

      throw new UnauthorizedException('Invalid token');
    } catch (error) {
      throw new UnauthorizedException(
        `Authentication failed: ${error.message}`,
      );
    }
  }
}
