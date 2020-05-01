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
    let processObj    = new Progress(processIndex, "ADD_LINK_URL_TO_BANNERS");

    for (let banner of banners) {
      processObj.setProcess(processIndex);
      processIndex --;
      if (banner.ids == null || banner.ids.length <= 0) {
        await db.collection('banners').updateOne(
          { _id: banner._id },
          {
            $set: {
              "ids": [{
                "image_url": "",
                "link_url": ""
              }]
            }
          }
        )
      } else {
        let result = [];
        for (let id of banner.ids) {
          if (typeof id == "string" ) {
            result.push({
              image_url: id,
              link_url: ""
            });
          } else if (id === null ) {
            result.push({
              image_url: "",
              link_url: ""
            });
          } else if(typeof id.image_url == "object") {
            result.push({
              image_url: "",
              link_url: ""
            });
          } else if (typeof id.image_url == "string" ) {
            result.push({
              image_url: id.image_url,
              link_url: ""
            });
          }
        }
        if (result.length > 0) {
          await db.collection('banners').updateOne(
            { _id: banner._id },
            { $set: { "ids": result } }
          )
        }
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
