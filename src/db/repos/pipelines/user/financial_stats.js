import mongoose from 'mongoose';
import { pipeline_bets_by_currency, pipeline_bets_by_date } from '../filters';


const pipeline_financial_stats = (_id, {dates, currency}) => 
    [
        //Stage 0
    {
        '$match' : {
            "_id" : mongoose.Types.ObjectId(_id)
        }
    },  {
        '$project': {
          'bets': '$bets'
        }
      }, {
        '$unwind': {
          'path': '$bets'
        }
      }, {
        '$lookup': {
          'from': 'bets', 
          'localField': 'bets', 
          'foreignField': '_id', 
          'as': 'bet'
        }
      }, {
        '$project': {
          'bet': {
            '$arrayElemAt': [
              '$bet', 0
            ]
          }, 
          'fee': {
            '$arrayElemAt': [
              '$bet.fee', 0
            ]
          }
        }
      },
      ...pipeline_bets_by_currency({currency}) 
      ,
      ...pipeline_bets_by_date({from_date : dates.from, to_date : dates.to})    
      ,
      , {
        '$group': {
          '_id': {
            'hour': {
              '$hour': '$bet.timestamp'
            }, 
            'day': {
              '$dayOfYear': '$bet.timestamp'
            }, 
            'year': {
              '$year': '$bet.timestamp'
            }
          }, 
          'winAmount': {
            '$sum': '$bet.winAmount'
          }, 
          'bettedAmount': {
            '$sum': '$bet.betAmount'
          }, 
          'betsAmount': {
            '$sum': 1
          }, 
          'fees': {
            '$sum': '$bet.fee'
          }
        }
      }, {
        '$project': {
          '_id': false, 
          'date': {
            'hour': '$_id.hour', 
            'day': '$_id.day', 
            'year': '$_id.year'
          }, 
          'financials': {
            'winAmount': '$winAmount', 
            'bets': '$betsAmount', 
            'bettedAmount': '$bettedAmount', 
            'feeLoss': '$fees', 
            'return': {
              '$subtract': [
                '$winAmount', '$bettedAmount'
              ]
            }
          }
        }
      }
]

export default pipeline_financial_stats;



