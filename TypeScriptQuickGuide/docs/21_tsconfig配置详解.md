# tsconfig 配置详解

`tsconfig.json` 是 TypeScript 项目的配置文件，控制编译行为、类型检查规则和输出选项。对于来自 Java/C# 的开发者，这类似于 `pom.xml`、`build.gradle` 或 `.csproj` 文件的作用。

## 基本结构

```json
{
  "compilerOptions": {
    // 编译选项
  },
  "include": [
    // 包含的文件
  ],
  "exclude": [
    // 排除的文件
  ],
  "files": [
    // 指定的文件
  ],
  "extends": [
    // 继承的配置
  ],
  "references": [
    // 项目引用
  ]
}
```

## compilerOptions 核心选项

### target - 编译目标

指定生成的 JavaScript 版本：

```json
{
  "compilerOptions": {
    "target": "ES2022"
  }
}
```

可选值：
| 值 | 说明 |
|---|------|
| `ES3` | ECMAScript 3（默认） |
| `ES5` | ECMAScript 5 |
| `ES6` / `ES2015` | ECMAScript 2015 |
| `ES2017` | 支持 async/await |
| `ES2020` | 支持 ?? 和 ?. |
| `ES2022` | 支持 top-level await |
| `ESNext` | 最新特性 |

```ts
// 源码
const fn = async () => {
  const result = await fetch("/");
  return result?.json() ?? {};
};

// target: ES5 编译后
var __awaiter = ... // 生成大量辅助代码

// target: ES2017 编译后
const fn = async () => { ... }; // 原样保留
```

### module - 模块系统

指定生成的模块系统：

```json
{
  "compilerOptions": {
    "module": "ESNext"
  }
}
```

可选值：
| 值 | 说明 | 适用场景 |
|---|------|---------|
| `CommonJS` | Node.js 模块 | Node.js 后端 |
| `ES6` / `ES2015` | ES 模块 | 浏览器/打包工具 |
| `ESNext` | 最新 ES 模块 | 打包工具 |
| `UMD` | 通用模块 | 库开发 |
| `AMD` | RequireJS | 旧项目 |
| `System` | SystemJS | 特定场景 |
| `NodeNext` | Node.js ESM | Node.js ESM 项目 |
| `Node16` | Node.js 16+ | Node.js ESM 项目 |

### moduleResolution - 模块解析策略

```json
{
  "compilerOptions": {
    "moduleResolution": "node"
  }
}
```

| 值 | 说明 |
|---|------|
| `node` | Node.js 解析规则（默认） |
| `classic` | 旧版解析规则（不推荐） |
| `node16` / `nodenext` | Node.js ESM 解析规则 |
| `bundler` | 打包工具解析规则（Vite、webpack） |

### lib - 内置类型库

指定可用的内置 API 类型：

```json
{
  "compilerOptions": {
    "lib": ["ES2022", "DOM", "DOM.Iterable"]
  }
}
```

| 值 | 说明 |
|---|------|
| `ES2022` | ES2022 API（Promise、Array 方法等） |
| `ES2023` | ES2023 API |
| `DOM` | DOM API（document、window） |
| `DOM.Iterable` | DOM 可迭代对象 |
| `ES2022.Promise` | Promise 特定方法 |
| `ES2022.String` | String 特定方法 |

### strict 模式

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

`strict: true` 等价于启用所有严格选项：

```json
{
  "compilerOptions": {
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "useUnknownInCatchVariables": true,
    "alwaysStrict": true
  }
}
```

#### noImplicitAny

```ts
// noImplicitAny: false
function fn(x) {  // x: any（隐式）
  return x.toUpperCase();
}

// noImplicitAny: true
function fn(x) {  // ❌ 错误：参数 x 隐式具有 any 类型
  return x.toUpperCase();
}

// 正确写法
function fn(x: string) {
  return x.toUpperCase();
}
```

#### strictNullChecks

```ts
// strictNullChecks: false
const name: string = null; // ✅ 允许
const length = name.length; // 运行时错误！

// strictNullChecks: true
const name: string = null; // ❌ 错误：null 不能赋给 string
const name: string | null = null; // ✅ 正确

// 使用可选链和空值合并
const length = name?.length ?? 0;
```

#### strictPropertyInitialization

```ts
// strictPropertyInitialization: true
class User {
  name: string; // ❌ 错误：属性 name 没有初始化
}

// 正确写法
class User {
  name: string = "";  // 初始化
  // 或
  name!: string;      // 断言会被赋值
  // 或
  name?: string;      // 可选属性
}
```

### 路径映射

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}
```

```ts
// 使用别名导入
import { Button } from "@components/Button";
import { formatDate } from "@utils/date";

// 而不是
import { Button } from "../../../components/Button";
import { formatDate } from "../../../utils/date";
```

### rootDir 和 outDir

```json
{
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  }
}
```

```
项目结构：
├── src/
│   ├── index.ts
│   └── utils.ts
└── dist/
    ├── index.js      # 编译输出
    └── utils.js
```

### 声明文件生成

```json
{
  "compilerOptions": {
    "declaration": true,           // 生成 .d.ts 文件
    "declarationMap": true,        // 生成 .d.ts.map 文件
    "sourceMap": true,             // 生成 .js.map 文件
    "outDir": "dist",
    "declarationDir": "dist/types" // .d.ts 文件输出目录
  }
}
```

### 其他重要选项

```json
{
  "compilerOptions": {
    // 允许 JS 文件
    "allowJs": true,

    // 检查 JS 文件
    "checkJs": true,

    // JSX 支持
    "jsx": "react-jsx",

    // 启用 ES 模块互操作
    "esModuleInterop": true,

    // 允许合成默认导入
    "allowSyntheticDefaultImports": true,

    // 跳过库检查（加快编译）
    "skipLibCheck": true,

    // 强制文件名大小写一致
    "forceConsistentCasingInFileNames": true,

    // 解析 JSON 模块
    "resolveJsonModule": true,

    // 将每个文件作为单独模块
    "isolatedModules": true,

    // 不生成输出文件（仅类型检查）
    "noEmit": true
  }
}
```

## include 和 exclude

### include

指定包含的文件：

```json
{
  "include": [
    "src/**/*",          // src 目录下所有文件
    "types/**/*.d.ts",  // types 目录下所有声明文件
    "test/**/*.ts"      // test 目录下所有 TS 文件
  ]
}
```

### exclude

指定排除的文件：

```json
{
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts",
    "**/*.spec.ts"
  ]
}
```

### files

显式指定文件（优先级最高）：

```json
{
  "files": [
    "src/index.ts",
    "src/types/global.d.ts"
  ]
}
```

## extends - 配置继承

### 继承本地配置

```json
// tsconfig.base.json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "module": "ESNext"
  }
}

// tsconfig.json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist"
  }
}
```

### 继承 npm 包配置

```bash
npm install --save-dev @tsconfig/recommended
```

```json
{
  "extends": "@tsconfig/recommended/tsconfig.json"
}
```

常用预设：
- `@tsconfig/recommended` - 推荐配置
- `@tsconfig/node16` - Node.js 16 配置
- `@tsconfig/create-react-app` - Create React App 配置
- `@tsconfig/strictest` - 最严格配置

## references - 项目引用

用于 monorepo 或多项目结构：

```json
// tsconfig.json（根配置）
{
  "references": [
    { "path": "./packages/core" },
    { "path": "./packages/utils" }
  ],
  "files": []
}

// packages/core/tsconfig.json
{
  "compilerOptions": {
    "composite": true,  // 必须启用
    "outDir": "dist"
  }
}

// packages/utils/tsconfig.json
{
  "compilerOptions": {
    "composite": true
  },
  "references": [
    { "path": "../core" }
  ]
}
```

## 常见配置模板

### Node.js 项目

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "CommonJS",
    "moduleResolution": "node",
    "lib": ["ES2022"],
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Node.js ESM 项目

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2022"],
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

### 前端项目（Vite）

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"]
}
```

### React 项目

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "allowSyntheticDefaultImports": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 库开发

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020"],
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true
  },
  "include": ["src"]
}
```

### 最严格配置

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "useUnknownInCatchVariables": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "allowUnusedLabels": false,
    "allowUnreachableCode": false
  }
}
```

## 与打包工具配合

### Vite

TypeScript 只用于类型检查，不进行编译（Vite 使用 esbuild）：

```json
{
  "compilerOptions": {
    "noEmit": true,
    "moduleResolution": "bundler"
  }
}
```

### Webpack (ts-loader)

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "target": "ES2022"
  }
}
```

### esbuild

esbuild 不读取 tsconfig.json 的模块/目标设置，只用于类型检查：

```bash
# 使用 esbuild 构建
esbuild src/index.ts --bundle --outfile=dist/bundle.js

# 使用 tsc 进行类型检查
tsc --noEmit
```

## 最佳实践

### 1. 始终启用 strict

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

### 2. 使用路径别名简化导入

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### 3. 根据运行环境选择 target 和 module

| 环境 | target | module |
|------|--------|--------|
| Node.js | ES2022 | CommonJS |
| Node.js ESM | ES2022 | NodeNext |
| 浏览器（打包工具） | ES2022 | ESNext |
| 旧浏览器 | ES5 | ESNext |

### 4. 分离配置文件

```
project/
├── tsconfig.json          # 主配置
├── tsconfig.build.json    # 构建配置
└── tsconfig.test.json     # 测试配置
```

```json
// tsconfig.build.json
{
  "extends": "./tsconfig.json",
  "exclude": ["**/*.test.ts", "**/*.spec.ts"]
}
```

### 5. 使用 composite 管理大型项目

```json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "declarationMap": true
  }
}
```