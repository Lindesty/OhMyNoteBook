// 声明文件示例代码
// 注意：这个示例展示了如何使用声明文件中的类型

// ==================== 全局变量声明示例 ====================
// 假设在 global.d.ts 中有如下声明：
// declare const __APP_VERSION__: string;
// declare const __DEBUG__: boolean;

// 这里模拟全局变量
declare global {
  const __APP_VERSION__: string;
  const __DEBUG__: boolean;
}

// 模拟全局变量赋值
(global as any).__APP_VERSION__ = "1.0.0";
(global as any).__DEBUG__ = true;

console.log("=== 全局变量声明 ===");
console.log("应用版本:", __APP_VERSION__);
console.log("调试模式:", __DEBUG__);

// ==================== 模块声明示例 ====================
// 假设有一个未提供类型的第三方库 my-lib
// 在 types/my-lib.d.ts 中声明：

declare module "my-lib" {
  export function greet(name: string): string;
  export class Calculator {
    add(a: number, b: number): number;
    multiply(a: number, b: number): number;
  }
  export const version: string;
}

// 使用声明的模块（模拟）
const myLib = {
  greet: (name: string) => `Hello, ${name}!`,
  Calculator: class {
    add(a: number, b: number) { return a + b; }
    multiply(a: number, b: number) { return a * b; }
  },
  version: "1.0.0"
};

console.log("\n=== 模块声明 ===");
console.log(myLib.greet("Tom"));
const calc = new myLib.Calculator();
console.log("1 + 2 =", calc.add(1, 2));
console.log("3 * 4 =", calc.multiply(3, 4));
console.log("版本:", myLib.version);

// ==================== 扩展内置类型 ====================
// 扩展 express Request 接口的示例（模拟）

interface MockRequest {
  params: Record<string, string>;
  query: Record<string, string>;
  body: unknown;
  // 扩展属性
  user?: {
    id: string;
    role: string;
  };
}

function handleRequest(req: MockRequest) {
  console.log("\n=== 扩展内置类型 ===");
  console.log("用户ID:", req.user?.id);
  console.log("用户角色:", req.user?.role);
}

handleRequest({
  params: {},
  query: {},
  body: null,
  user: { id: "123", role: "admin" }
});

// ==================== 命名空间声明示例 ====================
namespace Utils {
  export interface User {
    id: number;
    name: string;
  }

  export function createUser(name: string): User {
    return { id: Math.random(), name };
  }

  export namespace Validation {
    export function isEmail(email: string): boolean {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    export function isPhone(phone: string): boolean {
      return /^\d{10,}$/.test(phone);
    }
  }
}

console.log("\n=== 命名空间声明 ===");
const utilsUser = Utils.createUser("Tom");
console.log("创建用户:", utilsUser);
console.log("验证邮箱:", Utils.Validation.isEmail("tom@example.com"));
console.log("验证电话:", Utils.Validation.isPhone("1234567890"));

// ==================== 类型合并示例 ====================
interface User {
  id: number;
  name: string;
}

// 同名接口会自动合并
interface User {
  email: string;
  role: string;
}

const mergedUser: User = {
  id: 1,
  name: "Tom",
  email: "tom@example.com",
  role: "admin"
};

console.log("\n=== 类型合并 ===");
console.log("合并后的用户:", mergedUser);

// ==================== 类型守卫函数 ====================
function isUser(value: unknown): value is User {
  const u = value as User;
  return (
    typeof value === "object" &&
    value !== null &&
    typeof u.id === "number" &&
    typeof u.name === "string" &&
    typeof u.email === "string"
  );
}

// ==================== 声明文件工具函数示例 ====================
function createTypedProxy<T extends object>(target: T): T {
  return new Proxy(target, {
    get(obj, prop) {
      console.log(`[代理] 访问属性: ${String(prop)}`);
      return obj[prop as keyof T];
    },
    set(obj, prop, value) {
      console.log(`[代理] 设置属性: ${String(prop)} = ${value}`);
      obj[prop as keyof T] = value;
      return true;
    }
  });
}

console.log("\n=== 类型代理 ===");
const proxiedUser = createTypedProxy({ name: "Tom", age: 30 });
console.log("获取 name:", proxiedUser.name);
proxiedUser.age = 31;

console.log("\n=== 声明文件示例运行完成 ===");