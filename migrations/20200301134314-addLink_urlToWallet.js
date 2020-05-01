'use strict'
require('dotenv').config();

const setLinkUrl = ({ ticker, address }) => {
  var link_url;
  if (process.env.ENV === "development") {
    switch (new String(ticker).toLowerCase().trim()) {
      case 'eth': {
        link_url = `https://kovan.etherscan.io/address/${address}`;
        return link_url;
      };
      default:
        link_url = address;
        return link_url;
    }
  } else if (process.env.ENV === "production") {
    switch (new String(ticker).toLowerCase().trim()) {
      case 'eth': {
        link_url = `https://etherscan.io/address/${address}`;
        return link_url;
      };
      default:
        link_url = address;
        return link_url;
    }
  }
}

class Progress {

  constructor(value, name) {
      this.progress = value;
      this.name     = name;
      this.objProgress = setInterval(()=>{
        console.clear();
        console.log(this.name);
        console.log(`${this.progress} process left`);
      }, 2000);
  }

  setProcess(value) {
      this.progress = value;
  }

  destroyProgress() {
      clearInterval(this.objProgress);
  }

}

module.exports = {
  async up(db, client) {
    let wallets = await db.collection('wallets').find().toArray();
    let processIndex  = wallets.length;
    let processObj    = new Progress(processIndex, "ADD_LINK_URL_TO_WALLET");
    for (let wallet of wallets) {
      processObj.setProcess(processIndex);
      processIndex --;
      var address = '0X';
      var ticker = 'ETH';
      let currency = await db.collection('currencies').findOne({ _id: wallet.currency })
      try {
        ticker = currency.ticker
      } catch (error) {
        ticker = 'ETH'
      }
      if (wallet.bank_address != undefined) {
        address = wallet.bank_address
      }
      if (wallet.link_url == undefined) {
        var link_url = setLinkUrl({ address, ticker });
        await db.collection('wallets').updateOne(
          { _id: wallet._id },
          { $set: { "link_url": link_url } });
      }
    }
    processObj.destroyProgress();
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
