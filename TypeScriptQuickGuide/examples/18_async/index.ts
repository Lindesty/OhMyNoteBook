// 异步示例代码
// 运行方式: npx tsx src/11_async/index.ts

console.log("=== TypeScript 异步示例 ===\n");

// ==================== Promise 基础 ====================
console.log("1. Promise 基础");

const delay = (ms: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`延迟 ${ms}ms 完成`), ms);
  });
};

// 使用 then
delay(100)
  .then(result => console.log(`  then: ${result}`))
  .catch(error => console.error(`  error: ${error}`))
  .finally(() => console.log("  finally: Promise 结束"));

// ==================== async/await ====================
console.log("\n2. async/await");

async function fetchUser(id: number): Promise<{ id: number; name: string }> {
  // 模拟网络请求
  await delay(50);
  return { id, name: `User-${id}` };
}

async function fetchPosts(userId: number): Promise<string[]> {
  await delay(50);
  return [`Post-1 by User-${userId}`, `Post-2 by User-${userId}`];
}

async function demo() {
  console.log("  开始获取用户...");
  const user = await fetchUser(1);
  console.log(`  用户: ${user.name}`);

  const posts = await fetchPosts(user.id);
  console.log(`  文章: ${posts.join(", ")}`);
}

demo();

// ==================== Promise.all ====================
console.log("\n3. Promise.all（并行执行）");

async function parallelDemo() {
  console.log("  开始并行获取...");
  const start = Date.now();

  const [users, posts, comments] = await Promise.all([
    delay(100).then(() => ["User1", "User2"]),
    delay(100).then(() => ["Post1", "Post2"]),
    delay(100).then(() => ["Comment1", "Comment2"])
  ]);

  const elapsed = Date.now() - start;
  console.log(`  并行完成，耗时: ${elapsed}ms`);
  console.log(`  结果: users=${users.length}, posts=${posts.length}, comments=${comments.length}`);
}

parallelDemo();

// ==================== Promise.allSettled ====================
console.log("\n4. Promise.allSettled");

async function allSettledDemo() {
  const results = await Promise.allSettled([
    Promise.resolve("成功1"),
    Promise.reject(new Error("失败")),
    Promise.resolve("成功2")
  ]);

  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      console.log(`  [${i}] 成功: ${result.value}`);
    } else {
      console.log(`  [${i}] 失败: ${result.reason.message}`);
    }
  });
}

allSettledDemo();

// ==================== Promise.race ====================
console.log("\n5. Promise.race");

async function raceDemo() {
  console.log("  开始竞速...");

  const result = await Promise.race([
    delay(50).then(() => "快速服务器"),
    delay(100).then(() => "慢速服务器")
  ]);

  console.log(`  胜者: ${result}`);
}

raceDemo();

// ==================== 错误处理 ====================
console.log("\n6. 错误处理");

async function errorHandlingDemo() {
  async function riskyOperation(): Promise<string> {
    await delay(50);
    throw new Error("操作失败");
  }

  try {
    await riskyOperation();
  } catch (error) {
    if (error instanceof Error) {
      console.log(`  捕获错误: ${error.message}`);
    }
  }
}

errorHandlingDemo();

// ==================== 重试机制 ====================
console.log("\n7. 重试机制");

async function retryDemo() {
  let attempts = 0;

  async function unreliableOperation(): Promise<string> {
    attempts++;
    console.log(`  尝试 #${attempts}`);
    if (attempts < 3) {
      throw new Error("暂时失败");
    }
    return "成功！";
  }

  async function retry<T>(
    fn: () => Promise<T>,
    maxAttempts: number = 3
  ): Promise<T> {
    let lastError: Error | undefined;
    for (let i = 0; i < maxAttempts; i++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;
        if (i < maxAttempts - 1) {
          await delay(100);
        }
      }
    }
    throw lastError;
  }

  try {
    const result = await retry(unreliableOperation, 5);
    console.log(`  结果: ${result}`);
  } catch (error) {
    console.log(`  最终失败: ${(error as Error).message}`);
  }
}

retryDemo();

// ==================== 并发限制 ====================
console.log("\n8. 并发限制");

async function concurrencyLimitDemo() {
  const tasks = [1, 2, 3, 4, 5].map(i => async () => {
    await delay(50);
    console.log(`  任务 ${i} 完成`);
    return i * 2;
  });

  async function limitConcurrency<T>(
    tasks: (() => Promise<T>)[],
    limit: number
  ): Promise<T[]> {
    const results: T[] = [];
    const executing: Promise<void>[] = [];

    for (const [index, task] of tasks.entries()) {
      const p = task().then(result => {
        results[index] = result;
      });
      executing.push(p);

      if (executing.length >= limit) {
        await Promise.race(executing);
      }
    }

    await Promise.all(executing);
    return results;
  }

  console.log("  开始执行（并发限制: 2）");
  const results = await limitConcurrency(tasks, 2);
  console.log(`  所有结果: ${results}`);
}

concurrencyLimitDemo();

// ==================== 事件循环演示 ====================
console.log("\n9. 事件循环");

async function eventLoopDemo() {
  console.log("  1. 同步开始");

  setTimeout(() => console.log("  2. setTimeout（宏任务）"), 0);

  Promise.resolve().then(() => console.log("  3. Promise（微任务）"));

  console.log("  4. 同步结束");

  await delay(50);
  console.log("  5. await 之后");
}

eventLoopDemo();

// 等待所有异步操作完成
setTimeout(() => {
  console.log("\n=== 异步示例运行完成 ===");
}, 1000);