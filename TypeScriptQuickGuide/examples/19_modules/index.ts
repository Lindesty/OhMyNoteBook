// 模块示例代码
// 运行方式: npx tsx src/10_modules/index.ts

console.log("=== TypeScript 模块示例 ===\n");

// ==================== 模拟模块系统 ====================
console.log("1. 模块导出和导入演示");

// 模拟一个模块
const MathModule = {
  PI: 3.14159,
  add: (a: number, b: number) => a + b,
  subtract: (a: number, b: number) => a - b,
  multiply: (a: number, b: number) => a * b,
  divide: (a: number, b: number) => a / b
};

// 解构导入（模拟命名导入）
const { PI, add, subtract } = MathModule;
console.log(`  PI = ${PI}`);
console.log(`  add(1, 2) = ${add(1, 2)}`);
console.log(`  subtract(5, 3) = ${subtract(5, 3)}`);

// ==================== 类型导入 ====================
console.log("\n2. 类型导入");

// 定义类型（模拟从类型模块导入）
interface User {
  id: number;
  name: string;
  email: string;
}

type UserRole = "admin" | "user" | "guest";

const user: User = {
  id: 1,
  name: "Tom",
  email: "tom@example.com"
};

const role: UserRole = "admin";
console.log(`  用户: ${user.name}, 角色: ${role}`);

// ==================== 动态导入 ====================
console.log("\n3. 动态导入（模拟）");

async function loadModuleDynamically() {
  console.log("  开始加载模块...");

  // 模拟动态加载
  await new Promise(resolve => setTimeout(resolve, 100));

  // 实际使用：const module = await import('./module');
  const dynamicModule = {
    greet: (name: string) => `Hello, ${name}!`
  };

  console.log(`  ${dynamicModule.greet("Dynamic Import")}`);
}

loadModuleDynamically();

// ==================== 命名空间模拟 ====================
console.log("\n4. 命名空间模式");

namespace Utils {
  export function formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
  }

  export function formatDate(date: Date): string {
    return date.toLocaleDateString();
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

console.log(`  价格格式化: ${Utils.formatPrice(99.999)}`);
console.log(`  日期格式化: ${Utils.formatDate(new Date())}`);
console.log(`  邮箱验证: ${Utils.Validation.isEmail("test@example.com")}`);
console.log(`  电话验证: ${Utils.Validation.isPhone("1234567890")}`);

// ==================== Barrel 模式 ====================
console.log("\n5. Barrel 导出模式");

// 模拟多个子模块
const mathUtils = {
  square: (n: number) => n * n,
  cube: (n: number) => n * n * n
};

const stringUtils = {
  capitalize: (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
  lowercase: (s: string) => s.toLowerCase()
};

const arrayUtils = {
  first: <T>(arr: T[]) => arr[0],
  last: <T>(arr: T[]) => arr[arr.length - 1],
  unique: <T>(arr: T[]) => [...new Set(arr)]
};

// Barrel 导出
const utils = { ...mathUtils, ...stringUtils, ...arrayUtils };

console.log(`  square(4) = ${utils.square(4)}`);
console.log(`  capitalize("hello") = ${utils.capitalize("hello")}`);
console.log(`  first([1,2,3]) = ${utils.first([1, 2, 3])}`);

// ==================== 服务类模块 ====================
console.log("\n6. 服务模块模式");

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<T> {
    console.log(`  GET ${this.baseUrl}${endpoint}`);
    // 模拟请求
    return {} as T;
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    console.log(`  POST ${this.baseUrl}${endpoint}`, data);
    return {} as T;
  }
}

class UserService {
  constructor(private api: ApiService) {}

  async getUser(id: number) {
    return this.api.get<User>(`/users/${id}`);
  }

  async createUser(data: Partial<User>) {
    return this.api.post<User>("/users", data);
  }
}

// 模块组装
const api = new ApiService("https://api.example.com");
const userService = new UserService(api);

console.log("  服务初始化完成");
userService.getUser(1); // 模拟调用

// ==================== 工厂模式模块 ====================
console.log("\n7. 工厂模块模式");

interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`  [LOG] ${message}`);
  }
}

class FileLogger implements Logger {
  log(message: string): void {
    console.log(`  [FILE] ${message}`);
  }
}

function createLogger(type: "console" | "file"): Logger {
  switch (type) {
    case "console":
      return new ConsoleLogger();
    case "file":
      return new FileLogger();
  }
}

const consoleLogger = createLogger("console");
consoleLogger.log("Hello from console logger");

// ==================== 配置模块 ====================
console.log("\n8. 配置模块");

interface AppConfig {
  apiUrl: string;
  timeout: number;
  debug: boolean;
}

const defaultConfig: AppConfig = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  debug: false
};

function createConfig(overrides?: Partial<AppConfig>): AppConfig {
  return { ...defaultConfig, ...overrides };
}

const config = createConfig({ debug: true });
console.log(`  配置: ${JSON.stringify(config)}`);

console.log("\n=== 模块示例运行完成 ===");