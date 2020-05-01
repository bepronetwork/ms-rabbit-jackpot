class Progress {

  constructor(value, name) {
    this.progress = value;
    this.name = name;
    this.objProgress = setInterval(() => {
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
    let admins = await db.collection('admins').find().toArray();
    let processIndex = admins.length;
    let processObj = new Progress(processIndex, "ADD_PERMISSION_TO_ADMIN");
    for (let admin of admins) {
      processObj.setProcess(processIndex);
      processIndex--;
      let permission = await db.collection('permissions').findOne({ _id: admin.permission });
      if (permission === null) {
        let newpermission = await db.collection('permissions').insertOne({
          super_admin: true,
          customization: true,
          withdraw: true,
          user_withdraw: true,
          financials: true,
          __v: 0,
        });
        await db.collection('admins').updateOne(
          { _id: admin._id },
          { $set: { "permission": newpermission.ops[0]._id } }
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
