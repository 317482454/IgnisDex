import account from './lib/account'
import encryption from './lib/encryption'


export default {
    rsConvert: account.rsConvert,
    secretPhraseToPublicKey: account.secretPhraseToPublicKey,
    publicKeyToAccountId: account.publicKeyToAccountId,
    signTransactionBytes: account.signTransactionBytes,
    signBytes: account.signBytes,
    createToken: account.createToken,
    parseToken: account.parseToken,
    getPrivateKey: encryption.getPrivateKey,
    getSharedKey: encryption.getSharedKey,
    aesDecrypt: encryption.aesDecrypt,
    aesEncrypt: encryption.aesEncrypt,
    randomBytes: encryption.randomBytes,
    decryptMessage: encryption.decryptMessage,
    encryptMessage: encryption.encryptMessage,

}
