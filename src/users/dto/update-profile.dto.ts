import {
  IsOptional,
  IsString,
  IsEmail,
  IsEnum,
  IsBoolean,
  IsObject,
  IsDateString,
  MaxLength,
  IsUUID,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  SubscriptionPlan,
  SubscriptionStatus,
  UserRole,
  UserStatus,
} from '../entities/user.entity';

class BillingAddressDto {
  @IsString()
  street: string;

  @IsString()
  number: string;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsString()
  neighborhood: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  @Matches(/^\d{5}-?\d{3}$/, { message: 'CEP deve ter formato válido' })
  zip_code: string;

  @IsString()
  country: string;
}

class PaymentMethodDto {
  @IsEnum(['credit_card', 'pix', 'boleto'])
  type: 'credit_card' | 'pix' | 'boleto';

  @IsOptional()
  @IsString()
  card_last_four?: string;

  @IsOptional()
  @IsString()
  card_brand?: string;

  @IsOptional()
  @IsString()
  pix_key?: string;

  @IsOptional()
  @IsString()
  bank_account?: string;
}

class NotificationsDto {
  @IsBoolean()
  email: boolean;

  @IsBoolean()
  sms: boolean;

  @IsBoolean()
  whatsapp: boolean;

  @IsBoolean()
  marketing: boolean;
}

class PreferencesDto {
  @IsString()
  language: string;

  @IsEnum(['light', 'dark', 'auto'])
  theme: 'light' | 'dark' | 'auto';

  @IsString()
  timezone: string;

  @ValidateNested()
  @Type(() => NotificationsDto)
  notifications: NotificationsDto;
}

export class UpdateProfileDto {
  @IsOptional()
  @IsUUID(4, { message: 'tenant_id deve ser um UUID válido' })
  tenant_id?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  name?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(150)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  @Matches(/^\+?[\d\s\-\(\)]+$/, {
    message: 'Telefone deve ter formato válido',
  })
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  @Matches(/^\d{11}$|^\d{14}$/, {
    message: 'CPF deve ter 11 dígitos ou CNPJ 14 dígitos',
  })
  cpf_cnpj?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  profession?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  company_name?: string;

  @IsOptional()
  @IsString()
  profile_picture_url?: string;

  @IsOptional()
  @IsEnum(SubscriptionPlan)
  subscription_plan?: SubscriptionPlan;

  @IsOptional()
  @IsEnum(SubscriptionStatus)
  subscription_status?: SubscriptionStatus;

  @IsOptional()
  @IsDateString()
  trial_end_date?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => BillingAddressDto)
  billing_address?: BillingAddressDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => PaymentMethodDto)
  payment_method?: PaymentMethodDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => PreferencesDto)
  preferences?: PreferencesDto;

  @IsOptional()
  @IsObject()
  system_preferences?: {
    contracts: {
      auto_generate: boolean;
      default_template: string;
      signature_required: boolean;
    };
    fiscal: {
      auto_calculate_tax: boolean;
      default_tax_rate: number;
      invoice_numbering: string;
    };
    integrations: {
      accounting_software?: string;
      crm_system?: string;
      email_provider?: string;
    };
  };

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsBoolean()
  is_verified?: boolean;

  @IsOptional()
  @IsBoolean()
  two_factor_enabled?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  last_device?: string;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;
}
