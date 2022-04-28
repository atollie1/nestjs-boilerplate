import { IsUUID } from 'class-validator';

export class FindOneParamDto {
  @IsUUID()
  id: string;
}
