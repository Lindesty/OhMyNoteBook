// JSON 处理示例代码

// ==================== 基本 JSON 操作 ====================
console.log("=== 基本 JSON 操作 ===");

const user = {
  id: 1,
  name: "Tom",
  email: "tom@example.com",
  active: true
};

// 序列化
const jsonString = JSON.stringify(user);
console.log("JSON 字符串:", jsonString);

// 格式化输出
const prettyJson = JSON.stringify(user, null, 2);
console.log("\n格式化输出:");
console.log(prettyJson);

// 选择性序列化
const partial = JSON.stringify(user, ["id", "name"]);
console.log("\n选择性序列化:", partial);

// 解析
const parsed = JSON.parse(jsonString);
console.log("\n解析结果:", parsed);

// ==================== 类型安全解析 ====================
console.log("\n=== 类型安全解析 ===");

interface User {
  id: number;
  name: string;
  email: string;
}

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

function safeParseUser(json: string): User | null {
  try {
    const data = JSON.parse(json);
    if (isUser(data)) {
      return data;
    }
    console.error("数据格式不正确");
    return null;
  } catch (error) {
    console.error("JSON 解析失败:", error);
    return null;
  }
}

const validJson = '{"id":1,"name":"Tom","email":"tom@example.com"}';
const invalidJson = '{"id":"abc"}';

console.log("有效 JSON:", safeParseUser(validJson));
console.log("无效 JSON:", safeParseUser(invalidJson));

// ==================== 处理特殊类型 ====================
console.log("\n=== 处理特殊类型 ===");

const complexData = {
  date: new Date(),
  regex: /pattern/g,
  map: new Map([["key", "value"]]),
  set: new Set([1, 2, 3]),
  bigint: 123n
};

// 默认序列化（丢失信息）
console.log("默认序列化:", JSON.stringify(complexData, null, 2));

// 自定义序列化
const customStringify = (obj: any): string => {
  return JSON.stringify(obj, (key, value) => {
    if (value instanceof Date) {
      return { __type: "Date", value: value.toISOString() };
    }
    if (value instanceof RegExp) {
      return { __type: "RegExp", source: value.source, flags: value.flags };
    }
    if (value instanceof Map) {
      return { __type: "Map", value: Array.from(value.entries()) };
    }
    if (value instanceof Set) {
      return { __type: "Set", value: Array.from(value) };
    }
    if (typeof value === "bigint") {
      return { __type: "BigInt", value: value.toString() };
    }
    return value;
  });
};

const customJson = customStringify(complexData);
console.log("\n自定义序列化:", customJson);

// 自定义反序列化
const customParse = (json: string): any => {
  return JSON.parse(json, (key, value) => {
    if (value && typeof value === "object") {
      if (value.__type === "Date") return new Date(value.value);
      if (value.__type === "RegExp") return new RegExp(value.source, value.flags);
      if (value.__type === "Map") return new Map(value.value);
      if (value.__type === "Set") return new Set(value.value);
      if (value.__type === "BigInt") return BigInt(value.value);
    }
    return value;
  });
};

const restored = customParse(customJson);
console.log("\n恢复的 Map:", restored.map);
console.log("恢复的 Set:", restored.set);

// ==================== 序列化敏感数据 ====================
console.log("\n=== 序列化敏感数据 ===");

const sensitiveData = {
  name: "Tom",
  password: "secret123",
  token: "abc123xyz",
  email: "tom@example.com"
};

const safeJson = JSON.stringify(sensitiveData, (key, value) => {
  if (key === "password" || key === "token") {
    return "[REDACTED]";
  }
  return value;
});

console.log("安全序列化:", safeJson);

// ==================== 类实例序列化 ====================
console.log("\n=== 类实例序列化 ===");

class Product {
  constructor(
    public id: number,
    public name: string,
    private price: number
  ) {}

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      price: `$${this.price.toFixed(2)}`
    };
  }

  static fromJSON(json: string): Product {
    const data = JSON.parse(json);
    const price = parseFloat(data.price.replace("$", ""));
    return new Product(data.id, data.name, price);
  }
}

const product = new Product(1, "Laptop", 999.99);
const productJson = JSON.stringify(product);
console.log("产品 JSON:", productJson);

const restoredProduct = Product.fromJSON(productJson);
console.log("恢复的产品:", restoredProduct);

// ==================== 循环引用处理 ====================
console.log("\n=== 循环引用处理 ===");

const circular: any = { name: "parent" };
circular.self = circular;
circular.children = [{ name: "child", parent: circular }];

function safeStringify(obj: any): string {
  const seen = new WeakSet();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return "[Circular]";
      }
      seen.add(value);
    }
    return value;
  });
}

console.log("循环引用:", safeStringify(circular));

// ==================== 错误处理 ====================
console.log("\n=== 错误处理 ===");

function safeParse<T>(
  json: string,
  validator?: (data: unknown) => data is T
): { success: true; data: T } | { success: false; error: Error } {
  try {
    const data = JSON.parse(json);

    if (validator && !validator(data)) {
      return { success: false, error: new Error("验证失败") };
    }

    return { success: true, data: data as T };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error };
    }
    return { success: false, error: new Error("未知错误") };
  }
}

const parseResult = safeParse<User>('{"id":1,"name":"Tom","email":"tom@example.com"}', isUser);

if (parseResult.success) {
  console.log("解析成功:", parseResult.data);
} else {
  console.error("解析失败:", parseResult.error.message);
}

// ==================== 深拷贝 ====================
console.log("\n=== 深拷贝 ===");

const original = {
  name: "Tom",
  address: { city: "Beijing", country: "China" },
  hobbies: ["reading", "coding"]
};

// JSON 深拷贝（有局限性）
const deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.address.city = "Shanghai";
console.log("原始城市:", original.address.city);
console.log("拷贝城市:", deepCopy.address.city);

// structuredClone（现代浏览器/Node.js 17+）
const structuredCopy = structuredClone(original);
structuredCopy.address.country = "USA";
console.log("原始国家:", original.address.country);
console.log("拷贝国家:", structuredCopy.address.country);

// ==================== JSON Schema 验证模拟 ====================
console.log("\n=== 简单 Schema 验证 ===");

function validateSchema(data: unknown, schema: Record<string, string>): boolean {
  if (typeof data !== "object" || data === null) return false;

  const obj = data as Record<string, unknown>;
  for (const [key, type] of Object.entries(schema)) {
    if (!(key in obj)) return false;
    if (typeof obj[key] !== type) return false;
  }
  return true;
}

const personSchema = { name: "string", age: "number" };
const validPerson = { name: "Tom", age: 30, city: "Beijing" };
const invalidPerson = { name: "Tom", age: "30" };

console.log("验证通过:", validateSchema(validPerson, personSchema));
console.log("验证失败:", validateSchema(invalidPerson, personSchema));

console.log("\n=== JSON 处理示例运行完成 ===");