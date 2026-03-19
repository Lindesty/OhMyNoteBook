// 装饰器示例代码
// 运行方式: npx tsx src/15_decorators/index.ts

// ==================== 类装饰器 ====================
function logged<T extends { new(...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    constructor(...args: any[]) {
      console.log(`[类装饰器] 创建实例，参数: ${JSON.stringify(args)}`);
      super(...args);
      console.log(`[类装饰器] 实例创建完成`);
    }
  };
}

function ClassDecorator(options: { version: string }) {
  return function <T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      version = options.version;
    };
  };
}

// ==================== 方法装饰器（旧版语法） ====================
function log(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`[方法装饰器] 调用 ${propertyKey}，参数:`, args);
    const result = original.apply(this, args);
    console.log(`[方法装饰器] ${propertyKey} 返回:`, result);
    return result;
  };

  return descriptor;
}

// ==================== 属性装饰器（旧版语法） ====================
function readonly(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  descriptor.writable = false;
  return descriptor;
}

// ==================== 应用装饰器 ====================
@logged
@ClassDecorator({ version: "1.0.0" })
class Calculator {
  version!: string;

  @readonly
  name = "Calculator";

  @log
  add(a: number, b: number): number {
    return a + b;
  }

  @log
  multiply(a: number, b: number): number {
    return a * b;
  }
}

// 运行示例
console.log("=== 装饰器示例 ===\n");

const calc = new Calculator();
console.log("版本:", (calc as any).version);
console.log("\n计算 1 + 2:");
const sum = calc.add(1, 2);
console.log("结果:", sum);

console.log("\n计算 3 * 4:");
const product = calc.multiply(3, 4);
console.log("结果:", product);

// ==================== 缓存装饰器 ====================
function cache(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value;
  const cacheMap = new Map<string, any>();

  descriptor.value = function (...args: any[]) {
    const key = JSON.stringify(args);
    if (cacheMap.has(key)) {
      console.log(`[缓存装饰器] 命中缓存: ${key}`);
      return cacheMap.get(key);
    }

    console.log(`[缓存装饰器] 计算中: ${key}`);
    const result = original.apply(this, args);
    cacheMap.set(key, result);
    return result;
  };

  return descriptor;
}

class DataProcessor {
  @cache
  fibonacci(n: number): number {
    if (n <= 1) return n;
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }

  @cache
  heavyComputation(x: number): number {
    // 模拟耗时计算
    return x * x * x;
  }
}

console.log("\n=== 缓存装饰器示例 ===\n");
const processor = new DataProcessor();

console.log("第一次计算 fibonacci(10):");
console.log("结果:", processor.fibonacci(10));

console.log("\n第二次计算 fibonacci(10):");
console.log("结果:", processor.fibonacci(10));

console.log("\n计算 heavyComputation(5):");
console.log("结果:", processor.heavyComputation(5));

console.log("\n再次计算 heavyComputation(5):");
console.log("结果:", processor.heavyComputation(5));

console.log("\n=== 装饰器示例运行完成 ===");