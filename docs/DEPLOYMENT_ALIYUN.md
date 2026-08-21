# 阿里云 ECS 静态站部署

## 1. 当前线上状态

- 访问地址：`http://120.26.238.159/mangrove-ecology/`
- English：`http://120.26.238.159/mangrove-ecology/en`
- Bahasa Indonesia：`http://120.26.238.159/mangrove-ecology/id`
- 首次发布版本：`20260813T003343Z`
- 发布包 SHA256：`a96a572f571294a0bc45241f72fafeb2785c829847b7755f668bfc5e3d49df6a`
- Nginx 配置：`/etc/nginx/conf.d/htmlsite.conf`
- 部署前回滚点：`/opt/mangrove-ecology-backups/20260813T003343Z/`

该站点是 Nuxt 3 静态产物。服务器不运行 Node.js、Nuxt 或其他常驻站点进程。

## 2. 本地构建

在项目根目录使用 Node.js `20.19.5` 和 npm：

```powershell
$env:NUXT_APP_BASE_URL = "/mangrove-ecology/"
$env:NUXT_PUBLIC_SITE_URL = "http://120.26.238.159/mangrove-ecology"

npm run lint
npm run typecheck
npm test
npm run generate
```

静态产物位于 `.output/public/`。构建后至少检查：

- `index.html`
- `en/index.html`、`id/index.html`
- `_nuxt/`
- `brand/site-mark.svg`
- `images/team/team-photo.jpg`
- `sitemap_index.xml` 与 `__sitemap__/`

本地子路径预览：

```powershell
$env:STATIC_BASE_PATH = "/mangrove-ecology/"
npm run preview
```

打开 `http://127.0.0.1:4173/mangrove-ecology/`。

## 3. 服务器目录

```text
/opt/mangrove-ecology/
├── releases/
│   └── 20260813T003343Z/
└── current -> releases/20260813T003343Z

/var/www/mangrove-ecology -> /opt/mangrove-ecology/current
```

每次更新都创建新的 UTC 时间戳版本目录，完成验证后再原子切换 `current`。不要覆盖既有版本目录。

## 4. Nginx 子路径配置

现有 `server_name _` server block 中仅增加以下隔离段：

```nginx
# BEGIN MANGROVE_ECOLOGY
location = /mangrove-ecology {
    return 301 /mangrove-ecology/;
}

location ^~ /mangrove-ecology/ {
    root /var/www;
    index index.html;
    try_files $uri/index.html $uri $uri.html =404;
    error_page 404 /mangrove-ecology/404.html;
}
# END MANGROVE_ECOLOGY
```

使用 `root /var/www` 时，请求 `/mangrove-ecology/about` 会内部读取 `/var/www/mangrove-ecology/about/index.html`，不会跳转到前端路由不接受的 `/about/`。

每次修改配置必须先备份，再执行：

```bash
nginx -t
systemctl reload nginx
systemctl is-active nginx
```

如果 `nginx -t` 失败，立即恢复备份配置；不得 reload 无效配置。

## 5. 后续更新流程

1. 使用相同两个环境变量完成四项质量门槛和静态生成。
2. 将 `.output/public/` 的内容打为唯一名称的 `tar.gz`，计算 SHA256。
3. 上传到隔离 incoming 目录，在服务器重新计算并比较 SHA256。
4. 解包到新的 `/opt/mangrove-ecology/releases/<UTC版本>/`，检查入口、三语言、资源与 sitemap。
5. 原子切换：

```bash
ln -s "releases/<UTC版本>" /opt/mangrove-ecology/current.new
mv -Tf /opt/mangrove-ecology/current.new /opt/mangrove-ecology/current
```

`/var/www/mangrove-ecology` 已指向 current，常规内容更新不需要再次修改 Nginx。

6. 验证新站关键页面、资源、控制台、移动端、根站和所有现有子站。
7. 成功后清理 incoming 包；保留当前版本、至少一个可回退版本和对应 Nginx 备份。

## 6. 回滚

### 内容版本回滚

如果后续版本异常，将 current 原子指回上一版本：

```bash
ln -s "releases/<上一版本>" /opt/mangrove-ecology/current.rollback
mv -Tf /opt/mangrove-ecology/current.rollback /opt/mangrove-ecology/current
```

随后重新检查首页、内页、静态资源、三语言和旧站点。内容软链接切换不要求 reload Nginx。

### 首次部署整体撤销

本次首次部署之前没有 mangrove 站点。整体撤销时：

1. 从 `/etc/nginx/conf.d/htmlsite.conf` 删除 `BEGIN/END MANGROVE_ECOLOGY` 标记段，或恢复 `/opt/mangrove-ecology-backups/20260813T003343Z/htmlsite.conf.before`。
2. 执行 `nginx -t`，成功后 reload。
3. 删除 `/var/www/mangrove-ecology` 软链接；确认不再提供流量后再处理 `/opt/mangrove-ecology`。
4. 验证根站、`/joyt-profile/`、`/future-bay-eco-lab/` 和 `/wenchang-brain/`。

## 7. 验收清单

- 新站首页、English、Bahasa Indonesia、关于、研究、项目、成果、平台和负责人页 HTTP `200`。
- Logo、团队照片、JS 与 sitemap HTTP `200`。
- `/mangrove-ecology` 仅重定向到 `/mangrove-ecology/`；未知页面返回 `404`。
- canonical、hreflang、sitemap 和静态资源 URL 只包含一次 `/mangrove-ecology/`。
- 桌面端和 `375px` 移动端无横向溢出、无破图，控制台无 error。
- 根站和所有原有子站仍为 HTTP `200`；受保护文件哈希不变。
- `nginx -t` 通过，Nginx active，没有新增公开监听端口，没有遗留临时进程。

## 8. 当前限制

- 当前为公网 IP + HTTP，没有域名、HTTPS 或证书。
- 获得正式域名后，应将 `NUXT_PUBLIC_SITE_URL` 改为正式 HTTPS 子路径，重新生成并发布 canonical 与 sitemap，再单独设计 TLS 切换和回滚。
- 当前项目目录不是可用 Git repository，发布追踪依靠 UTC 版本号和发布包 SHA256。
