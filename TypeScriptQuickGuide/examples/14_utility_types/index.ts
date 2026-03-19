// 工具类型示例代码

// ==================== Partial 和 Required ====================
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

console.log("=== Partial 和 Required ===");

// Partial - 所有属性可选
function updateUser(user: User, updates: Partial<User>): User {
  return { ...user, ...updates };
}

const originalUser: User = { id: 1, name: "Tom", email: "tom@example.com", age: 25 };
const updatedUser = updateUser(originalUser, { age: 26 });
console.log("更新用户:", updatedUser);

// Required - 所有属性必需
interface OptionalUser {
  id?: number;
  name?: string;
}

type RequiredUser = Required<OptionalUser>;
const requiredUser: RequiredUser = { id: 1, name: "Tom" };
console.log("必需属性:", requiredUser);

// ==================== Readonly ====================
console.log("\n=== Readonly ===");

interface Config {
  apiUrl: string;
  timeout: number;
}

const config: Readonly<Config> = {
  apiUrl: "https://api.example.com",
  timeout: 5000
};

console.log("只读配置:", config);
// config.timeout = 3000; // 编译错误

// ==================== Record ====================
console.log("\n=== Record ===");

type Status = "pending" | "approved" | "rejected";
type StatusLabels = Record<Status, string>;

const statusLabels: StatusLabels = {
  pending: "待审核",
  approved: "已通过",
  rejected: "已拒绝"
};

console.log("状态标签:", statusLabels);

// ==================== Pick 和 Omit ====================
console.log("\n=== Pick 和 Omit ===");

interface FullUser {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Pick - 选择部分属性
type PublicUser = Pick<FullUser, "id" | "name" | "email">;
const publicUser: PublicUser = { id: 1, name: "Tom", email: "tom@example.com" };
console.log("公开用户信息:", publicUser);

// Omit - 排除部分属性
type CreateUserData = Omit<FullUser, "id" | "createdAt">;
const newUserData: CreateUserData = {
  name: "Jerry",
  email: "jerry@example.com",
  password: "secret"
};
console.log("创建用户数据:", newUserData);

// ==================== Exclude 和 Extract ====================
console.log("\n=== Exclude 和 Extract ===");

type AllTypes = "a" | "b" | "c" | "d";
type Excluded = Exclude<AllTypes, "a" | "c">;
type Extracted = Extract<AllTypes, "a" | "c">;

console.log("Exclude 结果:", ["b", "d"]);
console.log("Extract 结果:", ["a", "c"]);

// ==================== NonNullable ====================
console.log("\n=== NonNullable ===");

type Nullable = string | number | null | undefined;
type NonNullableType = NonNullable<Nullable>;

function processNonNullable(value: NonNullableType) {
  console.log("非空值:", value);
}

processNonNullable("hello");
processNonNullable(123);

// ==================== ReturnType 和 Parameters ====================
console.log("\n=== ReturnType 和 Parameters ===");

function createUser(name: string, age: number, email: string) {
  return { name, age, email, createdAt: new Date() };
}

type UserReturn = ReturnType<typeof createUser>;
type UserParams = Parameters<typeof createUser>;

const params: UserParams = ["Tom", 25, "tom@example.com"];
const result = createUser(...params);
console.log("创建用户结果:", result);

// ==================== 工具类型组合使用 ====================
console.log("\n=== 工具类型组合使用 ===");

interface Entity {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// 创建时的数据（排除自动生成字段）
type CreateInput<T> = Omit<T, "id" | "createdAt" | "updatedAt">;
// 更新时的数据（所有字段可选）
type UpdateInput<T> = Partial<CreateInput<T>>;

const createData: CreateInput<Entity> = { name: "New Entity" };
const updateData: UpdateInput<Entity> = { name: "Updated Entity" };

console.log("创建数据:", createData);
console.log("更新数据:", updateData);

// ==================== 自定义工具类型 ====================
console.log("\n=== 自定义工具类型 ===");

// DeepPartial
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object
    ? DeepPartial<T[K]>
    : T[K];
};

interface NestedConfig {
  server: {
    host: string;
    port: number;
  };
  database: {
    url: string;
    credentials: {
      username: string;
      password: string;
    };
  };
}

const partialConfig: DeepPartial<NestedConfig> = {
  server: {
    host: "localhost"
    // port 可以省略
  }
};
console.log("深层部分配置:", partialConfig);

// PickByType
type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

interface MixedTypeObject {
  id: number;
  name: string;
  age: number;
  email: string;
  active: boolean;
}

type StringFields = PickByType<MixedTypeObject, string>;
type NumberFields = PickByType<MixedTypeObject, number>;

const stringsOnly: StringFields = { name: "Tom", email: "tom@example.com" };
const numbersOnly: NumberFields = { id: 1, age: 25 };

console.log("只含字符串字段:", stringsOnly);
console.log("只含数字字段:", numbersOnly);

console.log("\n=== 工具类型示例运行完成 ===");