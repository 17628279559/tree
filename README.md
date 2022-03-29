# `vue3` 封装的可视化图，包括 `p5.js` 与 `d3.js`，课内作业

内容较多，包括分形树，直方图，饼图等等，持续更新
目录结构:

```
│ babel.config.js
│ bundle.js
│ package-lock.json
│ package.json
│ README.md
│ vue.config.js
│
├─api #后端 api , config 需要自己配置，未上传
│ appbk_sql.py
│ config.py
│ flask_test.py
│
├─public
│ │ favicon.ico
│ │ index.html
│ │
│ └─fonts
│ Inconsolata-Medium.ttf
│ 汉仪文黑-55 简.ttf
│
└─src
│ App.vue
│ main.js
│
 ├─router
│ index.js # 路由
│
 ├─store
│ index.js # vuex
│
 └─views
├─histogram # 网易云飙升榜实时更新直方图
│ histogram.vue
│
 ├─pieChart # 中国各个城市疫情新增人口实时更新饼图
│ pie.js
│ piechart.vue
│
 ├─tree # 一颗普通的分形树和一颗好看的分形树
│ ├─children
│ │ example1.vue
│ │ example2.vue
│ │
 │ └─main
│ index.vue
│
 └─wordtree # 一颗不怎么好看的文字树
wordtree.vue
```

[详细信息](https://zwt666.top/index.php/archives/9/)

### 下载库

```
npm install
```

### 本地运行

```
npm run serve
```

### 打包

```
npm run build
```
