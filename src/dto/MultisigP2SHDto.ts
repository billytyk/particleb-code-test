import { IsArray, IsNumber } from 'class-validator';

export class CreateMultisigP2SHDto {
  // expect 16-64 bytes hex number
  @IsArray()
  pubKeys: string[];

  @IsNumber()
  m: string | number;
}
