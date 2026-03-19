// 流程控制示例代码
// 运行方式: npx tsx src/05_control_flow/index.ts

console.log("=== TypeScript 流程控制示例 ===\n");

// ==================== if-else ====================
console.log("1. if-else 语句");

const score = 85;
let grade: string;

if (score >= 90) {
  grade = "优秀";
} else if (score >= 80) {
  grade = "良好";
} else if (score >= 60) {
  grade = "及格";
} else {
  grade = "不及格";
}

console.log(`  分数 ${score} 的等级: ${grade}`);

// ==================== switch ====================
console.log("\n2. switch 语句");

const day = "Monday";

switch (day) {
  case "Monday":
    console.log("  星期一 - 新的一周开始");
    break;
  case "Friday":
    console.log("  星期五 - 周末快到了");
    break;
  case "Saturday":
  case "Sunday":
    console.log("  周末 - 休息时间");
    break;
  default:
    console.log("  工作日");
}

// 使用对象模拟 switch 表达式
const status = "pending";
const statusLabel = {
  pending: "待处理",
  approved: "已通过",
  rejected: "已拒绝"
}[status] ?? "未知状态";
console.log(`  状态标签: ${statusLabel}`);

// ==================== for 循环 ====================
console.log("\n3. for 循环");

// 传统 for 循环
let sum = 0;
for (let i = 1; i <= 5; i++) {
  sum += i;
}
console.log(`  1+2+3+4+5 = ${sum}`);

// for...of 遍历数组
const colors = ["红", "绿", "蓝"];
console.log("  颜色:");
for (const color of colors) {
  console.log(`    - ${color}`);
}

// for...in 遍历对象
const person = { name: "Tom", age: 30, city: "Beijing" };
console.log("  对象属性:");
for (const key in person) {
  console.log(`    ${key}: ${person[key as keyof typeof person]}`);
}

// ==================== while 循环 ====================
console.log("\n4. while 循环");

let count = 0;
console.log("  倒计时:");
while (count < 3) {
  console.log(`    ${3 - count}...`);
  count++;
}
console.log("    发射!");

// ==================== 循环控制 ====================
console.log("\n5. 循环控制 (break/continue)");

// break 示例
console.log("  break 示例:");
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    console.log("    在 5 处停止");
    break;
  }
  console.log(`    i = ${i}`);
}

// continue 示例
console.log("  continue 示例 (跳过偶数):");
for (let i = 0; i < 5; i++) {
  if (i % 2 === 0) continue;
  console.log(`    i = ${i}`);
}

// ==================== 数组方法替代循环 ====================
console.log("\n6. 数组方法替代循环");

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// forEach
console.log("  forEach:");
numbers.slice(0, 3).forEach((n, i) => {
  console.log(`    [${i}] = ${n}`);
});

// map
console.log("  map (平方):");
const squares = numbers.slice(0, 5).map(n => n * n);
console.log(`    ${squares}`);

// filter
console.log("  filter (偶数):");
const evens = numbers.filter(n => n % 2 === 0);
console.log(`    ${evens}`);

// find
console.log("  find (大于5的第一个数):");
const found = numbers.find(n => n > 5);
console.log(`    ${found}`);

// some 和 every
console.log("  some (有大于5的数):", numbers.some(n => n > 5));
console.log("  every (都是正数):", numbers.every(n => n > 0));

// reduce
console.log("  reduce (求和):");
const total = numbers.reduce((acc, n) => acc + n, 0);
console.log(`    1+2+...+10 = ${total}`);

// ==================== 链式调用 ====================
console.log("\n7. 链式调用");

interface User {
  name: string;
  age: number;
  active: boolean;
}

const users: User[] = [
  { name: "Tom", age: 25, active: true },
  { name: "Jerry", age: 17, active: true },
  { name: "Spike", age: 30, active: false },
  { name: "Tyke", age: 22, active: true }
];

// 类似 Java Stream API
const activeAdultNames = users
  .filter(u => u.active && u.age >= 18)
  .map(u => u.name)
  .sort();

console.log("  活跃的成年用户:", activeAdultNames);

// ==================== 嵌套循环和标签 ====================
console.log("\n8. 标签语句");

let foundInMatrix = false;
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

search:
for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    if (matrix[i][j] === 5) {
      console.log(`  找到 5 在位置: (${i}, ${j})`);
      foundInMatrix = true;
      break search;
    }
  }
}

if (!foundInMatrix) {
  console.log("  未找到");
}

console.log("\n=== 流程控制示例运行完成 ===");