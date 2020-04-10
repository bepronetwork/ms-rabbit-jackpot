class Progress {

    constructor(value) {
        this.progress = value;
        this.objProgress = setInterval(()=>{
            console.log(`${progress} process left`);
        }, 2000);
    }

    setProcess(value) {
        this.progress = value;
    }

    destroyProgress() {
        clearInterval(this.objProgress);
    }

}