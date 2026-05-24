# 情绪治愈馆 - 完整版

一个专为情绪疗愈的应用，包含网页版和微信小程序版两个版本。

## 功能特点

### 核心功能
- 🎵 每日心情识别与推荐
- 📚 心情记录与历史查询
- 📊 心情趋势可视化（周/月/季/年）
- ❤️ 收藏功能
- 📱 移动端适配
- 🌓 深色/浅色主题切换

### 歌曲优化
- 每种心情30首歌曲推荐，每日随机不重复
- 支持点击爱心收藏歌曲
- 推荐时优先推荐收藏内容
- 网易云搜索链接，永不会失效
- 移除添加歌单链接

### 书籍优化
- 每类心情5本短篇治愈书籍
- 书籍简介加长，方便了解内容
- 复制书名功能，微信读书手动搜索

## 项目结构

```
.
├── index.html              # 网页版主文件
├── README.md               # 说明文档
└── miniprogram/            # 微信小程序版
    ├── app.js
    ├── app.json
    ├── app.wxss
    └── pages/
        ├── index/           # 发现治愈页
        ├── record/        # 心情记录页
        └── trend/         # 趋势分析页
```

## 网页版本地运行方法

### 方法一：直接打开
1. 直接双击 `index.html` 文件，用浏览器打开即可使用

### 方法二：本地服务器（推荐）
如果你有 Node.js，可以使用以下方法运行：

```bash
# 使用 Python
python -m http.server 8000

# 或使用 Node.js
npx serve
```

然后在浏览器访问 `http://localhost:8000`

## GitHub Pages 部署步骤

### 1. 准备仓库
1. 注册/登录 GitHub
2. 创建新仓库或使用现有仓库

### 2. 上传文件
1. 将 `index.html` 文件上传到你的 GitHub 仓库
2. 确保仓库名称：
   - 如果使用 `index.html` 放在仓库根目录
   - 或放在 `gh-pages` 分支中

### 3. 开启 GitHub Pages
1. 在 GitHub 仓库页面，点击 `Settings`
2. 在左侧菜单选择 `Pages`
3. 在 `Source` 选项中选择 `main` 或 `gh-pages` 分支
4. 点击 `Save` 保存设置
5. 等待几分钟，访问链接就会生效

### 4. 访问你的应用
访问地址格式：`https://[你的用户名].github.io/[仓库名]/

## 小程序版导入微信开发者工具的步骤

### 1. 准备开发环境
1. 下载并安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 注册并登录微信小程序账号（可选，测试可用测试号

### 2. 导入项目
1. 打开微信开发者工具
2. 选择 `小程序` → `导入项目`
3. 选择 `miniprogram` 文件夹
4. 填写 AppID（如果没有，可以使用测试号

### 3. 预览发布
1. 点击「编译预览
2. 在开发者工具中可以查看效果
3. 如需发布，点击「上传」
4. 然后在微信公众平台提交审核

## 文件说明

### 网页版
- `index.html` - 完整的单页应用
- 使用 Tailwind CSS 进行样式设计
- 使用 localStorage 本地存储所有数据
- 深色/浅色主题切换

### 小程序版
- `app.js` - 小程序入口文件
- `app.json` - 小程序配置文件
- `app.wxss` - 全局样式
- `pages/index/` - 发现治愈页面
- `pages/record/` - 心情记录页面
- `pages/trend/` - 趋势分析页面

## 数据说明

所有用户数据只保存在本地（localStorage/wx.storage），不会上传到任何服务器。

## 心情分类：开心、平静、疲惫、焦虑、难过、抑郁、烦躁、孤独、生气、失落、幸福、满足

## 技术栈

### 网页版
- HTML5
- Tailwind CSS
- JavaScript (ES6+)
- localStorage

### 小程序版
- 微信小程序框架
- WXML + WXSS + JavaScript

## License

MIT License - 请自由使用和修改
