import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export enum SubscriptionPlan {
  FREE = 'free',
  BASIC = 'basic',
  PRO = 'pro',
  ENTERPRISE = 'enterprise',
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  TRIAL = 'trial',
  CANCELED = 'canceled',
  SUSPENDED = 'suspended',
}

export enum UserRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  MEMBER = 'member',
}

export enum UserStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  BLOCKED = 'blocked',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  @Index()
  tenant_id?: string;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 150, unique: true })
  @Index()
  email: string;

  @Column({ type: 'text' })
  @Exclude()
  password_hash: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ length: 20, nullable: true, unique: true })
  cpf_cnpj?: string;

  @Column({ length: 100, nullable: true })
  profession?: string;

  @Column({ length: 150, nullable: true })
  company_name?: string;

  @Column({ type: 'text', nullable: true })
  profile_picture_url?: string;

  @Column({
    type: 'enum',
    enum: SubscriptionPlan,
    default: SubscriptionPlan.FREE,
  })
  subscription_plan: SubscriptionPlan;

  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
    default: SubscriptionStatus.TRIAL,
  })
  subscription_status: SubscriptionStatus;

  @Column({ type: 'timestamp', nullable: true })
  trial_end_date?: Date;

  @Column({ type: 'jsonb', nullable: true })
  billing_address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  payment_method?: {
    type: 'credit_card' | 'pix' | 'boleto';
    card_last_four?: string;
    card_brand?: string;
    pix_key?: string;
    bank_account?: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  preferences?: {
    language: string;
    theme: 'light' | 'dark' | 'auto';
    timezone: string;
    notifications: {
      email: boolean;
      sms: boolean;
      whatsapp: boolean;
      marketing: boolean;
    };
  };

  @Column({ type: 'jsonb', nullable: true })
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

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.MEMBER,
  })
  role: UserRole;

  @Column({ default: false })
  is_verified: boolean;

  @Column({ default: false })
  two_factor_enabled: boolean;

  @Column({ type: 'inet', nullable: true })
  last_ip?: string;

  @Column({ length: 100, nullable: true })
  last_device?: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @DeleteDateColumn()
  deleted_at?: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  last_login?: Date;
}
