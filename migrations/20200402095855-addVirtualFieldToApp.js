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
        let processIndex = apps.length;
        let processObj = new Progress(processIndex, "ADD_VIRTUAL_FIELD_TO_APP");
        for(let app of apps) {
            processObj.setProcess(processIndex);
            processIndex --;    
            await db.collection('apps').updateOne(
                { _id: app._id },
                { $set: { "virtual": false } }
            )
    
        }
        processObj.destroyProgress();
    },
  
    async down(db, client) {
        // Nothing
    }
  };
  