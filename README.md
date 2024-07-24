# Node Url Proxy

## 使用场景
为一台网络不通畅的服务器提供 url 代理加速

## Docker 运行
`docker run -d -p 3000:3000 ghcr.io/idreamshen/node-url-proxy:main`

## 使用方式
`http://127.0.0.1:3000/proxy/{target_url}`

## 例子
```bash
curl 'http://127.0.0.1:3000/proxy/https://google.com.hk'

git clone 'http://127.0.0.1:3000/proxy/https://github.com/idreamshen/node-url-proxy'

wget 'http://127.0.0.1:3000/proxy/https://github.com/mem0ai/mem0/archive/refs/tags/0.1.118.zip'
```

## 参考资料
- https://github.com/gaboolic/cloudflare-reverse-proxy
