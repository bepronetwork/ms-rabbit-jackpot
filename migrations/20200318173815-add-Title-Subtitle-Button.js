
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
    let banners = await db.collection('banners').find().toArray();
    let processIndex  = banners.length;
    let processObj    = new Progress(processIndex, "ADD_TITLE_SUBTITLE_BUTTON");
    for (let banner of banners) {

      processObj.setProcess(processIndex);
      processIndex --;

      let ids = banner.ids;
      let newIds = [];

      for(let id of ids) {
        newIds.push({
          ...id,
          button_text : "",
          title       : "",
          subtitle    : ""
        });
      }

      await db.collection('banners').updateOne(
        { _id: banner._id },
        { $set:
          {
            ids: newIds
          }
        }
      );

    }

    processObj.destroyProgress();
  },
  async down(db, client) {}
};
