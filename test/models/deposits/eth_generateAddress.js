const eth_generateAddress = (app_id) => {
    return { 
        currency    : 'eth' ,
        full_name : '{{name.firstName}}',
        username : '{{name.firstName}}{{random.number}}',
        name : '{{name.firstName}}',
        email : '{{internet.email}}',
        nationality : '{{address.countryCode}}',
        callback_URL : 'https://url.com',
        age : Math.floor(Math.random() * 60) + 18,
        app_id : app_id,
        user_external_id : '{{random.uuid}}'
    } 
}

export default eth_generateAddress;