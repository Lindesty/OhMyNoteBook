// tsconfig 配置示例代码
// 注意：此文件展示 tsconfig 各选项的效果

// ==================== target 选项效果 ====================
console.log("=== target 选项效果 ===");

// ES2022 特性：顶层 await（在模块中）
// ES2020 特性：可选链和空值合并
const data: { user?: { name?: string } } = {};
const name = data.user?.name ?? "Unknown";
console.log("可选链和空值合并:", name);

// ES2020 特性：BigInt
const bigNumber: bigint = 123n;
console.log("BigInt:", bigNumber);

// ==================== strict 选项效果 ====================
console.log("\n=== strict 选项效果 ===");

// strictNullChecks
let userName: string;
// userName = null; // 编译错误（strict 模式下）
userName = "Tom";
console.log("用户名:", userName);

// noImplicitAny
function processValue(value: string) {  // 必须显式声明类型
  return value.toUpperCase();
}
console.log("处理值:", processValue("hello"));

// ==================== 模块解析示例 ====================
console.log("\n=== 模块解析示例 ===");

// 动态导入（需要 target ES2020+）
async function loadModule() {
  // const module = await import('./some-module');
  console.log("动态导入示例（ES2020 特性）");
}
loadModule();

// ==================== 路径映射示例 ====================
console.log("\n=== 路径映射示例 ===");

// 假设在 tsconfig.json 中配置了：
// "baseUrl": "."
// "paths": { "@/*": ["src/*"] }

// 实际导入示例：
// import { something } from "@utils/helper";
// 这会被解析为: src/utils/helper.ts

console.log("路径映射: @/ 会被解析为 src/");

// ==================== 装饰器示例（需要启用） ====================
console.log("\n=== 装饰器示例 ===");

// 旧版装饰器语法（需要 experimentalDecorators: true）
function logged(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`调用 ${propertyKey}`);
    return original.apply(this, args);
  };
}

class Example {
  @logged
  method() {
    return "result";
  }
}

const example = new Example();
console.log("装饰器方法:", example.method());

// ==================== 类型检查选项效果 ====================
console.log("\n=== 类型检查选项效果 ===");

// noUnusedLocals - 检查未使用的变量
// noUnusedParameters - 检查未使用的参数
// noImplicitReturns - 检查所有代码路径都有返回值

function checkedFunction(value: number): number {
  if (value > 0) {
    return value;
  }
  return 0; // 如果没有这个返回，noImplicitReturns 会报错
}

console.log("检查函数:", checkedFunction(5));

// ==================== 环境配置检测 ====================
console.log("\n=== 环境信息 ===");

console.log("Node.js 版本:", process.version);
console.log("当前目录:", process.cwd());

// 检测是否在 TypeScript 环境
console.log("运行时: TypeScript 编译后的 JavaScript");

// ==================== 编译选项影响示例 ====================
console.log("\n=== 编译选项影响 ===");

// sourceMap 启用后可以调试源码
// declaration 启用后会生成 .d.ts 文件
// outDir 指定输出目录

console.log("编译输出位置: 由 outDir 选项决定");
console.log("源码映射: 由 sourceMap 选项决定");

// ==================== ES 模块 vs CommonJS ====================
console.log("\n=== 模块系统 ===");

// ES 模块语法
// export const value = 1;
// import { value } from './module';

// CommonJS 语法（module: CommonJS）
// const value = require('./module');
// module.exports = { value };

console.log("当前使用 ES 模块语法");
console.log("module 选项决定输出格式");

console.log("\n=== tsconfig 示例运行完成 ===");

// 导出示例（ES 模块）
export { checkedFunction, Example };