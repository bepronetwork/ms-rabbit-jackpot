export default {
    currency    : 'btc' ,
    entityType : 'user',
    full_name : '{{name.firstName}}',
    username : '{{name.firstName}}{{random.number}}',
    name : '{{name.firstName}}',
    email : '{{internet.email}}',
    nationality : '{{address.countryCode}}',
    age : Math.floor(Math.random() * 60) + 18,
    app_id : '5c4bb1738e3dd258db1c125d',
    user_external_id : '{{random.uuid}}'
}
