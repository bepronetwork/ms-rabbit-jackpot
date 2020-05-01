class Progress {

  constructor(value, name) {
      this.progress = value;
      this.name     = name;
      this.objProgress = setInterval(()=>{
        console.clear(); console.log(this.name);
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

    let apps      = await db.collection('apps').find().toArray();
    let currency  = await db.collection('currencies').find().toArray();
    let processIndex  = apps.length;
    let processObj    = new Progress(processIndex, "ADD_WHITELISTED_ADDRESSES");
    for(let app of apps) {
      processObj.setProcess(processIndex);
      processIndex --;
      await db.collection('apps').updateOne(
        { _id: app._id },
        { $set: { "whitelistedAddresses": [
          {
            currency: currency[0]._id,
            addresses: [app.ownerAddress ? app.ownerAddress : "N/A"]
          },
          {
            currency: currency[1]._id,
            addresses: ["N/A"]
          }
        ] } }
      )

      await db.collection('apps').update(
        { _id: app._id },
        { $unset: { "ownerAddress": "" } }
      );
    }
    processObj.destroyProgress();
  },

  async down(db, client) {
  }
};
