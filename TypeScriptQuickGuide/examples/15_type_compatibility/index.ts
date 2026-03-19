// 类型兼容性示例代码

// ==================== 结构化类型 ====================
console.log("=== 结构化类型 ===");

interface Person {
  name: string;
  age: number;
}

interface Employee {
  name: string;
  age: number;
  employeeId: string;
}

// 结构相同即可赋值
const employee: Employee = {
  name: "Tom",
  age: 30,
  employeeId: "E001"
};

// 属性更多的可以赋给属性更少的
const person: Person = employee;
console.log("Employee 赋给 Person:", person);

// 反过来不行
// const emp: Employee = person; // 缺少 employeeId

// ==================== 对象字面量多余属性检查 ====================
console.log("\n=== 对象字面量多余属性检查 ===");

interface User {
  name: string;
}

// 直接赋值会检查多余属性
// const user: User = { name: "Tom", age: 30 }; // 编译错误

// 通过中间变量绕过
const obj = { name: "Tom", age: 30 };
const user: User = obj;
console.log("绕过检查:", user);

// ==================== 函数参数兼容性 ====================
console.log("\n=== 函数参数兼容性 ===");

// 参数更少的函数可以赋给参数更多的函数类型
type Unary = (x: number) => number;
type Binary = (x: number, y: number) => number;

const add: Binary = (x, y) => x + y;
const double: Unary = x => x * 2;

// Unary 可以赋给 Binary（忽略多余参数）
const fn1: Binary = double;
console.log("fn1(2, 3):", fn1(2, 3)); // 结果是 4，第二个参数被忽略

// 实际应用：数组方法
const numbers = [1, 2, 3];
// map 期望 (value, index, array)，但我们只需要 value
const doubled = numbers.map(x => x * 2);
console.log("数组 map:", doubled);

// ==================== 协变示例 ====================
console.log("\n=== 协变示例 ===");

interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// 数组协变
const dogs: Dog[] = [
  { name: "Buddy", breed: "Labrador" },
  { name: "Max", breed: "German Shepherd" }
];

const animals: Animal[] = dogs;
console.log("协变 - Dog[] 赋给 Animal[]:", animals.map(a => a.name));

// 注意：这可能导致问题
// animals.push({ name: "Cat" }); // 编译通过，但破坏了 dogs 的类型安全

// ==================== 逆变示例 ====================
console.log("\n=== 逆变示例 ===");

type AnimalHandler = (animal: Animal) => void;
type DogHandler = (dog: Dog) => void;

const handleAnimal: AnimalHandler = (animal) => {
  console.log(`  处理动物: ${animal.name}`);
};

const handleDog: DogHandler = (dog) => {
  console.log(`  处理狗: ${dog.name}, 品种: ${dog.breed}`);
};

// 逆变：AnimalHandler 可以赋给 DogHandler
// 因为能处理 Animal 的函数，一定能处理 Dog
let handler: DogHandler = handleAnimal;
console.log("逆变 - 调用 handler:");
handler({ name: "Rex", breed: "Bulldog" });

// 反过来不安全
// handler = handleDog; // handleDog 需要 breed，但 Animal 可能没有

// ==================== 返回类型协变 ====================
console.log("\n=== 返回类型协变 ===");

type AnimalFactory = () => Animal;
type DogFactory = () => Dog;

const createDog: DogFactory = () => ({ name: "New Dog", breed: "Mixed" });
const createAnimal: AnimalFactory = () => ({ name: "New Animal" });

// 返回 Dog 的函数可以赋给返回 Animal 的函数类型
const factory: AnimalFactory = createDog;
console.log("返回类型协变:", factory());

// 反过来不行
// const dogFactory: DogFactory = createAnimal; // Animal 可能没有 breed

// ==================== 类兼容性 ====================
console.log("\n=== 类兼容性 ===");

class Point2D {
  x: number = 0;
  y: number = 0;
}

class Point3D {
  x: number = 0;
  y: number = 0;
  z: number = 0;
}

const point2D = new Point2D();
const point3D = new Point3D();

// Point3D 有 Point2D 的所有属性
const p2: Point2D = point3D;
console.log("类兼容 - Point3D 赋给 Point2D:", p2);

// 反过来不行
// const p3: Point3D = point2D; // 缺少 z

// ==================== 私有成员影响兼容性 ====================
console.log("\n=== 私有成员与兼容性 ===");

class Base {
  private secret: string = "base";
  public name: string = "";
}

class Derived extends Base {
  public name: string = "derived";
}

class Other {
  private secret: string = "other";
  public name: string = "";
}

const base: Base = new Derived(); // ✅ 继承关系
// const base2: Base = new Other(); // ❌ 私有成员来源不同

console.log("继承的实例可以赋给基类");

// ==================== 泛型兼容性 ====================
console.log("\n=== 泛型兼容性 ===");

interface Empty<T> {
  // 没有使用 T
}

let e1: Empty<string> = {};
let e2: Empty<number> = {};

e1 = e2; // ✅ 结构相同，类型参数不影响
console.log("空泛型接口兼容");

interface Container<T> {
  value: T;
}

let c1: Container<string> = { value: "hello" };
let c2: Container<number> = { value: 123 };

// c1 = c2; // ❌ 类型不同
console.log("使用类型参数的泛型不兼容");

// ==================== 枚举兼容性 ====================
console.log("\n=== 枚举兼容性 ===");

enum Status {
  Pending,
  Active,
  Completed
}

let s: Status = Status.Active;
let n: number = s; // ✅ 枚举可以赋给 number
console.log("枚举赋给 number:", n);

// let status: Status = 1; // ❌ number 不能直接赋给枚举
let status: Status = 1 as Status; // 需要类型断言
console.log("number 断言为枚举:", status);

// ==================== any 和 unknown ====================
console.log("\n=== any 和 unknown ===");

// any - 关闭类型检查
let anyValue: any = "hello";
anyValue = 123;
anyValue = { a: 1 };
let str: string = anyValue; // ✅ any 兼容任何类型
console.log("any 示例:", str);

// unknown - 类型安全的 any
let unknownValue: unknown = "hello";
// unknownValue.toUpperCase(); // ❌ 不能直接使用
// let s2: string = unknownValue; // ❌ 不能直接赋值

if (typeof unknownValue === "string") {
  console.log("unknown 类型守卫:", unknownValue.toUpperCase());
}

// ==================== never 类型 ====================
console.log("\n=== never 类型 ===");

function throwError(message: string): never {
  throw new Error(message);
}

// never 是所有类型的子类型
let neverResult: string = throwError("不应该执行到这里");
console.log("这行不会执行");

// ==================== 类型断言 ====================
console.log("\n=== 类型断言 ===");

interface Result {
  success: boolean;
  data?: string;
}

const result = JSON.parse('{"success":true,"data":"test"}') as Result;
console.log("类型断言结果:", result);

// 双重断言（危险，不推荐）
const value = "hello" as unknown as number;
console.log("双重断言（危险）:", value);

// ==================== 实践：API 响应类型 ====================
console.log("\n=== 实践：API 响应类型 ===");

interface ApiResponse<T> {
  status: number;
  data: T;
  message?: string;
}

interface UserData {
  id: number;
  name: string;
}

function isApiResponse<T>(
  value: unknown,
  isData: (v: unknown) => v is T
): value is ApiResponse<T> {
  const res = value as ApiResponse<T>;
  return (
    typeof value === "object" &&
    value !== null &&
    "status" in value &&
    typeof res.status === "number" &&
    "data" in value &&
    isData(res.data)
  );
}

function isUserData(value: unknown): value is UserData {
  const u = value as UserData;
  return (
    typeof value === "object" &&
    value !== null &&
    typeof u.id === "number" &&
    typeof u.name === "string"
  );
}

// 模拟 API 响应
const mockResponse = {
  status: 200,
  data: { id: 1, name: "Tom" },
  message: "Success"
};

if (isApiResponse(mockResponse, isUserData)) {
  console.log("API 响应用户:", mockResponse.data.name);
}

console.log("\n=== 类型兼容性示例运行完成 ===");