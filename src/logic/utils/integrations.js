/* Stream Chat */
import { StreamChat } from 'stream-chat';

export function getIntegrationsInfo({integrations, user_id}){
    var response = {};
    const { chat } = integrations;
    const { publicKey, privateKey } = chat;
    /* Stream Chat */
    if(chat && chat.isActive){
        const serverSideClient = new StreamChat(publicKey, privateKey);
        response.chat = {
            token : serverSideClient.createToken(user_id),
            publicKey : publicKey
        }
    }

    return response;
}