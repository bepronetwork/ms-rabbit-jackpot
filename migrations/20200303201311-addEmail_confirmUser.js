
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
    let users = await db.collection('users').find().toArray();
    let processIndex  = users.length;
    let processObj    = new Progress(processIndex, "ADD_EMAIL_CONFIRM_USER");
    for (let user of users) {
      processObj.setProcess(processIndex);
      processIndex --;
      if(user.email_confirmed == undefined){
        await db.collection('users').updateOne(
          { _id: user._id },
          { $set: { "email_confirmed": false } }
        );
      }
    }
    processObj.destroyProgress();
  },
  async down(db, client) {}
};
