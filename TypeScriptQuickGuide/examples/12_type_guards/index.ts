// 类型守卫与窄化示例代码

// ==================== typeof 类型守卫 ====================
function processTypeof(value: string | number | boolean): string {
  if (typeof value === "string") {
    return `字符串: ${value.toUpperCase()}`;
  } else if (typeof value === "number") {
    return `数字: ${value.toFixed(2)}`;
  } else {
    return `布尔值: ${value ? "是" : "否"}`;
  }
}

console.log("=== typeof 类型守卫 ===");
console.log(processTypeof("hello"));
console.log(processTypeof(123.456));
console.log(processTypeof(true));

// ==================== instanceof 类型守卫 ====================
class Dog {
  bark() { return "汪汪!"; }
}

class Cat {
  meow() { return "喵喵~"; }
}

function makeSound(animal: Dog | Cat): string {
  if (animal instanceof Dog) {
    return `狗: ${animal.bark()}`;
  } else {
    return `猫: ${animal.meow()}`;
  }
}

console.log("\n=== instanceof 类型守卫 ===");
console.log(makeSound(new Dog()));
console.log(makeSound(new Cat()));

// ==================== in 操作符守卫 ====================
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

function move(animal: Bird | Fish): string {
  if ("fly" in animal) {
    animal.fly();
    return "正在飞翔";
  } else {
    animal.swim();
    return "正在游泳";
  }
}

console.log("\n=== in 操作符守卫 ===");
const bird: Bird = { fly: () => console.log("飞翔中..."), layEggs: () => {} };
const fish: Fish = { swim: () => console.log("游泳中..."), layEggs: () => {} };
console.log(move(bird));
console.log(move(fish));

// ==================== 自定义类型谓词 ====================
interface Admin {
  role: "admin";
  permissions: string[];
}

interface Member {
  role: "member";
  email: string;
}

type User = Admin | Member;

function isAdmin(user: User): user is Admin {
  return user.role === "admin";
}

function showUserInfo(user: User): string {
  if (isAdmin(user)) {
    return `管理员，权限: ${user.permissions.join(", ")}`;
  } else {
    return `成员，邮箱: ${user.email}`;
  }
}

console.log("\n=== 自定义类型谓词 ===");
const admin: Admin = { role: "admin", permissions: ["read", "write", "delete"] };
const member: Member = { role: "member", email: "user@example.com" };
console.log(showUserInfo(admin));
console.log(showUserInfo(member));

// ==================== 可辨识联合 ====================
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

type Shape = Circle | Square | Rectangle;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}

console.log("\n=== 可辨识联合 ===");
const circle: Circle = { kind: "circle", radius: 5 };
const square: Square = { kind: "square", sideLength: 4 };
const rectangle: Rectangle = { kind: "rectangle", width: 3, height: 5 };

console.log(`圆形面积: ${getArea(circle).toFixed(2)}`);
console.log(`正方形面积: ${getArea(square)}`);
console.log(`矩形面积: ${getArea(rectangle)}`);

// ==================== 类型断言 ====================
const value: unknown = "Hello TypeScript";

// 安全的类型断言
if (typeof value === "string") {
  console.log("\n=== 类型断言 ===");
  console.log(`值: ${value}`);
  console.log(`大写: ${value.toUpperCase()}`);
}

// ==================== 穷尽性检查 ====================
function assertNever(value: never): never {
  throw new Error(`未处理的类型: ${value}`);
}

function describeShape(shape: Shape): string {
  switch (shape.kind) {
    case "circle":
      return `圆形，半径 ${shape.radius}`;
    case "square":
      return `正方形，边长 ${shape.sideLength}`;
    case "rectangle":
      return `矩形，${shape.width} x ${shape.height}`;
    default:
      return assertNever(shape); // 如果有遗漏，编译时会报错
  }
}

console.log("\n=== 穷尽性检查 ===");
console.log(describeShape(circle));
console.log(describeShape(square));
console.log(describeShape(rectangle));

// ==================== 数组过滤类型守卫 ====================
const mixed: (string | number)[] = [1, "a", 2, "b", 3, "c"];

const strings = mixed.filter((item): item is string => typeof item === "string");
const numbers = mixed.filter((item): item is number => typeof item === "number");

console.log("\n=== 数组过滤类型守卫 ===");
console.log("原数组:", mixed);
console.log("字符串:", strings);
console.log("数字:", numbers);

// ==================== 可选链和空值合并 ====================
interface UserProfile {
  name: string;
  address?: {
    city?: string;
    country?: string;
  };
}

const profile1: UserProfile = { name: "Tom", address: { city: "Beijing" } };
const profile2: UserProfile = { name: "Jerry" };

function getCity(profile: UserProfile): string {
  return profile.address?.city ?? "未知城市";
}

console.log("\n=== 可选链和空值合并 ===");
console.log(`${profile1.name} 的城市: ${getCity(profile1)}`);
console.log(`${profile2.name} 的城市: ${getCity(profile2)}`);

console.log("\n=== 类型守卫示例运行完成 ===");