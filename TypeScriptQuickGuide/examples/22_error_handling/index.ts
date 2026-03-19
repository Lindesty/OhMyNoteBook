// 异常处理示例代码

// ==================== 基本 try-catch-finally ====================
console.log("=== 基本 try-catch-finally ===");

function divide(a: number, b: number): number {
  try {
    if (b === 0) {
      throw new Error("除数不能为零");
    }
    return a / b;
  } catch (error) {
    if (error instanceof Error) {
      console.error("错误:", error.message);
    }
    return NaN;
  } finally {
    console.log("计算完成");
  }
}

console.log("10 / 2 =", divide(10, 2));
console.log("10 / 0 =", divide(10, 0));

// ==================== 自定义错误类型 ====================
console.log("\n=== 自定义错误类型 ===");

class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = "AppError";
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

class ValidationError extends Error {
  constructor(
    message: string,
    public errors: Record<string, string[]>
  ) {
    super(message);
    this.name = "ValidationError";
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

class DatabaseError extends Error {
  constructor(message: string, public query: string) {
    super(message);
    this.name = "DatabaseError";
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}

// 使用自定义错误
function validateUser(data: unknown): { name: string; email: string } {
  if (typeof data !== "object" || data === null) {
    throw new ValidationError("无效数据", { data: ["数据必须是一个对象"] });
  }

  const obj = data as Record<string, unknown>;
  const errors: Record<string, string[]> = {};

  if (typeof obj.name !== "string") {
    errors.name = ["名称是必需的"];
  }
  if (typeof obj.email !== "string") {
    errors.email = ["邮箱是必需的"];
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError("验证失败", errors);
  }

  return { name: obj.name as string, email: obj.email as string };
}

// 测试验证
try {
  validateUser({ name: "Tom" });
} catch (error) {
  if (error instanceof ValidationError) {
    console.error("验证错误:", error.errors);
  }
}

try {
  validateUser({ name: "Tom", email: "tom@example.com" });
  console.log("验证通过");
} catch (error) {
  console.error("未知错误");
}

// ==================== 错误类型判断 ====================
console.log("\n=== 错误类型判断 ===");

function handleDifferentErrors(error: unknown): string {
  if (error instanceof ValidationError) {
    return `验证错误: ${JSON.stringify(error.errors)}`;
  }
  if (error instanceof DatabaseError) {
    return `数据库错误 (查询: ${error.query}): ${error.message}`;
  }
  if (error instanceof AppError) {
    return `应用错误 [${error.code}]: ${error.message}`;
  }
  if (error instanceof Error) {
    return `错误: ${error.message}`;
  }
  return `未知错误: ${error}`;
}

// 测试不同错误类型
const errors = [
  new AppError("服务器错误", "SERVER_ERROR", 500),
  new ValidationError("验证失败", { email: ["格式错误"] }),
  new DatabaseError("查询超时", "SELECT * FROM users"),
  new Error("普通错误"),
  "字符串错误"
];

errors.forEach(err => {
  console.log(handleDifferentErrors(err));
});

// ==================== 异步异常处理 ====================
console.log("\n=== 异步异常处理 ===");

async function fetchUserData(id: number): Promise<{ id: number; name: string }> {
  if (id < 0) {
    throw new AppError("无效ID", "INVALID_ID", 400);
  }

  // 模拟 API 调用
  await new Promise(resolve => setTimeout(resolve, 100));

  return { id, name: `User ${id}` };
}

// 正确处理异步异常
async function safeFetchUser(id: number) {
  try {
    const user = await fetchUserData(id);
    console.log("获取用户成功:", user);
  } catch (error) {
    console.error("获取用户失败:", handleDifferentErrors(error));
  } finally {
    console.log("请求完成");
  }
}

// 测试
safeFetchUser(1);
safeFetchUser(-1);

// ==================== Result 模式 ====================
console.log("\n=== Result 模式 ===");

type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function Ok<T>(value: T): Result<T> {
  return { ok: true, value };
}

function Err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

function safeDivide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return Err("除数不能为零");
  }
  return Ok(a / b);
}

// 使用 Result 模式
const results = [
  safeDivide(10, 2),
  safeDivide(10, 0)
];

results.forEach(result => {
  if (result.ok) {
    console.log("计算结果:", result.value);
  } else {
    console.log("计算错误:", result.error);
  }
});

// ==================== 错误边界 ====================
console.log("\n=== 错误边界 ===");

function withErrorBoundary<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch (error) {
    console.error("捕获错误:", error);
    return fallback;
  }
}

const safeResult = withErrorBoundary(() => {
  throw new Error("运行时错误");
}, "默认值");

console.log("安全结果:", safeResult);

// ==================== 未捕获异常处理 ====================
console.log("\n=== 未捕获异常处理 ===");

process.on("uncaughtException", (error) => {
  console.error("未捕获的异常:", error.message);
});

process.on("unhandledRejection", (reason) => {
  console.error("未处理的 Promise 拒绝:", reason);
});

// ==================== 资源清理 ====================
console.log("\n=== 资源清理 ===");

class Resource {
  constructor(public name: string) {
    console.log(`资源 ${name} 已创建`);
  }

  close() {
    console.log(`资源 ${name} 已关闭`);
  }
}

function useResource() {
  let resource: Resource | null = null;

  try {
    resource = new Resource("数据库连接");
    // 模拟操作
    console.log("使用资源中...");
    // 模拟错误
    // throw new Error("操作失败");
  } catch (error) {
    console.error("操作错误:", error);
    throw error;
  } finally {
    if (resource) {
      resource.close();
    }
  }
}

useResource();

// ==================== 等待异步操作完成 ====================
setTimeout(() => {
  console.log("\n=== 异常处理示例运行完成 ===");
}, 500);