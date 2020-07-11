export const l =
  {
    head: {
      block: 'Block Explorer',
      test: 'Get test coins',
      create: 'Create Wallet',
      import: 'Import Wallet',
      exit: 'Exit',
      top:'Deposit / Withdraw'

    },
    middle: {
      market: 'Market',
      price: 'Price',
      ups: 'Change',
      deal: 'Trading History',
      sum: 'Amount',
      time: 'Time',
      count: 'Total',
      cancel:'Cancel'

    },
    trading: {
      see: 'View data',
      latest: 'Last Price',
      state: '24h Change',
      highest: '24h High',
      lowest: '24h Low',
      sum: '24h Volume',
    },
    bottom: {
      state1: 'Open Orders',
      state2: 'Trade History',
      state3: 'Balances',
      height: 'Height',
      operation: 'Operating',
      asset: 'Asset ',
      assetName: 'Name',
      assetSum: 'Total Balance',
      title: 'Limit Order',
      buy: "Buy ",
      sell: 'Sell '
    },
    qrIs: {
      title: 'Please use Hebe Wallet to scan QR code for signature broadcast',
      cancel: 'Cancel',
      scan: 'Camera scan QR code broadcast',
      ok: 'Ok'
    },
    scanIs: {
      title: 'Enable the camera and align the signed QR code image',
      cancel: 'Cancel',
      start: 'Launch camera',
      stop: 'Turn off the camera'
    },
    createIs: {
      title: 'Create new wallet',
      txt1: '1.Please confirm that you are browsing the HebeBlock chain DEX official website：https://www.exhebe.com',
      txt2: '2.Once lost, no one, including HebeBlock chain, can help you。',
      txt3: '3.A mnemonic is made up of 12 words. It is the way to open your wallet. Please backup and keep your mnemonic。',
      txt4: '4.Please do not share your mnemonic words with others, and do not use mnemonic words on other websites, otherwise your assets will be at risk of theft。',
      cancel: 'Cancel',
      ok: 'I have read the information above and click Create Wallet'
    },
    createTokenIs: {
      title: 'The mnemonic that is automatically generated for you is：',
      txt1: '1.This mnemonic is used to access your HebeBlock account。',
      txt2: '2.Please write down or remember these 12 words (the order and case-usually lower case)。',
      txt3: '3.请Please do not copy and paste to save the mnemonic, usually hackers can get your mnemonic by obtaining the copy record。',
      txt4: '4.Never reveal your mnemonic. If you lose it you will not be able to access your account ！',
      cancel: 'Cancel',
      ok: 'Next, verify the mnemonic'
    },
    createTokenVerifyIs: {
      title: 'Verify that your mnemonics are backed up：',
      txt1: 'To ensure you have saved your backup mnemonic, write your backup mnemonic below：',
      txt2: 'The mnemonic you entered is incorrect, please try again (please check for extra spaces or misspelled words)',
      cancel: 'Cancel',
      ok: 'Ok'
    },
    importIs: {
      title: 'Import Wallet',
      txt1: '1.Please confirm that you are browsing the official website of HebeBlock chain DEX：https://www.exhebe.com',
      txt2: '2.Please do not copy and paste the mnemonic, usually hackers can get your mnemonic by obtaining the copy record。',
      cancel: 'Cancel',
      qr: 'QR code',
      token:'Mnemonic',
      addr:'Alias ​​/ Address'
    },
    importTokenIs:{
      title:'Please enter mnemonic import',
      txt1:'1.Please confirm that you are browsing the HebeBlock chain DEX official website：https://www.exhebe.com',
      txt2:'2.Please do not copy and paste the mnemonic, usually hackers can get your mnemonic by obtaining the copy record。',
      txt3:'3.Please note that typing more spaces in the mnemonic word will result in the successful import of the wrong words, and there will be no import errors.。',
      txt4:'4.Please enter the mnemonic in the input box below',
      cancel: 'Cancel',
      ok:'Ok'
    },
    importAddrIs:{
      title:'Please enter alias / address import',
      txt1:'1.Please confirm that you are browsing the HebeBlock chain DEX official website：https://www.exhebe.com',
      txt2:'2.Please confirm that a transaction has been issued at your address',
      txt3:'3.Please enter an Alias / Address below',
      txt4:'Note: Alias ​​/ Address import needs to be used with mobile wallet',
      cancel: 'Cancel',
      ok:'Ok'
    },
    importQrIs:{
      title:'QR code into wallet',
      txt1:'1.Please confirm that you are browsing the official website of HebeBlock chain DEX：https://www.exhebe.com',
      txt2:'2.Please open Hebe Wallet\'s QR code to export mnemonics',
      cancel: 'Cancel',
      ok:'Ok',
    },
    method:{
      test1:'Test coin sent successfully, please wait patiently for block confirmation',
      test2:'Log in first, please',
      err:'Import failed, the address does not have a public key, please issue a transaction',
      err1:'Import failed, the alias does not exist',
      err2:'operation failed',
      err3:'Please check if your operation quantity is correct?',
      err4:'Broadcast transaction succeeded',
      err5:'Transaction ',
      err6:'Broadcast transaction failed',
      err7:'Please check if this transaction is correct?',
      err8:'Does not contain signature data',
      err9:'Please check whether the QR code information contains signature data?',
      err10:'Your browser does not support access to user media devices',
      err11:'No open trading pair'
    },
    topIs:{
      title:'Deposit / Withdraw',
      text1:'Deposit / Withdrawal please go to DEX in Hebe Wallet',
      text2:'Exhebe is currently not open for deposit / withdrawal'
    }
  }
