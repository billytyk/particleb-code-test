import {
  Body,
  Controller,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Response,
  UseFilters,
} from '@nestjs/common';
import { CreateMultisigP2SHDto } from './dto/MultisigP2SHDto';
import { CreateSegwaitAddressDto } from './dto/SegwitAddressDto';
import { HttpExceptionFilter } from './exception/HttpExceptionFilter';
import { WalletService } from './wallet.service';

@Controller()
export class AppController {
  constructor(private readonly walletService: WalletService) {}

  @Post('bech32')
  @Header('content-type', 'text/plain')
  @HttpCode(HttpStatus.OK)
  @UseFilters(HttpExceptionFilter)
  generateSegwit(@Response() res, @Body() dto: CreateSegwaitAddressDto) {
    res.send(this.walletService.getNativeSegwitAddress(dto));
  }

  @Post('p2sh-ms')
  @Header('content-type', 'text/plain')
  @HttpCode(HttpStatus.OK)
  @UseFilters(HttpExceptionFilter)
  generatP2wshMultisig(@Response() res, @Body() dto: CreateMultisigP2SHDto) {
    try {
      res.send(this.walletService.getMultsigP2SHAddress(dto));
    } catch (err) {
      if (err instanceof HttpException) throw err;
      else
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }
}
