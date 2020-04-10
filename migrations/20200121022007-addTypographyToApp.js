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
    // TODO write your migration here.

    let listTypography = [
        {
            "local"  : [
                "Open Sans Regular",
                "OpenSans-Regular"
            ],
            "url"    : "https://fonts.gstatic.com/s/opensans/v16/mem8YaGs126MiZpBA-UFWJ0bf8pkAp6a.woff2",
            "format" : "woff2"
        },
        {
            "local"  : [
                "Open Sans Regular",
                "OpenSans-Regular"
            ],
            "url"    : "https://fonts.gstatic.com/s/opensans/v16/mem8YaGs126MiZpBA-UFUZ0bf8pkAp6a.woff2",
            "format" : "woff2"
        }
    ];

    let apps = await db.collection('apps').find().toArray();
    let processIndex  = apps.length;
    let processObj    = new Progress(processIndex, "ADD_TYPOGRAPHY_TO_APP");
    for(let app of apps) {
      processObj.setProcess(processIndex);
      processIndex --;
      let newList = [];
      for (let typography of listTypography) {
        let result = await db.collection('typographies').insertOne({
          local  : typography.local,
          url    : typography.url,
          format : typography.format,
        });
        newList.push(result.ops[0]._id);
      }
      app.typography = newList;
      await db.collection('apps').remove({_id: app._id});
      await db.collection('apps').insertOne(app);
    }
    processObj.destroyProgress();
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
  }
};
