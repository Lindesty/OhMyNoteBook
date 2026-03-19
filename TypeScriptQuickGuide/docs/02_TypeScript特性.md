# TypeScript 特性

TypeScript 是 JavaScript 的超集，增加了静态类型系统和面向对象特性。对于 Java/C# 开发者，TypeScript 提供了熟悉的编程范式。

## 核心特性概览

### 1. 静态类型检查

TypeScript 在编译时检查类型，在运行前发现错误：

```ts
// 编译时错误
const name: string = 123; // ❌ 类型错误

// 运行时保护
function greet(name: string) {
  return `Hello, ${name.toUpperCase()}`;
}
greet(123); // ❌ 编译错误
```

### 2. 类型推断

TypeScript 自动推断变量类型：

```ts
let name = "Tom";      // 推断为 string
let count = 10;        // 推断为 number
let items = [1, 2, 3]; // 推断为 number[]

// 函数返回值推断
function add(a: number, b: number) {
  return a + b; // 推断返回 number
}
```

### 3. 接口和类型定义

```ts
// 接口定义数据结构
interface User {
  id: number;
  name: string;
  email?: string; // 可选属性
}

// 类型别名
type ID = string | number;
type Point = { x: number; y: number };
```

### 4. 类和继承

```ts
class Animal {
  constructor(public name: string) {}

  speak(): string {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  speak(): string {
    return `${this.name} barks`;
  }
}
```

### 5. 模块系统

```ts
// 导出
export const PI = 3.14159;
export function calculate(r: number) { ... }
export class Circle { ... }

// 导入
import { PI, calculate, Circle } from './math';
import * as math from './math';
```

### 6. 泛型

```ts
function identity<T>(arg: T): T {
  return arg;
}

class Container<T> {
  constructor(public value: T) {}
}
```

### 7. 装饰器

```ts
function logged(target: any, key: string, descriptor: PropertyDescriptor) {
  // ...
}

class Example {
  @logged
  method() {}
}
```

## 与 JavaScript 的关系

TypeScript 是 JavaScript 的**超集**：

```ts
// 所有合法的 JavaScript 都是合法的 TypeScript
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);

// TypeScript 添加类型注解
const numbers: number[] = [1, 2, 3];
const doubled: number[] = numbers.map((n: number) => n * 2);
```

## 与 Java/C# 的对比

| 特性 | Java | C# | TypeScript |
|------|------|-----|------------|
| 类型系统 | 静态+名义类型 | 静态+名义类型 | 静态+结构类型 |
| 类型擦除 | 是 | 是 | 是 |
| 运行时类型检查 | RTTI/反射 | 反射 | 无（需手动实现） |
| 接口 | 必须显式实现 | 必须显式实现 | 鸭子类型 |
| 泛型 | 类型擦除 | 运行时保留 | 类型擦除 |
| 重载 | 真正重载 | 真正重载 | 类型签名+单实现 |
| 异常 | 检查异常+运行时异常 | 运行时异常 | 运行时异常 |
| async/await | CompletableFuture | Task | Promise |
| 模块 | 包系统 | 命名空间+程序集 | ES模块 |

## 编译过程

```
.ts 文件 → TypeScript 编译器 → .js 文件
```

TypeScript 代码编译后：

```ts
// TypeScript 源码
interface User {
  name: string;
}

const user: User = { name: "Tom" };

// 编译后的 JavaScript
"use strict";
const user = { name: "Tom" };
```

类型信息在编译后被完全移除。

## 开发体验

### 智能提示

IDE 能提供完整的代码补全：

```ts
const user = { name: "Tom", age: 30 };
user. // 自动提示 name, age
```

### 错误检测

编译时发现常见错误：

```ts
// 未定义变量
console.log(unknownVariable); // ❌ 找不到名称

// 类型不匹配
const x: number = "hello"; // ❌ 不能将 string 赋给 number

// 缺少必需属性
interface Config { url: string; }
const config: Config = {}; // ❌ 缺少 url
```

### 重构支持

- 重命名符号（F2）
- 提取函数/变量
- 自动导入
- 移动文件时更新导入

## 渐进式采用

可以逐步将 JavaScript 项目迁移到 TypeScript：

```ts
// 允许 JS 文件
// tsconfig.json: { "allowJs": true }

// 使用 JSDoc 提供类型
/**
 * @param {string} name
 * @returns {string}
 */
function greet(name) {
  return `Hello, ${name}`;
}

// 混合使用
import { jsFunction } from './legacy.js'; // JS 文件
import { tsFunction } from './modern.ts'; // TS 文件
```