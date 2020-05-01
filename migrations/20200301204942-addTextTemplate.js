
class Progress {

  constructor(value, name) {
      this.progress = value;
      this.name = name;
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
    let mailsenders = await db.collection('mailsenders').find().toArray();
    let processIndex  = mailsenders.length;
    let processObj    = new Progress(processIndex, "ADD_TEXT_TEMPLATE");
    for (let mailsender of mailsenders) {
      processObj.setProcess(processIndex);
      processIndex --;
      if (mailsender != undefined) {
        await db.collection('mailsenders').updateOne(
          { _id: mailsender._id },
          { $push: { "templateIds": { template_id: null, functionName: "USER_NOTIFICATION", contactlist_Id: 2 } } }
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
