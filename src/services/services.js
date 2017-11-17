/**
 * @author sunny
 * @email 17765293970@163.com
 * @create date 2017-11-17 09:56:39
 * @modify date 2017-11-17 09:56:39
 * @desc 接口请求
*/

import { message } from 'antd';
import request from '../utils/request';
import urls from './urls';

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
                message.error(error.msg);
            });
        });
    },
};
