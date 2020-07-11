import helpers from './helpers'

var c25519 = require('../util/curve25519_.js');
import hash from 'hash.js'

var CryptoJS = require('crypto-js');
var pako = require('pako');
import buffer from 'buffer'

export default {
    getPrivateKey(secretPhrase) {
        let bytes = helpers.simpleHash(
            helpers.stringToByteArray(secretPhrase)
        );
        let res = c25519.clamp(
            helpers.byteArrayToShortArray(bytes)
        );
        return helpers.shortArrayToHexString(res);
    },
    getSharedKey(key1, key2) {
        key1 = helpers.byteArrayToShortArray(key1);
        key2 = helpers.byteArrayToShortArray(key2);
        var shared = c25519.curve25519(key1, key2, null);
        return helpers.shortArrayToByteArray(shared);
    },
    aesDecrypt(ivCiphertext, options) {
        if (ivCiphertext.length < 16 || ivCiphertext.length % 16 !== 0) {
            return false;
        }
        let iv = helpers.byteArrayToWordArray(
            ivCiphertext.slice(0, 16)
        );
        let ciphertext = helpers.byteArrayToWordArray(
            ivCiphertext.slice(16)
        );
        for (var i = 0; i < 32; i++) {
            options.sharedKey[i] ^= options.nonce[i];
        }

        let key = CryptoJS.SHA256(
            helpers.byteArrayToWordArray(options.sharedKey)
        );
        let encrypted = CryptoJS.lib.CipherParams.create({
            ciphertext: ciphertext,
            iv: iv,
            key: key,
        });
        let decrypted = CryptoJS.AES.decrypt(encrypted, key, {
            iv: iv,
        });
        return helpers.wordArrayToByteArray(decrypted);
    },
    aesEncrypt(plaintext, options) {
        var text = helpers.byteArrayToWordArray(plaintext);
        for (var i = 0; i < 32; i++) {
            options.sharedKey[i] ^= options.nonce[i];
        }
        var key = CryptoJS.SHA256(
            helpers.byteArrayToWordArray(options.sharedKey)
        );
        var tmp = buffer.Buffer(this.randomBytes(16));
        var iv = helpers.byteArrayToWordArray(tmp);
        var encrypted = CryptoJS.AES.encrypt(text, key, {
            iv: iv,
        });
        var ivOut = helpers.wordArrayToByteArray(encrypted.iv);
        var ciphertextOut = helpers.wordArrayToByteArray(encrypted.ciphertext);
        return ivOut.concat(ciphertextOut);
    },
    decryptMessage(message, nonce, publicKey, secretPhrase) {
        let options = {
            privateKey: helpers.hexStringToByteArray(
                this.getPrivateKey(secretPhrase)
            ),
            publicKey: helpers.hexStringToByteArray(publicKey),
            nonce: helpers.hexStringToByteArray(nonce),
        };
        options.sharedKey = this.getSharedKey(options.privateKey, options.publicKey);
        let messageBytes = helpers.hexStringToByteArray(message);
        let compressedPlaintext = this.aesDecrypt(messageBytes, options);
        if (!compressedPlaintext) {
            return false;
        }
        let binData = new Uint8Array(compressedPlaintext);
        return helpers.byteArrayToString(pako.inflate(binData));
    },
    randomBytes(n) {

        for (var bytes = []; n > 0; n--) {
            bytes.push(Math.floor(Math.random() * 256));
        }
        return bytes;
    },
    encryptMessage(message, publicKey, secretPhrase) {
        let options = {
            privateKey: helpers.hexStringToByteArray(
                this.getPrivateKey(secretPhrase)
            ),
            publicKey: helpers.hexStringToByteArray(publicKey),
            nonce: buffer.Buffer(this.randomBytes(32)),
        };
        options.sharedKey = this.getSharedKey(options.privateKey, options.publicKey);
        let plaintext = helpers.stringToByteArray(message);
        let compressedPlaintext = pako.gzip(
            new Uint8Array(plaintext)
        );
        let encrypted = this.aesEncrypt(compressedPlaintext, options);
        return {
            message: helpers.byteArrayToHexString(encrypted),
            nonce: helpers.byteArrayToHexString(options.nonce),
        };
    }
}
