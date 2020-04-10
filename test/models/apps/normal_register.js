const normal_register = (id) => {return {
    name : '{{company.companyName}}',
    description : '{{company.catchPhrase}}',
    metadataJSON : JSON.stringify({}),
    admin_id : id,
    marketType : 0
}}


export default normal_register;