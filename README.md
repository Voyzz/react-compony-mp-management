# 后台管理系统

## 项目包含

- [小程序](https://github.com/Voyzz/MyCompany-miniProgram)
- [管理中台 ( React+TypeSciprt+Antd )](https://github.com/Voyzz/react-compony-mp-management)
- [服务接口 ( Koa2+Mysql )](https://github.com/Voyzz/koa-micro-service)

## 配置

### /src/config/cosServer.ts

```JavaScript
const cosServerInfo: {[key: string] : any} = {
    'bucket':'***',
    'SecretId':'***',
    'SecretKey' :'***',

    'Appid':'***',
    'baseUrl':'***',
    'region':'***'
}

export default cosServerInfo;
```

### /src/config/server.ts

```JavaScript
const server:{[key:string]:any} = {
    baseUrl:'https://www.voyz.pro/api/',
    // baseUrl:'http://localhost:3000/',
}

export default server;
```
