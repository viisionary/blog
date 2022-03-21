---
title : "Grunt的使用及配置"
date: 2020-07-15
categories : [                              
"架构","微前端",
]
toc: true
tags : [
"前端安全",
]
---

一个用来打包编译js/ts项目的工具

可以使用不同的plugins达到要的效果

可以将写的 es6语法的ts/tsx/单元测试文件

混淆压缩、编译 ES6、运行测试文件

<!--more-->

[Cross-site request forgery - Wikipedia](https://en.wikipedia.org/wiki/Cross-site_request_forgery)

## Grunt的使用及配置


[Getting started - Grunt: The JavaScript Task Runner](https://gruntjs.com/getting-started)


## 安装

```bash
npm install -g grunt-cli
```

### 在项目目录下

```bash
npm install grunt --save-dev

npm install grunt-contrib-uglify --save-dev 
```

### 编辑项目文件

新建index.js 文件 随意编写内容

新建Gruntfile.js

```bash
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'index.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
```

运行grunt将会生成压缩后的文件 目录在dest中定义

## plugins

### uglify ｜ 压缩某个目录下的所有文件

src/index.js

```jsx
import {text} from './testModule';
console.log(text);
```

src/testModule.js

```jsx
exports const text = 'hello';
```

修改Gruntfile 如下

```jsx
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
        dist: {
        files: [{
          expand: true,
          src: ['src/*.js'],
          dest: 'build/',
          ext: '.min.js',
          extDot: 'first',
          rename: function (e, name) {       // The value for rename must be a function
            return e + name.substring(4); // The function must return a string with the complete destination
          }
        }]
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['uglify']);

};
```

### Babel ｜ 编译es6语法

直接安装如下包

```json
		"@babel/core": "^7.14.6",
    "@babel/preset-env": "^7.14.7",
    "grunt-babel": "^8.0.0",
```

配置文件中需要

1. 增加Babel的配置，

2. load插件，

3. 注册插件

编译后

```jsx
/*! mycode 2021-07-15 */

"use strict";var _testModule=require("./testModule");console.log(_testModule.text);
```

bebel配置

```jsx
babel: {
     options: {
       sourceMap: true,
       presets: ['@babel/preset-env']
     },
     dist: {
       files: [{
         expand: true,
         src: ['src/*.js'],
         dest: 'build',
         ext: '.js'
       }]
     }
    },
```

// TODO

### grunt-ts ｜编译ts文件

### grunt-contrib-copy ｜复制文件

### grunt-mocha-test ｜运行测试文件

### grunt.registerTask() ｜自定义Task

## 一个完整配置文件的示例
【ts & mocha & 压缩】

```jsx
module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);
	grunt.registerTask('deleteLib', 'A test task', function () {
		grunt.file.delete('lib')
	});
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		ts: {
			default: {
				src: ["src/*.ts", "!node_modules/**"],
				tsconfig: 'tsconfig.json',
				outDir: "lib"
			},
		},
		// babel: {
		// 	options: {
		// 		sourceMap: true,
		// 		presets: ['@babel/preset-env']
		// 	},
		// 	dist: {
		// 		files: [{
		// 			expand: true,
		// 			src: ['lib/*.js'],
		// 			dest: 'dist',
		// 			ext: '.js'
		// 		}]
		// 	}
		// },
		mochaTest: {
			test: {
				options: {
					reporter: 'spec',
					// captureFile: 'results.txt', // Optionally capture the reporter output to a file
					quiet: false, // Optionally suppress output to standard out (defaults to false)
					clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
					clearCacheFilter: (key) => true, // Optionally defines which files should keep in cache
					noFail: false // Optionally set to not fail on failed tests (will still fail on other errors)
				},
				src: ['lib/test/*.spec.js']
			}
		},
		uglify: {
			options: {
				//在头部添加 js文件名/版本号和时间的注释
				stripBanners: true,
				banner: '/*! <%=pkg.name%>-<%=pkg.version%>.js <%=grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			// files: ['lib/src/*.js', ],
			dist: {
				files: [{
					expand: true,
					cwd: "lib/",
					src: ['src/*.js'],
					dest: 'spider-utils/',
					ext: '.js',
					extDot: 'first',
					rename: function (e, name) {       // The value for rename must be a function
						return e + name.substring(4); // The function must return a string with the complete destination
					}
				}]
			}
		},
		copy: {
			main: {
				files: [{
					expand: true,
					cwd: 'lib/',
					dest: 'spider-utils/',
					src: ['src/*.d.ts'],
					rename: function (e, name) {       // The value for rename must be a function
						return e + name.substring(4); // The function must return a string with the complete destination
					}
				}, { src: 'spider-utils-package.json', dest: 'spider-utils/package.json' }],
			}
		},
	});

	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks("grunt-ts");
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', [
		'ts',
		'mochaTest',
		'uglify',
		'copy',
		'deleteLib'
	],);
};
```
