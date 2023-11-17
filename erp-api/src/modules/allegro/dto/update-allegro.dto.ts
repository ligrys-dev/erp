import { PartialType } from '@nestjs/mapped-types';
import { CreateAllegroDto } from './create-allegro.dto';

export class UpdateAllegroDto extends PartialType(CreateAllegroDto) {}
