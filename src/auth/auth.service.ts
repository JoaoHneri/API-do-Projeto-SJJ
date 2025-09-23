import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User, UserStatus } from '../users/entities/user.entity';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    registerDto: RegisterDto,
  ): Promise<{ user: User; access_token: string }> {
    try {
      const user = await this.usersService.create(registerDto);
      const payload: JwtPayload = { sub: user.id, email: user.email };
      const access_token = this.jwtService.sign(payload);

      return { user, access_token };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new ConflictException('Registration failed');
    }
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ user: User; access_token: string }> {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (
      !user ||
      user.status !== UserStatus.ACTIVE ||
      user.deleted_at !== null
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password_hash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { sub: user.id, email: user.email };
    const access_token = this.jwtService.sign(payload);

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...userWithoutPassword } = user;

    return { user: userWithoutPassword as User, access_token };
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password_hash))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password_hash: userPasswordHash, ...result } = user;
      return result as User;
    }

    return null;
  }
}
