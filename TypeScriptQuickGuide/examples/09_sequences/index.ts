// 序列示例代码
// 运行方式: npx tsx src/08_sequences/index.ts

console.log("=== TypeScript 序列示例 ===\n");

// ==================== 数组 ====================
console.log("1. 数组操作");

// 创建数组
const numbers: number[] = [1, 2, 3, 4, 5];
console.log(`  原始数组: ${numbers}`);

// 添加元素
const added = [...numbers, 6];
console.log(`  添加元素: ${added}`);

// 删除元素
const removed = numbers.filter(n => n !== 3);
console.log(`  删除元素 3: ${removed}`);

// 查找
console.log(`  indexOf(2): ${numbers.indexOf(2)}`);
console.log(`  includes(3): ${numbers.includes(3)}`);
console.log(`  find(n > 2): ${numbers.find(n => n > 2)}`);

// ==================== 数组方法 ====================
console.log("\n2. 数组方法");

const nums = [1, 2, 3, 4, 5];

// map
const doubled = nums.map(n => n * 2);
console.log(`  map (x2): ${doubled}`);

// filter
const evens = nums.filter(n => n % 2 === 0);
console.log(`  filter (偶数): ${evens}`);

// reduce
const sum = nums.reduce((acc, n) => acc + n, 0);
console.log(`  reduce (求和): ${sum}`);

// some / every
console.log(`  some (>3): ${nums.some(n => n > 3)}`);
console.log(`  every (>0): ${nums.every(n => n > 0)}`);

// sort
const unsorted = [3, 1, 4, 1, 5, 9, 2, 6];
const sorted = [...unsorted].sort((a, b) => a - b);
console.log(`  sort: ${sorted}`);

// flat
const nested = [[1, 2], [3, 4], [5]];
const flat = nested.flat();
console.log(`  flat: ${flat}`);

// ==================== 元组 ====================
console.log("\n3. 元组");

const point: [number, number] = [10, 20];
console.log(`  点坐标: (${point[0]}, ${point[1]})`);

const labeledTuple: [name: string, age: number, active?: boolean] = ["Tom", 30, true];
console.log(`  带标签元组: ${JSON.stringify(labeledTuple)}`);

// 解构
const [x, y] = point;
console.log(`  解构: x=${x}, y=${y}`);

// ==================== Map ====================
console.log("\n4. Map");

const map = new Map<string, number>();
map.set("one", 1);
map.set("two", 2);
map.set("three", 3);

console.log(`  size: ${map.size}`);
console.log(`  get("two"): ${map.get("two")}`);
console.log(`  has("one"): ${map.has("one")}`);

// 遍历
console.log("  遍历:");
map.forEach((value, key) => {
  console.log(`    ${key}: ${value}`);
});

// 从对象创建
const objMap = new Map(Object.entries({ a: 1, b: 2 }));
console.log(`  从对象创建: ${JSON.stringify([...objMap])}`);

// ==================== Set ====================
console.log("\n5. Set");

const set = new Set<number>();
set.add(1);
set.add(2);
set.add(2); // 重复值被忽略
set.add(3);

console.log(`  Set 内容: ${JSON.stringify([...set])}`);
console.log(`  has(2): ${set.has(2)}`);

// 数组去重
const duplicates = [1, 1, 2, 2, 3, 3, 4];
const unique = [...new Set(duplicates)];
console.log(`  去重: ${duplicates} -> ${unique}`);

// 集合操作
const setA = new Set([1, 2, 3]);
const setB = new Set([2, 3, 4]);

const union = new Set([...setA, ...setB]);
const intersection = new Set([...setA].filter(x => setB.has(x)));
const difference = new Set([...setA].filter(x => !setB.has(x)));

console.log(`  并集: ${JSON.stringify([...union])}`);
console.log(`  交集: ${JSON.stringify([...intersection])}`);
console.log(`  差集: ${JSON.stringify([...difference])}`);

// ==================== 迭代器 ====================
console.log("\n6. 迭代器");

// for...of
console.log("  for...of:");
for (const n of [1, 2, 3]) {
  console.log(`    ${n}`);
}

// 生成器
function* range(start: number, end: number): Generator<number> {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

console.log("  生成器 range(1, 5):");
for (const n of range(1, 5)) {
  console.log(`    ${n}`);
}

// 展开生成器
const fromGenerator = [...range(1, 3)];
console.log(`  展开生成器: ${fromGenerator}`);

// ==================== 类型化数组 ====================
console.log("\n7. 类型化数组");

const int8 = new Int8Array(4);
int8[0] = 127;
int8[1] = -128;
console.log(`  Int8Array: ${JSON.stringify([...int8])}`);

const uint8 = new Uint8Array([255, 128, 64, 32]);
console.log(`  Uint8Array: ${JSON.stringify([...uint8])}`);

const float64 = new Float64Array([1.1, 2.2, 3.3]);
console.log(`  Float64Array: ${JSON.stringify([...float64])}`);

// ==================== 链式调用 ====================
console.log("\n8. 链式调用（类似 Stream/LINQ）");

interface Product {
  name: string;
  price: number;
  category: string;
}

const products: Product[] = [
  { name: "Laptop", price: 1000, category: "Electronics" },
  { name: "Phone", price: 500, category: "Electronics" },
  { name: "Book", price: 20, category: "Books" },
  { name: "Tablet", price: 300, category: "Electronics" },
  { name: "Pen", price: 2, category: "Stationery" }
];

const result = products
  .filter(p => p.category === "Electronics")
  .map(p => ({ ...p, price: p.price * 0.9 })) // 10% 折扣
  .sort((a, b) => a.price - b.price)
  .map(p => p.name);

console.log(`  电子产品（折扣后按价格排序）: ${result}`);

console.log("\n=== 序列示例运行完成 ===");