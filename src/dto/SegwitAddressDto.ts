import { IsString, Length } from 'class-validator';

export class CreateSegwaitAddressDto {
  // expect 16-64 bytes hex number
  @IsString()
  @Length(16, 64)
  seed: string;

  @IsString()
  derivePath: string;
}
