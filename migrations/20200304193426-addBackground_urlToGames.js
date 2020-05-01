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

    
    let games = await db.collection('games').find().toArray();
    let processIndex  = games.length;
    let processObj    = new Progress(processIndex, "ADD_BACKGROUND_URL_TO_GAMES");
    for (let game of games) {
      processObj.setProcess(processIndex);
      processIndex --;
      await db.collection('games').updateOne(
        { _id: game._id },
        { $set: { "background_url": null } }
      )
    }
    processObj.destroyProgress();
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
