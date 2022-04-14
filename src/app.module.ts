import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { HttpExceptionFilter } from './exception/HttpExceptionFilter';
import { WalletService } from './wallet.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    WalletService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
