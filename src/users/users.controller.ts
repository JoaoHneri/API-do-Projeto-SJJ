import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from './entities/user.entity';

interface AuthenticatedRequest extends Request {
  user: User;
}

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: any) {
    const userId = req.user?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    return this.usersService.findOne(userId);
  }

  @Get('profile/completeness')
  @UseGuards(JwtAuthGuard)
  getProfileCompleteness(@Req() req: any) {
    const userId = req.user?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    return this.usersService.getProfileCompleteness(userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // Atualização completa do perfil
  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  updateProfile(@Req() req: any, @Body() updateProfileDto: any) {
    const userId = req.user?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    return this.usersService.updateProfile(userId, updateProfileDto);
  }

  // Atualização específica de informações pessoais
  @Patch('profile/personal')
  @UseGuards(JwtAuthGuard)
  updatePersonalInfo(
    @Req() req: any,
    @Body()
    personalInfo: {
      phone?: string;
      cpf_cnpj?: string;
      profession?: string;
      company_name?: string;
      profile_picture_url?: string;
    },
  ) {
    const userId = req.user?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    return this.usersService.updateProfile(userId, personalInfo);
  }

  // Atualização específica de endereço
  @Patch('profile/address')
  @UseGuards(JwtAuthGuard)
  updateAddress(
    @Req() req: any,
    @Body()
    addressData: {
      billing_address?: any;
    },
  ) {
    const userId = req.user?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    return this.usersService.updateProfile(userId, addressData);
  }

  // Atualização específica de preferências
  @Patch('profile/preferences')
  @UseGuards(JwtAuthGuard)
  updatePreferences(
    @Req() req: any,
    @Body()
    preferencesData: {
      preferences?: any;
      system_preferences?: any;
    },
  ) {
    const userId = req.user?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    return this.usersService.updateProfile(userId, preferencesData);
  }

  // Atualização específica de método de pagamento
  @Patch('profile/payment')
  @UseGuards(JwtAuthGuard)
  updatePaymentMethod(
    @Req() req: any,
    @Body()
    paymentData: {
      payment_method?: any;
    },
  ) {
    const userId = req.user?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    return this.usersService.updateProfile(userId, paymentData);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
