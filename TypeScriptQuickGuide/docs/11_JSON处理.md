# JSON 处理

JSON（JavaScript Object Notation）是前后端数据交互的标准格式。TypeScript 提供了内置的 JSON 处理方法，但需要注意类型安全问题。

## 基本操作

### JSON.stringify

将 JavaScript 对象转换为 JSON 字符串：

```ts
const user = {
  id: 1,
  name: "Tom",
  email: "tom@example.com",
  active: true
};

const json = JSON.stringify(user);
console.log(json);
// '{"id":1,"name":"Tom","email":"tom@example.com","active":true}'

// 格式化输出
const pretty = JSON.stringify(user, null, 2);
console.log(pretty);
// {
//   "id": 1,
//   "name": "Tom",
//   "email": "tom@example.com",
//   "active": true
// }

// 选择性序列化
const partial = JSON.stringify(user, ["id", "name"]);
console.log(partial);
// '{"id":1,"name":"Tom"}'
```

### JSON.parse

将 JSON 字符串解析为 JavaScript 对象：

```ts
const json = '{"id":1,"name":"Tom","email":"tom@example.com"}';

const user = JSON.parse(json);
console.log(user.name); // "Tom"

// 注意：返回值是 any 类型
user.nonExistent; // 编译通过，但运行时是 undefined
```

### 解析不安全

```ts
// ❌ 不安全的解析
const data = JSON.parse(jsonString) as User;

// ✅ 先验证再使用
const data = JSON.parse(jsonString);
if (isValidUser(data)) {
  // data: User
}
```

## 类型安全解析

### 使用类型守卫

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    "email" in value &&
    typeof (value as User).id === "number" &&
    typeof (value as User).name === "string" &&
    typeof (value as User).email === "string"
  );
}

function parseUser(json: string): User | null {
  try {
    const data = JSON.parse(json);
    if (isUser(data)) {
      return data;
    }
    return null;
  } catch (error) {
    return null;
  }
}

// 使用
const user = parseUser('{"id":1,"name":"Tom","email":"tom@example.com"}');
if (user) {
  console.log(user.name);
}
```

### 使用工具库验证

```ts
// 使用 zod 库
import { z } from "zod";

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(["admin", "user"]).default("user"),
  createdAt: z.string().datetime().optional()
});

type User = z.infer<typeof UserSchema>;

function parseUser(json: string): User | null {
  try {
    const data = JSON.parse(json);
    return UserSchema.parse(data);
  } catch {
    return null;
  }
}

// 安全解析
const result = UserSchema.safeParse(jsonData);
if (result.success) {
  console.log(result.data); // User
} else {
  console.error(result.error); // ZodError
}
```

## 序列化选项

### replacer 函数

```ts
const data = {
  name: "Tom",
  password: "secret",
  token: "abc123",
  createdAt: new Date()
};

// 排除敏感字段
const safe = JSON.stringify(data, (key, value) => {
  if (key === "password" || key === "token") {
    return undefined; // 排除
  }
  if (value instanceof Date) {
    return value.toISOString(); // 自定义序列化
  }
  return value;
});
// '{"name":"Tom","createdAt":"2024-01-15T10:30:00.000Z"}'
```

### 处理特殊类型

```ts
const data = {
  date: new Date(),
  regex: /pattern/g,
  map: new Map([["key", "value"]]),
  set: new Set([1, 2, 3]),
  bigint: 123n,
  undefined: undefined,
  func: () => "hello"
};

// 默认序列化会丢失很多信息
console.log(JSON.stringify(data));
// '{"date":"2024-01-15T10:30:00.000Z","regex":{},"map":{},"set":{},"bigint":"123"}'

// 自定义序列化
const custom = JSON.stringify(data, (key, value) => {
  if (value instanceof Date) return { __type: "Date", value: value.toISOString() };
  if (value instanceof RegExp) return { __type: "RegExp", source: value.source, flags: value.flags };
  if (value instanceof Map) return { __type: "Map", value: Array.from(value.entries()) };
  if (value instanceof Set) return { __type: "Set", value: Array.from(value) };
  if (typeof value === "bigint") return { __type: "BigInt", value: value.toString() };
  return value;
});

// 自定义反序列化
function reviver(key: string, value: any) {
  if (value && typeof value === "object") {
    if (value.__type === "Date") return new Date(value.value);
    if (value.__type === "RegExp") return new RegExp(value.source, value.flags);
    if (value.__type === "Map") return new Map(value.value);
    if (value.__type === "Set") return new Set(value.value);
    if (value.__type === "BigInt") return BigInt(value.value);
  }
  return value;
}

const parsed = JSON.parse(custom, reviver);
```

## 处理复杂对象

### 类实例序列化

```ts
class User {
  constructor(
    public id: number,
    public name: string,
    private password: string
  ) {}

  toJSON() {
    return {
      id: this.id,
      name: this.name
      // 不包含 password
    };
  }

  static fromJSON(json: string): User {
    const data = JSON.parse(json);
    return new User(data.id, data.name, "");
  }
}

const user = new User(1, "Tom", "secret");
const json = JSON.stringify(user);
// '{"id":1,"name":"Tom"}'

const restored = User.fromJSON(json);
```

### 循环引用处理

```ts
const obj: any = { name: "Tom" };
obj.self = obj; // 循环引用

// ❌ 会抛出错误
// JSON.stringify(obj); // TypeError: Converting circular structure to JSON

// ✅ 使用自定义 replacer 处理
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

console.log(safeStringify(obj));
// '{"name":"Tom","self":"[Circular]"}'
```

## 错误处理

### 安全解析函数

```ts
function safeParse<T>(
  json: string,
  validator?: (data: unknown) => data is T
): { success: true; data: T } | { success: false; error: Error } {
  try {
    const data = JSON.parse(json);

    if (validator && !validator(data)) {
      return { success: false, error: new Error("Validation failed") };
    }

    return { success: true, data: data as T };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error };
    }
    return { success: false, error: new Error("Unknown error") };
  }
}

// 使用
const result = safeParse<User>(jsonString, isUser);
if (result.success) {
  console.log(result.data.name);
} else {
  console.error("Parse error:", result.error.message);
}
```

### 处理大数据

```ts
// 流式解析大数据（使用流式 JSON 解析库）
import { parse } from "stream-json";

async function processLargeJsonFile(filePath: string) {
  const pipeline = fs.createReadStream(filePath).pipe(parse());

  for await (const chunk of pipeline) {
    // 逐块处理，避免内存溢出
    console.log(chunk);
  }
}
```

## 第三方库推荐

### zod

运行时类型验证和 JSON 解析：

```bash
npm install zod
```

```ts
import { z } from "zod";

const UserSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().int().min(0).max(150).optional(),
  role: z.enum(["admin", "user", "guest"]).default("user")
});

type User = z.infer<typeof UserSchema>;

// 解析并验证
const user = UserSchema.parse(JSON.parse(jsonString));

// 安全解析
const result = UserSchema.safeParse(JSON.parse(jsonString));
```

### io-ts

函数式编程风格的编解码器：

```bash
npm install io-ts fp-ts
```

```ts
import * as t from "io-ts";
import { isRight } from "fp-ts/Either";

const UserCodec = t.type({
  id: t.number,
  name: t.string,
  email: t.string
});

type User = t.TypeOf<typeof UserCodec>;

const result = UserCodec.decode(JSON.parse(jsonString));
if (isRight(result)) {
  console.log(result.right); // User
}
```

### typebox

JSON Schema 类型构建器：

```bash
npm install @sinclair/typebox
```

```ts
import { Type, TypeCheck } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

const UserSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  email: Type.String({ format: "email" })
});

type User = Static<typeof UserSchema>;

// 验证
if (Value.Check(UserSchema, data)) {
  // data: User
}
```

## 与 Java/C# 的对比

| 特性 | Java | C# | TypeScript |
|------|------|-----|------------|
| 内置支持 | 需要库（Gson/Jackson） | System.Text.Json | 原生 JSON.parse/stringify |
| 类型安全 | 反序列化到类 | 反序列化到类 | 需要 zod 等库 |
| 注解控制 | @JsonProperty 等 | JsonPropertyName | toJSON/fromJSON 方法 |
| 流式处理 | Jackson Streaming | System.Text.Json | 需要第三方库 |

**Java (Jackson)**：
```java
ObjectMapper mapper = new ObjectMapper();
User user = mapper.readValue(json, User.class);
String json = mapper.writeValueAsString(user);
```

**C#**：
```csharp
using System.Text.Json;

User user = JsonSerializer.Deserialize<User>(json);
string json = JsonSerializer.Serialize(user);
```

**TypeScript**：
```ts
// 不安全的方式
const user = JSON.parse(json) as User;

// 安全的方式（使用 zod）
const user = UserSchema.parse(JSON.parse(json));
```

## 最佳实践

### 1. 始终验证外部 JSON 数据

```ts
// ❌ 不安全
const config = JSON.parse(fs.readFileSync("config.json", "utf-8")) as Config;

// ✅ 安全
const raw = JSON.parse(fs.readFileSync("config.json", "utf-8"));
const config = ConfigSchema.parse(raw);
```

### 2. 处理敏感数据

```ts
class User {
  toJSON() {
    const { password, token, ...safe } = this;
    return safe;
  }
}
```

### 3. 处理解析错误

```ts
// ✅ 始终 try-catch
try {
  const data = JSON.parse(jsonString);
  // ...
} catch (error) {
  if (error instanceof SyntaxError) {
    console.error("Invalid JSON:", error.message);
  }
}
```

### 4. 使用 Result 模式

```ts
function parseJson<T>(json: string, schema: z.Schema<T>): Result<T> {
  try {
    const result = schema.safeParse(JSON.parse(json));
    if (result.success) {
      return { ok: true, value: result.data };
    }
    return { ok: false, error: result.error };
  } catch (error) {
    return { ok: false, error };
  }
}
```