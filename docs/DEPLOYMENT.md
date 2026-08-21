# 部署说明

## 静态生成

```bash
npm install
npm run generate
```

产物位于 `.output/public`。部署前建议设置正式站点地址：

```bash
NUXT_PUBLIC_SITE_URL=https://example.edu.cn NUXT_APP_BASE_URL=/ npm run generate
```

## 子路径部署

```bash
NUXT_PUBLIC_SITE_URL=https://example.edu.cn/mangrove NUXT_APP_BASE_URL=/mangrove/ npm run generate
```

## Nginx 示例

```nginx
location / {
    root /var/www/intelligent-mangrove/.output/public;
    try_files $uri $uri/ $uri.html /404.html;
}
```

子路径部署时，将 `location /` 改为目标子路径，并保持构建时的 `NUXT_APP_BASE_URL` 一致。
