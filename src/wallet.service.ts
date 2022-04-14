import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  generateMultisigP2SH,
  generateSegwitAddress,
} from './address/BitcoinAddressGenerator';
import { CreateMultisigP2SHDto } from './dto/MultisigP2SHDto';
import { CreateSegwaitAddressDto } from './dto/SegwitAddressDto';

@Injectable()
export class WalletService {
  getNativeSegwitAddress(dto: CreateSegwaitAddressDto): string {
    const { seed, derivePath } = dto;

    if (!seed)
      throw new HttpException('$seed does not exist', HttpStatus.BAD_REQUEST);
    if (!derivePath)
      throw new HttpException(
        '$derivePath does not exist',
        HttpStatus.BAD_REQUEST,
      );

    if (!/m\/84'\/0'\/0'\/[01]\/\d/g.test(derivePath))
      throw new HttpException(
        "$derivePath must be in m/84'/0'/0'/x/x pattern",
        HttpStatus.BAD_REQUEST,
      );

    return generateSegwitAddress(dto.seed, dto.derivePath);
  }

  getMultsigP2SHAddress(dto: CreateMultisigP2SHDto): string {
    const { pubKeys, m } = dto;

    if (!pubKeys)
      throw new HttpException(
        '$pubKeys does not exist',
        HttpStatus.BAD_REQUEST,
      );

    if (!m)
      throw new HttpException('$m does not exist', HttpStatus.BAD_REQUEST);
    let keysArr: string[] = [];

    if (typeof pubKeys === 'string') keysArr = [pubKeys];
    else keysArr = pubKeys;

    const mNum = typeof m === 'number' ? m : parseInt(m);
    if (!Number.isInteger(mNum) || mNum > keysArr.length || mNum < 1)
      throw new HttpException(
        'm must be an integer lower than length of $pubKeys',
        HttpStatus.BAD_REQUEST,
      );
    return generateMultisigP2SH(keysArr, mNum);
  }
}
