const create_event = (app, game) => {
    return {
        app,
        game,
        resultSpace : resultSpace,
        betSystem   : 1, // Oracle
        description : 'Footbal Game'
    } 
}
export default create_event;



let resultSpace = [
    {
        'formType' : 'Man United',
        'probability' : 0.2
    },
    {
        'formType' : 'Draw',
        'probability' : 0.1
    },
    {
        'formType' : 'Chelsea',
        'probability' : 0.7
    }
]