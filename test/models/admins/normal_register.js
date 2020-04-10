import { getRandom } from "../../utils/math";

export default {
    username : '{{name.firstName}}{{random.number}}' + getRandom(234234,456345634563),
    name : '{{name.firstName}}',
    email : '{{internet.email}}',
    password : 'test123'
}
