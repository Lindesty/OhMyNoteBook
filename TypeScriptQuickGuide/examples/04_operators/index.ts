// 运算符示例代码
// 运行方式: npx tsx src/04_operators/index.ts

console.log("=== TypeScript 运算符示例 ===\n");

// ==================== 算术运算符 ====================
console.log("1. 算术运算符");

const a = 10, b = 3;
console.log(`  ${a} + ${b} = ${a + b}`);
console.log(`  ${a} - ${b} = ${a - b}`);
console.log(`  ${a} * ${b} = ${a * b}`);
console.log(`  ${a} / ${b} = ${a / b}`); // 浮点数结果
console.log(`  ${a} % ${b} = ${a % b}`);
console.log(`  ${a} ** ${b} = ${a ** b}`); // 幂运算

// 自增自减
let x = 5;
console.log(`  ++x = ${++x}, x = ${x}`);
console.log(`  x++ = ${x++}, x = ${x}`);

// ==================== 比较运算符 ====================
console.log("\n2. 比较运算符");

const num = 5, str = "5";
console.log(`  ${num} == "${str}": ${num == str}`);   // 宽松比较
console.log(`  ${num} === "${str}": ${num === str}`); // 严格比较
console.log(`  ${num} != "${str}": ${num != str}`);
console.log(`  ${num} !== "${str}": ${num !== str}`);
console.log(`  10 > 5: ${10 > 5}`);
console.log(`  5 >= 5: ${5 >= 5}`);

// ==================== 逻辑运算符 ====================
console.log("\n3. 逻辑运算符");

console.log(`  true && false: ${true && false}`);
console.log(`  true || false: ${true || false}`);
console.log(`  !true: ${!true}`);

// 短路求值
const name: string | null = null;
const displayName = name || "Unknown";
console.log(`  短路求值: ${displayName}`);

// ==================== 空值合并运算符 ====================
console.log("\n4. 空值合并运算符 (??)");

const nullValue = null;
const undefinedValue = undefined;
const emptyString = "";
const zero = 0;

console.log(`  null ?? "default": ${nullValue ?? "default"}`);
console.log(`  undefined ?? "default": ${undefinedValue ?? "default"}`);
console.log(`  "" ?? "default": "${emptyString ?? "default"}"`); // 空字符串不触发
console.log(`  0 ?? 100: ${zero ?? 100}`); // 零不触发

// 与 || 的区别
console.log(`  0 || 100: ${0 || 100}`);   // 0 是 falsy，返回 100
console.log(`  0 ?? 100: ${0 ?? 100}`);   // 0 不是 null/undefined，返回 0

// ==================== 可选链运算符 ====================
console.log("\n5. 可选链运算符 (?.)");

interface User {
  name: string;
  address?: {
    city: string;
    country: string;
  };
}

const user1: User = { name: "Tom", address: { city: "Beijing", country: "China" } };
const user2: User = { name: "Jerry" };

console.log(`  user1 城市: ${user1.address?.city}`);
console.log(`  user2 城市: ${user2.address?.city ?? "未知"}`);

// ==================== 位运算符 ====================
console.log("\n6. 位运算符");

const bitA = 5, bitB = 3; // 101, 011
console.log(`  5 & 3 = ${bitA & bitB}`);   // 001 = 1
console.log(`  5 | 3 = ${bitA | bitB}`);   // 111 = 7
console.log(`  5 ^ 3 = ${bitA ^ bitB}`);   // 110 = 6
console.log(`  ~5 = ${~bitA}`);            // -6
console.log(`  5 << 1 = ${bitA << 1}`);    // 1010 = 10
console.log(`  5 >> 1 = ${bitA >> 1}`);    // 10 = 2

// ==================== 赋值运算符 ====================
console.log("\n7. 赋值运算符");

let n = 10;
n += 5; console.log(`  += 5: ${n}`);
n -= 3; console.log(`  -= 3: ${n}`);
n *= 2; console.log(`  *= 2: ${n}`);
n /= 4; console.log(`  /= 4: ${n}`);

// 逻辑赋值
let value: string | null = null;
value ??= "default";
console.log(`  ??= "default": ${value}`);

// ==================== 三元运算符 ====================
console.log("\n8. 三元运算符");

const age = 20;
const status = age >= 18 ? "成年" : "未成年";
console.log(`  年龄 ${age}: ${status}`);

// 嵌套示例
const score = 85;
const grade = score >= 90 ? "A" :
              score >= 80 ? "B" :
              score >= 70 ? "C" : "D";
console.log(`  分数 ${score}: 等级 ${grade}`);

// ==================== 类型运算符 ====================
console.log("\n9. 类型运算符");

console.log(`  typeof "hello": ${typeof "hello"}`);
console.log(`  typeof 123: ${typeof 123}`);
console.log(`  typeof true: ${typeof true}`);
console.log(`  typeof null: ${typeof null}`); // 注意：返回 "object"
console.log(`  typeof undefined: ${typeof undefined}`);
console.log(`  typeof []: ${typeof []}`);
console.log(`  typeof {}: ${typeof {}}`);

// instanceof
const arr = [1, 2, 3];
const date = new Date();
console.log(`  [] instanceof Array: ${arr instanceof Array}`);
console.log(`  new Date() instanceof Date: ${date instanceof Date}`);

// in
const obj = { name: "Tom", age: 30 };
console.log(`  "name" in obj: ${"name" in obj}`);
console.log(`  "email" in obj: ${"email" in obj}`);

// ==================== 展开运算符 ====================
console.log("\n10. 展开运算符");

// 数组展开
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];
console.log(`  数组展开: ${arr2}`);

// 对象展开
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };
console.log(`  对象展开:`, obj2);

// 剩余参数
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}
console.log(`  剩余参数: sum(1,2,3,4,5) = ${sum(1, 2, 3, 4, 5)}`);

console.log("\n=== 运算符示例运行完成 ===");