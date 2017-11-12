/**
* Created by sunny on 2017/05/03
* 开心每一天！
**/

function hostName() {
    if (process.env.NODE_ENV === 'development') {
        return {
            face: 'http://localhost:9992',
        };
    } else if (process.env.NODE_ENV === 'staging') {
        return {
            face: 'http://127.0.0.1:9992',
        };
    } else if (process.env.NODE_ENV === 'production') {
        return {
            face: 'http://127.0.0.1:9992',
        };
    }
}
const host = hostName();
export default {
    // 测试接口
    users: host.face + '/users',
};
