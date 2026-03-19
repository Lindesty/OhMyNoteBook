// 类型系统示例代码
// 运行方式: npx tsx src/03_types/index.ts

console.log("=== TypeScript 类型系统示例 ===\n");

// ==================== 原始类型 ====================
console.log("1. 原始类型");

const name: string = "Tom";
const age: number = 30;
const active: boolean = true;
const empty: null = null;
const notDefined: undefined = undefined;

console.log(`  string: ${name}`);
console.log(`  number: ${age}`);
console.log(`  boolean: ${active}`);
console.log(`  null: ${empty}`);
console.log(`  undefined: ${notDefined}`);

// BigInt 和 Symbol
const big: bigint = 9007199254740991n;
const sym: symbol = Symbol("unique");
console.log(`  bigint: ${big}`);
console.log(`  symbol: ${sym.toString()}`);

// ==================== 对象类型 ====================
console.log("\n2. 对象类型");

// 接口
interface User {
  id: number;
  name: string;
  email?: string;           // 可选属性
  readonly createdAt: Date; // 只读属性
}

const user: User = {
  id: 1,
  name: "Tom",
  createdAt: new Date()
};

console.log(`  接口定义的用户: ${user.name}`);

// 类型别名
type Point = { x: number; y: number };
type ID = string | number;

const point: Point = { x: 10, y: 20 };
const userId: ID = "user-001";

console.log(`  类型别名 Point: (${point.x}, ${point.y})`);
console.log(`  类型别名 ID: ${userId}`);

// ==================== 数组类型 ====================
console.log("\n3. 数组类型");

const numbers: number[] = [1, 2, 3, 4, 5];
const names: Array<string> = ["Tom", "Jerry", "Spike"];

console.log(`  number[]: ${numbers}`);
console.log(`  Array<string>: ${names}`);

// ==================== 元组类型 ====================
console.log("\n4. 元组类型");

const coordinate: [number, number] = [10, 20];
const labeledPoint: [x: number, y: number, z?: number] = [5, 10];

console.log(`  坐标: (${coordinate[0]}, ${coordinate[1]})`);
console.log(`  带标签元组: (${labeledPoint[0]}, ${labeledPoint[1]})`);

// ==================== 联合类型 ====================
console.log("\n5. 联合类型");

type StringOrNumber = string | number;
type Status = "pending" | "approved" | "rejected";

function process(value: StringOrNumber): string {
  if (typeof value === "string") {
    return `字符串: ${value.toUpperCase()}`;
  }
  return `数字: ${value.toFixed(2)}`;
}

console.log(`  ${process("hello")}`);
console.log(`  ${process(3.14159)}`);

const status: Status = "approved";
console.log(`  状态: ${status}`);

// ==================== 交叉类型 ====================
console.log("\n6. 交叉类型");

interface NameInfo {
  name: string;
}

interface AgeInfo {
  age: number;
}

type Person = NameInfo & AgeInfo;

const person: Person = {
  name: "Tom",
  age: 30
};

console.log(`  交叉类型: ${person.name}, ${person.age}岁`);

// ==================== 字面量类型 ====================
console.log("\n7. 字面量类型");

type Direction = "up" | "down" | "left" | "right";
type Dice = 1 | 2 | 3 | 4 | 5 | 6;

function move(dir: Direction): string {
  return `向${dir === "up" ? "上" : dir === "down" ? "下" : dir === "left" ? "左" : "右"}移动`;
}

console.log(`  ${move("up")}`);
console.log(`  ${move("right")}`);

const dice: Dice = 6;
console.log(`  骰子点数: ${dice}`);

// ==================== any、unknown、never ====================
console.log("\n8. any、unknown、never");

// any（不推荐，关闭类型检查）
let anything: any = "hello";
console.log(`  any: ${anything}`);
anything = 123;

// unknown（类型安全的 any）
let unknownValue: unknown = "hello";

if (typeof unknownValue === "string") {
  console.log(`  unknown (类型守卫后): ${unknownValue.toUpperCase()}`);
}

// never（永不存在的类型）
function throwError(message: string): never {
  throw new Error(message);
}

// 穷尽性检查示例
type Shape = "circle" | "square";
function getArea(shape: Shape): string {
  switch (shape) {
    case "circle": return "圆形";
    case "square": return "正方形";
    default:
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}

console.log(`  never 穷尽性检查: ${getArea("circle")}`);

// ==================== 类型断言 ====================
console.log("\n9. 类型断言");

const value: unknown = "Hello TypeScript";
const str = value as string;

console.log(`  类型断言: ${str.toUpperCase()}`);

// const 断言
const config = {
  url: "https://api.example.com",
  timeout: 5000
} as const;

console.log(`  const 断言: ${config.url}`);

// ==================== 可空类型 ====================
console.log("\n10. 可空类型");

interface OptionalUser {
  name: string;
  email?: string;
}

function displayEmail(user: OptionalUser): string {
  return user.email ?? "未设置邮箱";
}

const userWithEmail: OptionalUser = { name: "Tom", email: "tom@example.com" };
const userWithoutEmail: OptionalUser = { name: "Jerry" };

console.log(`  ${userWithEmail.name} 的邮箱: ${displayEmail(userWithEmail)}`);
console.log(`  ${userWithoutEmail.name} 的邮箱: ${displayEmail(userWithoutEmail)}`);

// ==================== 类型兼容性 ====================
console.log("\n11. 类型兼容性");

interface Point2D { x: number; y: number; }
interface Point3D { x: number; y: number; z: number; }

const point3D: Point3D = { x: 1, y: 2, z: 3 };
const point2D: Point2D = point3D; // 结构兼容

console.log(`  Point3D 可以赋值给 Point2D: (${point2D.x}, ${point2D.y})`);

console.log("\n=== 类型系统示例运行完成 ===");