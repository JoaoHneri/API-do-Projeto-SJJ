import { PartialType } from '@nestjs/mapped-types';
import { UpdateProfileDto } from './update-profile.dto';

export class UpdateUserDto extends PartialType(UpdateProfileDto) {}
