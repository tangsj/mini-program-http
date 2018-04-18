/**
 * http 请求封装
 * @author tangsj
 * @param {*} url  请求地址
 * @param {*} options 请求参数
 */
import config from './config';

// 记录请求中的请求数，控制loading显示
let requestCount = 0;

export function fetch(url, options) {
  options = Object.assign({
    loading: true,
    method: 'GET',
    data: {},
  }, options);

  return new Promise((resolve, reject) => {
    if (requestCount === 0 && options.loading) {
      wx.showLoading({
        title: '加载中...',
      });
    }

    requestCount += 1;
    wx.request({
      url: `${config.apiRoot}${url}`,
      data: options.data,
      method: options.method,
      success: (res) => {
        if (res.statusCode < 200 || res.statusCode > 300 || Number(res.data.status) !== 0) {
          wx.showToast({
            title: res.data.msg || '服务器异常！！',
            icon: 'none',
          });
          return reject(res.data || {});
        }

        return resolve(res.data || {});
      },
      fail: () => {
        wx.showToast({
          title: '服务器异常！！',
          icon: 'none',
        });

        reject({
          msg: '服务器异常！！',
        });
      },
      complete: () => {
        requestCount -= 1;
        if (requestCount === 0 && options.loading) {
          wx.hideLoading();
        }
      },
    });
  });
}

const http = {
  get(url, data) {
    return fetch(url, {
      method: 'GET',
      data: data.params,
    });
  },
  post(url, data, options = {}) {
    return fetch(url, {
      method: 'POST',
      data,
    });
  },
};

export default http;
