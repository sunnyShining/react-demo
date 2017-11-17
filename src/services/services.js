// 所有接口请求写在此处

import request from '../utils/request';
import urls from './urls';

// export function query() {
//   	return request('/api/users');
// }

export default {
    users(options = {}) {
        return new Promise((resolve, reject) => {
            request(urls.users, {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify(options),
            }).then((data) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
        });
    },
};
