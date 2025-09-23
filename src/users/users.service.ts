import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User, UserStatus, SubscriptionPlan } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );

    // Criar usuário com trial de 30 dias
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 30);

    const user = this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password_hash: hashedPassword,
      trial_end_date: trialEndDate,
      preferences: {
        language: 'pt-BR',
        theme: 'light' as const,
        timezone: 'America/Sao_Paulo',
        notifications: {
          email: true,
          sms: false,
          whatsapp: false,
          marketing: false,
        },
      },
    });

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: [
        'id',
        'tenant_id',
        'name',
        'email',
        'phone',
        'profession',
        'company_name',
        'subscription_plan',
        'subscription_status',
        'role',
        'status',
        'is_verified',
        'created_at',
        'updated_at',
        'last_login',
      ],
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: [
        'id',
        'tenant_id',
        'name',
        'email',
        'phone',
        'cpf_cnpj',
        'profession',
        'company_name',
        'profile_picture_url',
        'subscription_plan',
        'subscription_status',
        'trial_end_date',
        'billing_address',
        'payment_method',
        'preferences',
        'system_preferences',
        'role',
        'is_verified',
        'two_factor_enabled',
        'status',
        'created_at',
        'updated_at',
        'last_login',
      ],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id: string, updateUserDto: Partial<User>): Promise<User> {
    const user = await this.findOne(id);

    // Verificar se email já existe (se estiver sendo alterado)
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Email already exists');
      }
    }

    // Verificar se CPF/CNPJ já existe (se estiver sendo alterado)
    if (updateUserDto.cpf_cnpj && updateUserDto.cpf_cnpj !== user.cpf_cnpj) {
      const existingUser = await this.userRepository.findOne({
        where: { cpf_cnpj: updateUserDto.cpf_cnpj },
      });
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('CPF/CNPJ already exists');
      }
    }

    await this.userRepository.update(id, {
      ...updateUserDto,
      updated_at: new Date(),
    });
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    // Soft delete: atualizar deleted_at com timestamp atual
    await this.userRepository.update(id, {
      deleted_at: new Date(),
      status: UserStatus.BLOCKED,
    });
  }

  // Método para reativação de usuário (remover soft delete)
  async restore(id: string): Promise<User> {
    // Use raw query to set deleted_at to null
    await this.userRepository.query(
      'UPDATE users SET deleted_at = NULL, status = $1, updated_at = $2 WHERE id = $3',
      [UserStatus.ACTIVE, new Date(), id],
    );

    return this.findOne(id);
  }

  // Método para verificar se usuário existe e está ativo
  async isActiveUser(id: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: {
        id,
        status: UserStatus.ACTIVE,
        deleted_at: IsNull(),
      },
    });
    return !!user;
  }

  // Método para atualizar perfil específico
  async updateProfile(
    id: string,
    updateProfileDto: Partial<User>,
  ): Promise<User> {
    if (!id) {
      throw new Error('User ID is required');
    }

    await this.findOne(id);

    await this.userRepository.update(id, {
      ...updateProfileDto,
      updated_at: new Date(),
    });

    return this.findOne(id);
  }

  // Método para gerenciar assinatura
  async updateSubscription(
    id: string,
    subscriptionPlan: SubscriptionPlan,
    trialEndDate?: Date,
  ): Promise<User> {
    await this.findOne(id);

    await this.userRepository.update(id, {
      subscription_plan: subscriptionPlan,
      trial_end_date: trialEndDate,
      updated_at: new Date(),
    });

    return this.findOne(id);
  }

  // Método para verificar completude do perfil
  async getProfileCompleteness(id: string) {
    const user = await this.findOne(id);

    const requiredFields = ['name', 'email', 'phone', 'cpf_cnpj', 'profession'];

    const optionalFields = [
      'company_name',
      'profile_picture_url',
      'billing_address',
      'payment_method',
      'preferences',
      'system_preferences',
    ];

    const completedRequired = requiredFields.filter(
      (field) => user[field],
    ).length;
    const completedOptional = optionalFields.filter(
      (field) => user[field],
    ).length;

    const completenessPercentage = Math.round(
      ((completedRequired + completedOptional) /
        (requiredFields.length + optionalFields.length)) *
        100,
    );

    return {
      percentage: completenessPercentage,
      completed_required: completedRequired,
      total_required: requiredFields.length,
      completed_optional: completedOptional,
      total_optional: optionalFields.length,
      missing_required: requiredFields.filter((field) => !user[field]),
      missing_optional: optionalFields.filter((field) => !user[field]),
    };
  }
}
