// 解构与展开示例代码

// ==================== 对象解构 ====================
console.log("=== 对象解构 ===");

const user = {
  id: 1,
  name: "Tom",
  age: 30,
  email: "tom@example.com",
  address: {
    city: "Beijing",
    country: "China"
  }
};

// 基本解构
const { id, name } = user;
console.log("基本解构:", { id, name });

// 重命名
const { name: userName, age: userAge } = user;
console.log("重命名:", { userName, userAge });

// 默认值
const { role = "user" } = user as typeof user & { role?: string };
console.log("默认值:", { role });

// 嵌套解构
const { address: { city } } = user;
console.log("嵌套解构:", { city });

// 剩余属性
const { email, address, ...rest } = user;
console.log("剩余属性:", rest);

// ==================== 数组解构 ====================
console.log("\n=== 数组解构 ===");

const colors = ["red", "green", "blue", "yellow"];

// 基本解构
const [first, second] = colors;
console.log("基本解构:", { first, second });

// 跳过元素
const [c1, , c3] = colors;
console.log("跳过元素:", { c1, c3 });

// 默认值
const [a, b, c, d, e = "purple"] = colors;
console.log("默认值:", { a, b, c, d, e });

// 剩余元素
const [head, ...tail] = colors;
console.log("剩余元素:", { head, tail });

// 交换变量
let x = 1, y = 2;
console.log("交换前:", { x, y });
[x, y] = [y, x];
console.log("交换后:", { x, y });

// ==================== 对象展开 ====================
console.log("\n=== 对象展开 ===");

const defaults = {
  host: "localhost",
  port: 3000,
  timeout: 5000
};

const customConfig = {
  ...defaults,
  port: 8080,
  debug: true
};

console.log("合并配置:", customConfig);

// 展开顺序
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const merged = { ...obj1, ...obj2 };
console.log("展开合并:", merged);

// ==================== 数组展开 ====================
console.log("\n=== 数组展开 ===");

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const combined = [...arr1, ...arr2];
console.log("合并数组:", combined);

// 在开头添加
const newArr = [0, ...arr1];
console.log("开头添加:", newArr);

// 在中间插入
const inserted = [...arr1.slice(0, 1), 10, ...arr1.slice(1)];
console.log("中间插入:", inserted);

// ==================== 函数参数解构 ====================
console.log("\n=== 函数参数解构 ===");

interface RequestOptions {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  timeout?: number;
}

function request({ url, method = "GET", headers = {}, timeout = 5000 }: RequestOptions) {
  console.log("请求配置:", { url, method, headers, timeout });
}

request({ url: "/api/users" });
request({ url: "/api/posts", method: "POST", timeout: 3000 });

// ==================== 剩余参数 ====================
console.log("\n=== 剩余参数 ===");

function sum(...numbers: number[]): number {
  return numbers.reduce((acc, num) => acc + num, 0);
}

console.log("求和(1,2,3):", sum(1, 2, 3));
console.log("求和(1,2,3,4,5):", sum(1, 2, 3, 4, 5));

function greet(greeting: string, ...names: string[]): string {
  return `${greeting}, ${names.join(" 和 ")}!`;
}

console.log(greet("你好", "Tom"));
console.log(greet("你好", "Tom", "Jerry"));

// ==================== 浅拷贝问题 ====================
console.log("\n=== 浅拷贝问题 ===");

const original = {
  name: "original",
  nested: { value: 1 }
};

const shallowCopy = { ...original };
shallowCopy.name = "modified";
shallowCopy.nested.value = 100;

console.log("原始对象:", original);
console.log("浅拷贝:", shallowCopy);
console.log("注意: nested.value 同时被修改了!");

// ==================== 不可变更新 ====================
console.log("\n=== 不可变更新 ===");

interface Task {
  id: number;
  title: string;
  done: boolean;
}

const tasks: Task[] = [
  { id: 1, title: "Task 1", done: false },
  { id: 2, title: "Task 2", done: true },
  { id: 3, title: "Task 3", done: false }
];

// 添加任务
const added = [...tasks, { id: 4, title: "Task 4", done: false }];
console.log("添加任务:", added.length);

// 删除任务
const removed = tasks.filter(t => t.id !== 2);
console.log("删除任务后:", removed.length);

// 更新任务
const updated = tasks.map(t =>
  t.id === 1 ? { ...t, done: true } : t
);
console.log("更新任务:", updated.find(t => t.id === 1));

// ==================== 排除敏感信息 ====================
console.log("\n=== 排除敏感信息 ===");

interface FullUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

const fullUser: FullUser = {
  id: 1,
  name: "Tom",
  email: "tom@example.com",
  password: "secret123"
};

const { password, ...safeUser } = fullUser;
console.log("安全用户信息:", safeUser);

console.log("\n=== 解构与展开示例运行完成 ===");