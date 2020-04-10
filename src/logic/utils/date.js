const fromPeriodicityToDates = ({periodicity='monthly'}) =>{
    var ret = {};

    switch(new String(periodicity).toLowerCase().trim()){
        case 'weekly' : {
            ret = {
                from : getLastWeek(),
                to : new Date() // Today
            };
            break;
        };
        case 'monthly' : {
            ret = {
                from : getLastMonth(),
                to : new Date() // Today
            };
            break;
        };
        case 'all' : {
            ret = {};
            break;
        };
        default : {
            ret = {};
            break;
        }
    }

    return ret;
}

function getLastWeek() {
    var today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
}

function getLastMonth() {
    var today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
}


export {
    fromPeriodicityToDates
}