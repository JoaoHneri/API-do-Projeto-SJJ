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
    return this.usersService.findOne(req.user.sub);
  }

  @Get('profile/completeness')
  @UseGuards(JwtAuthGuard)
  getProfileCompleteness(@Req() req: any) {
    return this.usersService.getProfileCompleteness(req.user.sub);
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
    return this.usersService.updateProfile(req.user.sub, updateProfileDto);
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
    return this.usersService.updateProfile(req.user.sub, personalInfo);
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
    return this.usersService.updateProfile(req.user.sub, addressData);
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
    return this.usersService.updateProfile(req.user.sub, preferencesData);
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
    return this.usersService.updateProfile(req.user.sub, paymentData);
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
