/**
 * @author sunny
 * @email 17765293970@163.com
 * @create date 2017-11-17 09:55:32
 * @modify date 2017-11-17 09:55:32
 * @desc fetch封装
*/

import fetch from 'dva/fetch';

function parseJSON(response) {
    return response.json();
}

function checkStatus(response) {
    const type = response.headers.get('Content-Type');
    if (response.status >= 200 && response.status < 300) {
        if (type.indexOf('application/json') !== -1) {
            return response.json();
        } else {
            return response.text();
        }
    } else {
        const error = {
            code: '123456',
            data: {},
            msg: '网络或服务器错误',
        };
        return Promise.reject(error);
    }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
    return fetch(url, options)
        .then(checkStatus)
        .then(data => {
            return Promise.reslove(data);
        })
        .catch(err => {
            return Promise.reject(err);
        });
}
