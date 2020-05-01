import mongoose from 'mongoose';


const pipeline_user_wallet = (_id) => 
    [
        //Stage 0
    {
        '$match' : {
            "_id" : mongoose.Types.ObjectId(_id)
        }
    },  {
        '$lookup': {
            'from': 'wallets', 
            'localField': 'wallet', 
            'foreignField': '_id', 
            'as': 'wallet'
        }
    },
    {
        '$project': {
            'wallet': true
        }
    }
]

export default pipeline_user_wallet;



