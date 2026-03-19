// 空值处理示例代码
// 运行方式: npx tsx src/12_null_handling/index.ts

console.log("=== TypeScript 空值处理示例 ===\n");

// ==================== null 和 undefined ====================
console.log("1. null 和 undefined 的区别");

let empty: null = null;
let notDefined: undefined = undefined;

console.log(`  null: ${empty}, typeof: ${typeof empty}`);
console.log(`  undefined: ${notDefined}, typeof: ${typeof notDefined}`);

// 未初始化的变量
let declared: string;
console.log(`  未初始化变量: ${declared}`); // undefined

// ==================== 可选属性 ====================
console.log("\n2. 可选属性");

interface User {
  name: string;
  email?: string;
  age?: number;
}

const user1: User = { name: "Tom" };
const user2: User = { name: "Jerry", email: "jerry@example.com" };

console.log(`  user1.email: ${user1.email ?? "未设置"}`);
console.log(`  user2.email: ${user2.email}`);

// ==================== 可选链 ====================
console.log("\n3. 可选链 (?.)");

interface Address {
  street?: string;
  city?: string;
}

interface Person {
  name: string;
  address?: Address;
}

const person1: Person = {
  name: "Tom",
  address: { city: "Beijing" }
};

const person2: Person = {
  name: "Jerry"
};

console.log(`  person1 城市: ${person1.address?.city}`);
console.log(`  person2 城市: ${person2.address?.city ?? "未知"}`);

// 方法可选链
const obj: { method?: () => string } = {};
console.log(`  可选方法调用: ${obj.method?.() ?? "方法不存在"}`);

// 数组可选链
const arr: string[] | undefined = undefined;
console.log(`  数组第一个元素: ${arr?.[0] ?? "数组不存在"}`);

// ==================== 空值合并 ====================
console.log("\n4. 空值合并 (??)");

const values = {
  nullValue: null,
  undefinedValue: undefined,
  emptyString: "",
  zero: 0,
  falseValue: false
};

console.log(`  null ?? "default": ${values.nullValue ?? "default"}`);
console.log(`  undefined ?? "default": ${values.undefinedValue ?? "default"}`);
console.log(`  "" ?? "default": "${values.emptyString ?? "default"}"`);
console.log(`  0 ?? 100: ${values.zero ?? 100}`);
console.log(`  false ?? true: ${values.falseValue ?? true}`);

// 与 || 的区别
console.log("\n  与 || 的区别:");
console.log(`  0 || 100: ${values.zero || 100}`);    // 100
console.log(`  0 ?? 100: ${values.zero ?? 100}`);    // 0
console.log(`  "" || "default": "${values.emptyString || "default"}"`); // "default"
console.log(`  "" ?? "default": "${values.emptyString ?? "default"}"`); // ""

// ==================== 非空断言 ====================
console.log("\n5. 非空断言 (!)");

function processName(name: string | null): string {
  // 假设我们知道 name 不为 null
  return name!.toUpperCase();
}

console.log(`  非空断言: ${processName("tom")}`);

// ==================== 类型守卫 ====================
console.log("\n6. 类型守卫");

function greet(name: string | null | undefined): string {
  // 方式1：显式检查
  if (name === null || name === undefined) {
    return "Hello, Guest";
  }
  return `Hello, ${name.toUpperCase()}`;
}

function greet2(name: string | null | undefined): string {
  // 方式2：使用 == null（同时检查 null 和 undefined）
  if (name == null) {
    return "Hello, Guest";
  }
  return `Hello, ${name.toUpperCase()}`;
}

function greet3(name: string | null | undefined): string {
  // 方式3：真值检查
  if (name) {
    return `Hello, ${name.toUpperCase()}`;
  }
  return "Hello, Guest";
}

console.log(`  greet("Tom"): ${greet("Tom")}`);
console.log(`  greet(null): ${greet(null)}`);
console.log(`  greet2(undefined): ${greet2(undefined)}`);
console.log(`  greet3(""): ${greet3("")}`);

// ==================== NonNullable 工具类型 ====================
console.log("\n7. NonNullable 工具类型");

type NullableString = string | null | undefined;
type NonNullableString = NonNullable<NullableString>;

function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

const mixedArray: (string | null | undefined)[] = ["a", null, "b", undefined, "c"];
const filtered = mixedArray.filter(isDefined);
console.log(`  原数组: ${JSON.stringify(mixedArray)}`);
console.log(`  过滤后: ${JSON.stringify(filtered)}`);

// ==================== 实际应用 ====================
console.log("\n8. 实际应用场景");

interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

interface Product {
  id: number;
  name: string;
  price?: number;
  description?: string;
}

function handleResponse(response: ApiResponse<Product>): string {
  // 使用可选链和空值组合处理复杂场景
  const productName = response.data?.name ?? "未知产品";
  const price = response.data?.price?.toFixed(2) ?? "价格待定";
  const description = response.data?.description?.slice(0, 50) ?? "暂无描述";

  if (response.error) {
    return `错误: ${response.error}`;
  }

  return `${productName} - ¥${price}\n  描述: ${description}`;
}

const successResponse: ApiResponse<Product> = {
  status: 200,
  data: {
    id: 1,
    name: "Laptop",
    price: 5999.99,
    description: "高性能笔记本电脑，配备最新处理器和显卡"
  }
};

const noPriceResponse: ApiResponse<Product> = {
  status: 200,
  data: {
    id: 2,
    name: "Book"
  }
};

const errorResponse: ApiResponse<Product> = {
  status: 404,
  error: "产品不存在"
};

console.log("  成功响应:");
console.log(`    ${handleResponse(successResponse)}`);
console.log("  无价格响应:");
console.log(`    ${handleResponse(noPriceResponse)}`);
console.log("  错误响应:");
console.log(`    ${handleResponse(errorResponse)}`);

// ==================== 安全的对象属性访问 ====================
console.log("\n9. 安全的对象属性访问");

function safeGet<T>(obj: T, path: string): unknown {
  return path.split('.').reduce((current: unknown, key: string) => {
    if (current && typeof current === 'object') {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

const deepObject = {
  user: {
    profile: {
      name: "Tom",
      age: 30
    }
  }
};

console.log(`  安全获取 user.profile.name: ${safeGet(deepObject, 'user.profile.name')}`);
console.log(`  安全获取 user.profile.email: ${safeGet(deepObject, 'user.profile.email') ?? "不存在"}`);
console.log(`  安全获取 user.settings.theme: ${safeGet(deepObject, 'user.settings.theme') ?? "不存在"}`);

console.log("\n=== 空值处理示例运行完成 ===");