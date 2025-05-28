[toc]

# 0. ESLint简介

ESLint是一种静态代码检查工具, 因为JavaScript宽松的语法特性, 往往会存在难以察觉和不规范,不统一的代码.

ESLint就是规范JavaScript的工具, 可以指出潜在的运行时漏洞、未使用最佳实践、风格问题等.

# 1. 安装

* 安装

```npm
pnpm add eslint -D
```

由于每个项目规则可能都不同, 不推荐全局安装

* 创建配置文件

```npm
touch .eslintrc.json
```

配置文件也可以是.yaml, .json文件

# 2. 核心概念

## 2.1 规则

规则是 ESLint 的核心构建块. 规则会验证你的代码是否符合预期, 以及如果不符合预期该怎么做.

比如semi规则, 规定JavaScript结尾是否都应该包含分号( ; ).

ESLint内置了很多规则.

## 2.2 配置文件

你可以在配置文件中设置规则, 复用他人的规则, 引入其它配置文件项, 并且设置规则的应用范围等内容.

## 2.3 共享配置

可共享配置是指通过 npm 分享的 ESLint 配置.

比如可共享配置 [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) 就实现了受欢迎的 Airbnb JavaScript 风格指南

## 2.4 插件

ESLint 插件是一个包含 ESLint 规则, 配置, 解析器和环境变量的集合的 npm 模块. 

通常插件包括自定义规则.

## 2.5 解析器

ESLint 解析器将代码转换为 ESLint 可以评估的抽象语法树(AST, abstract syntax tree). 默认情况下, ESLint 使用内置的与标准 JavaScript运行时和版本兼容的 [Espree](https://github.com/eslint/espree) 解析器.

自定义解析器让 ESLint 可以解析非标准的 JavaScript 语法. 通常自定义解析器会被包含在可共享配置或插件中, 这样你就不需要直接使用它们了.

比如用于让 ESLint 可以解析 TypeScript 代码的 [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) 解析器就被包含在 [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) 插件中

## 2.6 自定义处理器

ESLint 处理器可以从其他类型的文件中提取 JavaScript 代码

自定义处理器可以在 ESLint 解析 JavaScript 之前运作.

例如 [eslint-plugin-markdown](https://github.com/eslint/eslint-plugin-markdown) 就包括一个自定义处理器, 让你可以对 Markdown 代码块内的 JavaScript 代码进行检查.

## 2.7 Node.js API

ESLint 的 Node.js API 让你可以在 Node.js 代码中以编程的方式使用 ESLint. 该 API 在开发插件, 集成和其他与 ESLint 相关的工具时非常有用.

除非你要以某种方式扩展 ESLint, 否则你就应该使用命令行.