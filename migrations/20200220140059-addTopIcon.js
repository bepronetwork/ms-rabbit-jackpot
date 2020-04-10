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
    let customizations = await db.collection('customizations').find().toArray();
    let processIndex  = customizations.length;
    let processObj    = new Progress(processIndex, "ADD_TOP_ICON");
    for (let customization of customizations) {
      processObj.setProcess(processIndex);
      processIndex --;
      let topIcon = await db.collection('topicons').findOne({ _id: customization.topIcon });
      if (topIcon === null) {
        let newTopIcon = await db.collection('topicons').insertOne({
          __v: 0
        });
        await db.collection('customizations').updateOne(
          { _id: customization._id },
          { $set: { "topIcon": newTopIcon.ops[0]._id } }
        )
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
