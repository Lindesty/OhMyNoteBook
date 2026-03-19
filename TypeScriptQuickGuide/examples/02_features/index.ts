// TypeScript 特性演示
// 运行方式: npx tsx src/02_features/index.ts

console.log("=== TypeScript 特性演示 ===\n");

// ==================== 1. 静态类型检查 ====================
console.log("1. 静态类型检查");

const name: string = "Tom";
const age: number = 30;
const active: boolean = true;

console.log(`  姓名: ${name}, 年龄: ${age}, 活跃: ${active}`);

// 编译时错误示例（取消注释会报错）
// const wrong: string = 123; // 类型错误

// ==================== 2. 类型推断 ====================
console.log("\n2. 类型推断");

let inferredString = "Hello";    // 推断为 string
let inferredNumber = 42;         // 推断为 number
let inferredArray = [1, 2, 3];   // 推断为 number[]

console.log(`  推断类型: ${typeof inferredString}, ${typeof inferredNumber}`);
console.log(`  数组类型: ${inferredArray.map(n => n * 2)}`);

// ==================== 3. 接口定义 ====================
console.log("\n3. 接口定义");

interface User {
  id: number;
  name: string;
  email?: string;  // 可选属性
  readonly createdAt: Date;  // 只读属性
}

const user: User = {
  id: 1,
  name: "Tom",
  createdAt: new Date()
};

console.log(`  用户: ${user.name}, 邮箱: ${user.email ?? "未设置"}`);

// ==================== 4. 类和继承 ====================
console.log("\n4. 类和继承");

class Animal {
  constructor(public name: string) {}

  speak(): string {
    return `${this.name} 发出声音`;
  }
}

class Dog extends Animal {
  breed: string;

  constructor(name: string, breed: string) {
    super(name);
    this.breed = breed;
  }

  speak(): string {
    return `${this.name} 汪汪叫`;
  }
}

const dog = new Dog("Buddy", "Labrador");
console.log(`  ${dog.speak()}, 品种: ${dog.breed}`);

// ==================== 5. 访问修饰符 ====================
console.log("\n5. 访问修饰符");

class BankAccount {
  private balance: number = 0;
  protected owner: string;
  public accountNumber: string;

  constructor(owner: string, accountNumber: string) {
    this.owner = owner;
    this.accountNumber = accountNumber;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount("Tom", "ACC-001");
account.deposit(1000);
console.log(`  账户: ${account.accountNumber}, 余额: ${account.getBalance()}`);

// ==================== 6. 泛型 ====================
console.log("\n6. 泛型");

function identity<T>(arg: T): T {
  return arg;
}

interface Container<T> {
  value: T;
}

const stringContainer: Container<string> = { value: "Hello" };
const numberContainer: Container<number> = { value: 42 };

console.log(`  泛型函数: ${identity("World")}`);
console.log(`  泛型容器: ${stringContainer.value}, ${numberContainer.value}`);

// ==================== 7. 联合类型 ====================
console.log("\n7. 联合类型");

type Status = "pending" | "approved" | "rejected";
type StringOrNumber = string | number;

function process(value: StringOrNumber): string {
  if (typeof value === "string") {
    return `字符串: ${value.toUpperCase()}`;
  }
  return `数字: ${value.toFixed(2)}`;
}

console.log(`  ${process("hello")}`);
console.log(`  ${process(3.14159)}`);

// ==================== 8. 函数重载 ====================
console.log("\n8. 函数重载");

function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
  if (typeof value === "string") {
    return `字符串: ${value}`;
  }
  return `数字: ${value}`;
}

console.log(`  ${format("test")}`);
console.log(`  ${format(123)}`);

// ==================== 9. 解构赋值 ====================
console.log("\n9. 解构赋值");

const person = { name: "Tom", age: 30, city: "Beijing" };
const { name: personName, age: personAge } = person;

const colors = ["red", "green", "blue"];
const [first, second] = colors;

console.log(`  对象解构: ${personName}, ${personAge}`);
console.log(`  数组解构: ${first}, ${second}`);

// ==================== 10. 展开运算符 ====================
console.log("\n10. 展开运算符");

const defaults = { theme: "light", lang: "en" };
const settings = { ...defaults, theme: "dark" };

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const merged = [...arr1, ...arr2];

console.log(`  对象合并:`, settings);
console.log(`  数组合并:`, merged);

// ==================== 11. 可选链和空值合并 ====================
console.log("\n11. 可选链和空值合并");

interface Address {
  street?: string;
  city?: string;
}

interface Customer {
  name: string;
  address?: Address;
}

const customer: Customer = { name: "Tom" };
const city = customer.address?.city ?? "未知城市";

console.log(`  客户: ${customer.name}, 城市: ${city}`);

// ==================== 12. 异步编程 ====================
console.log("\n12. 异步编程");

async function fetchUser(id: number): Promise<string> {
  // 模拟异步操作
  await new Promise(resolve => setTimeout(resolve, 50));
  return `User-${id}`;
}

async function demoAsync() {
  const result = await fetchUser(1);
  console.log(`  异步结果: ${result}`);
}

demoAsync().then(() => {
  console.log("\n=== TypeScript 特性演示完成 ===");
});