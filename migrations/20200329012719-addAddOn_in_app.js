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

    let apps = await db.collection('apps').find().toArray();
    let processIndex  = apps.length;
    let processObj    = new Progress(processIndex, "ADD_ADDON_TO_APP");
    for(let app of apps) {
      console.log(app._id);
      processObj.setProcess(processIndex);
      processIndex --;

      let result = await db.collection('addons').insertOne({__v : 0});

      await db.collection('apps').updateOne(
        { _id: app._id },
        { $set: { "addOn": result.ops[0]._id } }
      )

    }
    processObj.destroyProgress();
  },

  async down(db, client) {
  }
};
