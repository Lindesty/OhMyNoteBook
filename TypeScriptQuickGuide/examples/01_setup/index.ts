// 安装配置示例代码
// 运行方式: npx tsx src/01_setup/index.ts

console.log("=== TypeScript 安装配置验证 ===\n");

// 检查 Node.js 版本
console.log("Node.js 版本:", process.version);
console.log("Node.js 平台:", process.platform);
console.log("Node.js 架构:", process.arch);

// 检查 npm 版本
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function checkVersions() {
  try {
    const { stdout: npmVersion } = await execAsync('npm -v');
    console.log("npm 版本:", npmVersion.trim());

    const { stdout: tscVersion } = await execAsync('npx tsc -v');
    console.log("TypeScript 版本:", tscVersion.trim());
  } catch (error) {
    console.log("版本检查失败，请确保已正确安装");
  }
}

// TypeScript 特性演示
console.log("\n=== TypeScript 特性演示 ===\n");

// 静态类型检查
const message: string = "Hello, TypeScript!";
console.log("字符串:", message);

// 接口定义
interface User {
  id: number;
  name: string;
  email: string;
}

// 使用接口
const user: User = {
  id: 1,
  name: "Tom",
  email: "tom@example.com"
};
console.log("用户:", user);

// 类定义
class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }
}

const calc = new Calculator();
console.log("计算器: 5 + 3 =", calc.add(5, 3));
console.log("计算器: 10 - 4 =", calc.subtract(10, 4));

// 泛型
function identity<T>(arg: T): T {
  return arg;
}

console.log("泛型函数:", identity("Hello"));
console.log("泛型函数:", identity(42));

// 异步操作
async function delay(ms: number): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => resolve(`延迟 ${ms}ms 完成`), ms);
  });
}

async function main() {
  await checkVersions();

  console.log("\n异步操作演示:");
  const result = await delay(100);
  console.log(result);

  console.log("\n=== 验证完成 ===");
  console.log("TypeScript 开发环境配置正确！");
}

main();