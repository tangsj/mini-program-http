# mini-program-http

小程序http请求封装 Promise

## 使用方法

  复制http.js到小程序目录内，注意config.apiRoot 的配置

```js

import http, { fetch } from '@/http';

const Api = {
  getAll(options = {}) {
    const params = Object.assign({
      status: '1',
    }, options);
    return http.get('/api/test', { params });
  },
};

export default Api;
```

```js

import api from '@/api';

{
  async loadMallList() {
    const res = await api.getAll();

    console.log(res);
  }
}
```