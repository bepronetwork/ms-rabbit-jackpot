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
    let integrations = await db.collection('integrations').find().toArray();
    let processIndex  = integrations.length;
    let processObj    = new Progress(processIndex, "ADD_MAIL_SENDER");
    for (let integration of integrations) {
      processObj.setProcess(processIndex);
      processIndex --;
      let mailSender = await db.collection('mailsenders').findOne({ _id: integration.mailSender });
      if (mailSender === null) {
        let newmailSender = await db.collection('mailsenders').insertOne({
          apiKey: null,
          templateIds: [
            { template_id: null, functionName: "USER_REGISTER", contactlist_Id: 2 },
            { template_id: null, functionName: "USER_LOGIN", contactlist_Id: 2 },
            { template_id: null, functionName: "USER_RESET_PASSWORD", contactlist_Id: 2 }
          ],
          __v: 0,
        });
        await db.collection('integrations').updateOne(
          { _id: integration._id },
          { $set: { "mailSender": newmailSender.ops[0]._id } }
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
