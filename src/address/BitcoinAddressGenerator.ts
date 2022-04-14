import * as ecc from 'tiny-secp256k1';
import { payments } from 'bitcoinjs-lib';
import * as bip32 from 'bip32';

const BIP32Factory = bip32.BIP32Factory(ecc);

export function generateSegwitAddress(seed: string, path: string) {
  // BIP-84
  const key = BIP32Factory.fromSeed(Buffer.from(seed, 'hex')).derivePath(path);
  const { address } = payments.p2wpkh({ pubkey: key.publicKey });

  return address;
}

export function generateMultisigP2SH(pubKeys: string | string[], m: number) {
  const pubKeysArray =
    typeof pubKeys === 'string'
      ? [Buffer.from(pubKeys, 'hex')]
      : pubKeys.map((hex) => Buffer.from(hex, 'hex'));
  const { address } = payments.p2sh({
    redeem: payments.p2ms({ m: m, pubkeys: pubKeysArray }),
  });
  return address;
}
