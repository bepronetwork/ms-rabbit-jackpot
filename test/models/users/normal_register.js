const normal_register = (address, app_id, options={}) => {
    return { 
        full_name : '{{name.firstName}}',
        username : options.username || '{{name.firstName}}{{random.number}}',
        name : '{{name.firstName}}',
        address : address,
        email : '{{internet.email}}',
        nationality : '{{address.countryCode}}',
        age : Math.floor(Math.random() * 60) + 18,
        app : app_id,
        password : 'test123',
        user_external_id : '{{random.uuid}}',
        affiliateLink : options.affiliateLink
    }
}

export default normal_register;