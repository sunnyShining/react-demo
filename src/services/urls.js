/**
 * @author sunny
 * @email 17765293970@163.com
 * @create date 2017-11-17 09:55:04
 * @modify date 2017-11-17 09:55:04
 * @desc 域名
*/


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
