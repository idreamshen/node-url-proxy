const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const url = require('url');

const app = express();

const envDebug = process.env.DEBUG; // true, debug log

// 处理所有的 OPTIONS 请求
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Access-Control-Allow-Headers', '*');
        return res.sendStatus(204); // No Content
    }
    next();
});

app.use('/', (req, res, next) => {
    const targetUrl = req.url.replace('/proxy/', '');
    if (!targetUrl) {
        return res.status(400).send('Missing uri parameter');
    }
    const parsedUrl = url.parse(targetUrl);
    if (!parsedUrl.protocol || !parsedUrl.host) {
        return res.status(400).send('Invalid URL');
    }

    // 设置代理目标
    const proxy = createProxyMiddleware({
        logger: envDebug == "true" ? console : null,
        target: `${parsedUrl.protocol}//${parsedUrl.host}`,
        secure: false,
        changeOrigin: true,
        pathRewrite: (path, req) => {
            return parsedUrl.path;
        },
        on: {
            proxyReq: (proxyReq, req, res) => {
                proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36');
            }, 
            proxyRes: (proxyRes, req, res) => {
                // 设置CORS头
                proxyRes.headers['Access-Control-Allow-Origin'] = '*';
                proxyRes.headers['Access-Control-Allow-Methods'] = '*';
                proxyRes.headers['Access-Control-Allow-Headers'] = '*';
            }
        },
    });

    return proxy(req, res, next);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
