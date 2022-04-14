import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { CreateSegwaitAddressDto } from './dto/SegwitAddressDto';
import { WalletService } from './wallet.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [WalletService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('wallet service', () => {
    it('should return Correct address', () => {
      const dto = new CreateSegwaitAddressDto();
      dto.seed =
        'dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd';
      dto.derivePath = "m/84'/0'/0'/0/0";
      const walletSvc = new WalletService();
      expect(walletSvc.getNativeSegwitAddress(dto)).toBe(
        'bc1qus4pey02mv9mn47pxmkj46wregdxmuy0h70qyn',
      );
    });
  });
});
