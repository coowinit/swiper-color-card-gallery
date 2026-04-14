# Swiper Color Card Gallery

<p align="center">
  一个基于 <strong>Swiper</strong> 的色卡联动场景图库组件，适用于家居、建材、地板、户外家具、饰面板等产品展示场景。
</p>

<p align="center">
  <img alt="HTML5" src="https://img.shields.io/badge/HTML5-Static-orange">
  <img alt="CSS3" src="https://img.shields.io/badge/CSS3-Responsive-blue">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-Vanilla-yellow">
  <img alt="Swiper" src="https://img.shields.io/badge/Swiper-11.x-1e90ff">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-green">
</p>

---

## ✨ 项目简介

这个项目实现了一个常见的产品详情展示模块：

- 左侧 / 上方：场景大图轮播
- 下方：缩略图联动切换
- 右侧 / 下方：色卡列表切换不同图片组
- 手机端：色卡区改为横向滑动，更适合触摸操作
- 默认选中第一张色卡
- 支持快速替换为你自己的色卡和场景图素材

这套结构尤其适合以下类型的网站：

- 地板 / 木纹 / 饰面板产品站
- 户外家具 / 家居产品详情页
- 定制材质 / 颜色方案展示页
- 电商产品详情页中的颜色联动模块

---

## 🖼️ 功能特性

- 基于 **Swiper** 实现主图轮播与缩略图联动
- 支持 **按色卡切换整组场景图**
- 默认激活第一组数据
- 桌面端与移动端均有对应布局
- 手机端色卡区域使用 **Swiper 横向滑动**
- 示例素材为 **无文字 SVG 占位图**，方便二次复用
- 不依赖框架，适合嵌入静态页面或已有项目中
- 资源可本地化部署，适合离线或内网环境

---

## 📱 响应式说明

### 桌面端
- 左侧展示主图轮播
- 下方展示缩略图
- 右侧展示色卡网格列表

### 手机端
- 上方展示主图轮播
- 中间展示缩略图
- 下方展示色卡横向滑动列表
- 更适合手指左右滑动和点击切换

---

## 📂 项目结构

```bash
swiper-local-template/
├─ index.html
├─ assets/
│  ├─ css/
│  │  ├─ style.css
│  │  └─ swiper-bundle.min.css
│  ├─ js/
│  │  ├─ app.js
│  │  └─ swiper-bundle.min.js
│  └─ images/
│     ├─ swatches/
│     └─ scenes/
└─ README.md
```

---

## 🚀 快速开始

### 1. 下载项目
将项目文件下载到本地。

### 2. 准备资源
请确保以下 Swiper 文件已经放在对应目录中：

```bash
assets/css/swiper-bundle.min.css
assets/js/swiper-bundle.min.js
```

### 3. 直接运行
由于这是纯前端静态项目，你可以直接双击 `index.html` 预览。

也可以使用本地服务器打开，例如：

```bash
# VS Code Live Server
# 或任意静态服务器
python -m http.server 8080
```

然后访问：

```bash
http://localhost:8080
```

---

## ⚙️ 如何替换成你自己的数据

核心数据在：

```bash
assets/js/app.js
```

你会看到类似这样的数据结构：

```js
const colorGroups = [
  {
    id: "oak-brown",
    name: "Oak Brown",
    swatch: "./assets/images/swatches/oak-brown.svg",
    previewColor: "#8a6248",
    images: [
      "./assets/images/scenes/oak-brown-1.svg",
      "./assets/images/scenes/oak-brown-2.svg",
      "./assets/images/scenes/oak-brown-3.svg"
    ]
  }
];
```

### 字段说明

- `id`：当前色卡唯一标识
- `name`：色卡名称
- `swatch`：右侧色卡图路径
- `previewColor`：Hover 时显示的颜色
- `images`：该色卡对应的场景图数组

### 替换步骤

1. 将你的色卡图放入 `assets/images/swatches/`
2. 将你的场景图放入 `assets/images/scenes/`
3. 修改 `app.js` 中的 `colorGroups` 数据
4. 刷新页面即可看到效果

---

## 🧩 适合集成到哪些项目

你可以把这个模块直接嵌入：

- 品牌官网产品详情页
- Shopify / WooCommerce 等商品展示页
- 定制材质选择页面
- 企业官网中的产品型录页面
- 落地页中的颜色方案展示区域

如果你已经有现成页面结构，也可以只抽取这三部分：

- `index.html` 中的模块 HTML
- `assets/css/style.css`
- `assets/js/app.js`

---

## 🎨 关于示例图片

当前项目中的示例图为**无文字 SVG 占位图**，目的是：

- 避免演示时出现多余文案干扰
- 方便在其他项目中复用
- 让你更容易替换成真实图片素材

如果你后续要接入真实产品图，建议：

- 色卡图尺寸保持统一
- 每组场景图宽高比例尽量一致
- 缩略图与主图使用同一组素材，避免切换跳动

---

## 🔧 常见问题

### 1. 手机端色卡为什么要用 Swiper？
因为原生横向滚动在部分手机浏览器中容易出现“半张卡片露出”或看起来重叠的问题。使用 Swiper 后，拖动和吸附会更稳定。

### 2. 为什么不使用 Bootstrap？
当前组件结构相对简单，纯 CSS 更轻量，也更方便嵌入已有项目。如果你的站点本身已经使用 Bootstrap，也可以很容易把外层容器接入到现有栅格中。

### 3. 可以接接口数据吗？
可以。只需要把 `colorGroups` 改成接口返回的数据，再动态渲染即可。

### 4. 可以加图片放大功能吗？
可以。后续可以接入 PhotoSwipe、Fancybox 或其他 Lightbox 方案。

---

## 🛠️ 后续可扩展方向

- 接入接口数据渲染
- 增加图片放大预览
- 增加当前色卡名称 / 编号显示
- 增加自动播放
- 增加淡入切换动画
- 支持视频缩略图与视频主图
- 接入 Vue / React 组件化版本

---

## 📸 推荐的 GitHub 展示方式

你可以在仓库 README 顶部再补一张预览图，例如：

```md
![Preview](./preview.png)
```

如果你后面有页面截图，建议命名为：

```bash
preview-desktop.png
preview-mobile.png
```

然后在 README 中这样展示：

```md
## Preview

### Desktop
![Desktop Preview](./preview-desktop.png)

### Mobile
![Mobile Preview](./preview-mobile.png)
```

---

## 📄 License

MIT

---

## English Summary

A responsive product gallery built with **Swiper**, featuring:

- main image slider
- thumbnail navigation
- color swatch switching
- mobile-friendly swatch slider
- static HTML / CSS / JavaScript structure
- easy replacement with your own assets

Suitable for furniture, flooring, material, finish, and product detail pages.

---

如果这个项目会公开到 GitHub，建议你下一步补上：
1. `LICENSE`
2. `preview.png`
3. 仓库 Topics，例如：`swiper`、`gallery`、`product-detail`、`responsive-ui`
