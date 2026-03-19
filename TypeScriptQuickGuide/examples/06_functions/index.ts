// 函数示例代码
// 运行方式: npx tsx src/06_functions/index.ts

console.log("=== TypeScript 函数示例 ===\n");

// ==================== 函数声明 ====================
console.log("1. 函数声明方式");

// 函数声明
function add(a: number, b: number): number {
  return a + b;
}

// 函数表达式
const subtract = function(a: number, b: number): number {
  return a - b;
};

// 箭头函数
const multiply = (a: number, b: number): number => a * b;

console.log(`  add(1, 2) = ${add(1, 2)}`);
console.log(`  subtract(5, 3) = ${subtract(5, 3)}`);
console.log(`  multiply(3, 4) = ${multiply(3, 4)}`);

// ==================== 函数类型 ====================
console.log("\n2. 函数类型别名");

type MathOperation = (a: number, b: number) => number;

const divide: MathOperation = (a, b) => a / b;
console.log(`  divide(10, 2) = ${divide(10, 2)}`);

// ==================== 可选参数和默认参数 ====================
console.log("\n3. 可选参数和默认参数");

function greet(name: string, greeting?: string): string {
  return `${greeting ?? "Hello"}, ${name}!`;
}

console.log(`  ${greet("Tom")}`);
console.log(`  ${greet("Jerry", "Hi")}`);

function greetWithDefault(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

console.log(`  ${greetWithDefault("Spike")}`);
console.log(`  ${greetWithDefault("Tyke", "Welcome")}`);

// ==================== 剩余参数 ====================
console.log("\n4. 剩余参数");

function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

console.log(`  sum(1, 2, 3) = ${sum(1, 2, 3)}`);
console.log(`  sum(1, 2, 3, 4, 5) = ${sum(1, 2, 3, 4, 5)}`);

// ==================== 解构参数 ====================
console.log("\n5. 解构参数");

interface RequestOptions {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  timeout?: number;
}

function request({ url, method = "GET", timeout = 5000 }: RequestOptions): string {
  return `${method} ${url} (timeout: ${timeout}ms)`;
}

console.log(`  ${request({ url: "/api/users" })}`);
console.log(`  ${request({ url: "/api/posts", method: "POST", timeout: 3000 })}`);

// ==================== 函数重载 ====================
console.log("\n6. 函数重载");

function format(value: string): string;
function format(value: number): string;
function format(value: Date): string;
function format(value: string | number | Date): string {
  if (typeof value === "string") {
    return `String: ${value}`;
  }
  if (typeof value === "number") {
    return `Number: ${value.toFixed(2)}`;
  }
  return `Date: ${value.toISOString()}`;
}

console.log(`  ${format("hello")}`);
console.log(`  ${format(3.14159)}`);
console.log(`  ${format(new Date())}`);

// ==================== 返回类型 ====================
console.log("\n7. 返回类型");

// void
function log(message: string): void {
  console.log(`  [LOG] ${message}`);
}
log("这是一条日志");

// 联合返回类型
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: "Tom" },
  { id: 2, name: "Jerry" }
];

function findUser(id: number): User | undefined {
  return users.find(u => u.id === id);
}

console.log(`  查找用户 1:`, findUser(1)?.name);
console.log(`  查找用户 99:`, findUser(99) ?? "未找到");

// ==================== 泛型函数 ====================
console.log("\n8. 泛型函数");

function identity<T>(arg: T): T {
  return arg;
}

console.log(`  identity<string>("hello"): ${identity("hello")}`);
console.log(`  identity(123): ${identity(123)}`);

function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

const keyValue = pair("name", "Tom");
console.log(`  pair("name", "Tom"): [${keyValue[0]}, ${keyValue[1]}]`);

// 泛型约束
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "Tom", age: 30 };
console.log(`  getProperty(person, "name"): ${getProperty(person, "name")}`);

// ==================== 高阶函数 ====================
console.log("\n9. 高阶函数");

// 函数作为参数
function execute(fn: () => string): string {
  return fn();
}

console.log(`  execute(() => "Hello"): ${execute(() => "Hello")}`);

// 函数作为返回值
function createMultiplier(factor: number): (x: number) => number {
  return (x) => x * factor;
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(`  double(5) = ${double(5)}`);
console.log(`  triple(5) = ${triple(5)}`);

// 函数组合
function compose<A, B, C>(f: (b: B) => C, g: (a: A) => B): (a: A) => C {
  return (a) => f(g(a));
}

const addOne = (x: number) => x + 1;
const doubleNum = (x: number) => x * 2;
const addOneThenDouble = compose(doubleNum, addOne);

console.log(`  (x + 1) * 2 with x=3: ${addOneThenDouble(3)}`);

// ==================== this 绑定 ====================
console.log("\n10. this 绑定");

class Counter {
  count = 0;

  // 普通方法
  increment() {
    this.count++;
    return this.count;
  }

  // 箭头函数方法
  decrement = () => {
    this.count--;
    return this.count;
  };
}

const counter = new Counter();
console.log(`  初始: ${counter.count}`);
console.log(`  increment: ${counter.increment()}`);
console.log(`  decrement: ${counter.decrement()}`);

// 解构后的调用
const { decrement } = counter;
console.log(`  解构后 decrement: ${decrement()}`);

console.log("\n=== 函数示例运行完成 ===");