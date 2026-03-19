// 泛型示例代码

// ==================== 基本泛型函数 ====================
function identity<T>(arg: T): T {
  return arg;
}

const num = identity(123);
const str = identity("hello");
console.log("泛型函数示例:", { num, str });

// ==================== 多类型参数 ====================
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

const keyValue = pair("name", "Tom");
console.log("多类型参数:", keyValue);

// ==================== 泛型接口 ====================
interface Container<T> {
  value: T;
  getValue(): T;
  setValue(value: T): void;
}

class Box<T> implements Container<T> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}

const numberBox = new Box(123);
console.log("泛型类示例:", numberBox.getValue());

// ==================== 泛型约束 ====================
interface Lengthwise {
  length: number;
}

function getLength<T extends Lengthwise>(arg: T): number {
  return arg.length;
}

console.log("泛型约束示例:");
console.log("  字符串长度:", getLength("hello"));
console.log("  数组长度:", getLength([1, 2, 3]));

// ==================== 使用类型参数约束 ====================
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = {
  name: "Tom",
  age: 30,
  email: "tom@example.com"
};

console.log("键约束示例:", {
  name: getProperty(user, "name"),
  age: getProperty(user, "age")
});

// ==================== 泛型默认值 ====================
interface ApiResponse<T = unknown> {
  data: T;
  status: number;
}

const response1: ApiResponse = { data: "hello", status: 200 };
const response2: ApiResponse<number> = { data: 123, status: 200 };
console.log("泛型默认值示例:", { response1, response2 });

// ==================== 条件类型 ====================
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false

// ==================== infer 关键字 ====================
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function greet(): string {
  return "Hello";
}

type GreetReturn = GetReturnType<typeof greet>; // string

// ==================== 实用泛型工具 ====================
function createState<T>(initialValue: T) {
  let value = initialValue;
  return {
    get: () => value,
    set: (newValue: T) => { value = newValue; }
  };
}

const counterState = createState(0);
console.log("状态管理示例:");
console.log("  初始值:", counterState.get());
counterState.set(10);
console.log("  设置后:", counterState.get());

console.log("\n=== 泛型示例运行完成 ===");