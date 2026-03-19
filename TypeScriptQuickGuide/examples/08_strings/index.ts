// 字符串操作示例代码
// 运行方式: npx tsx src/07_strings/index.ts

console.log("=== TypeScript 字符串操作示例 ===\n");

// ==================== 字符串基础 ====================
console.log("1. 字符串基础");

const single = '单引号字符串';
const double = "双引号字符串";
const template = `模板字符串`;

console.log(`  单引号: ${single}`);
console.log(`  双引号: ${double}`);
console.log(`  模板: ${template}`);

// 字符串属性
const str = "Hello";
console.log(`  "${str}" 长度: ${str.length}`);
console.log(`  第一个字符: ${str[0]}`);

// ==================== 查找 ====================
console.log("\n2. 查找方法");

const text = "Hello, World! Hello, TypeScript!";

console.log(`  indexOf("Hello"): ${text.indexOf("Hello")}`);
console.log(`  lastIndexOf("Hello"): ${text.lastIndexOf("Hello")}`);
console.log(`  includes("World"): ${text.includes("World")}`);
console.log(`  startsWith("Hello"): ${text.startsWith("Hello")}`);
console.log(`  endsWith("!"): ${text.endsWith("!")}`);

// ==================== 提取 ====================
console.log("\n3. 提取方法");

const sentence = "Hello, World!";

console.log(`  slice(0, 5): "${sentence.slice(0, 5)}"`);
console.log(`  slice(7): "${sentence.slice(7)}"`);
console.log(`  substring(0, 5): "${sentence.substring(0, 5)}"`);
console.log(`  charAt(0): "${sentence.charAt(0)}"`);

// 分割
const csv = "apple,banana,orange";
console.log(`  split(","): ${JSON.stringify(csv.split(","))}`);

// ==================== 修改 ====================
console.log("\n4. 修改方法");

const original = "  Hello, World!  ";

console.log(`  原始: "${original}"`);
console.log(`  trim(): "${original.trim()}"`);
console.log(`  trimStart(): "${original.trimStart()}"`);
console.log(`  trimEnd(): "${original.trimEnd()}"`);

const greeting = "Hello";
console.log(`  toUpperCase(): "${greeting.toUpperCase()}"`);
console.log(`  toLowerCase(): "${greeting.toLowerCase()}"`);

// 替换
const message = "Hello World, World is beautiful";
console.log(`  replace("World", "JS"): "${message.replace("World", "JS")}"`);
console.log(`  replaceAll("World", "JS"): "${message.replaceAll("World", "JS")}"`);

// 重复
console.log(`  "ab".repeat(3): "${"ab".repeat(3)}"`);

// 填充
console.log(`  "5".padStart(3, "0"): "${"5".padStart(3, "0")}"`);
console.log(`  "5".padEnd(3, "0"): "${"5".padEnd(3, "0")}"`);

// ==================== 模板字符串 ====================
console.log("\n5. 模板字符串");

const name = "Tom";
const age = 30;

// 变量插值
const intro = `我是 ${name}，今年 ${age} 岁`;
console.log(`  变量插值: ${intro}`);

// 表达式
const calc = `1 + 2 = ${1 + 2}`;
console.log(`  表达式: ${calc}`);

// 条件表达式
const status = `状态: ${age >= 18 ? "成年" : "未成年"}`;
console.log(`  条件: ${status}`);

// 多行字符串
const multiline = `
第一行
第二行
第三行
`;
console.log(`  多行:${multiline}`);

// ==================== 标签模板 ====================
console.log("\n6. 标签模板");

function highlight(strings: TemplateStringsArray, ...values: (string | number)[]): string {
  return strings.reduce((result, str, i) => {
    const value = values[i] !== undefined ? `[${values[i]}]` : "";
    return result + str + value;
  }, "");
}

const user = "Tom";
const score = 95;
const tagged = highlight`用户 ${user} 得分 ${score}`;
console.log(`  标签模板结果: ${tagged}`);

// ==================== 类型转换 ====================
console.log("\n7. 类型转换");

// 转字符串
console.log(`  String(123): "${String(123)}"`);
console.log(`  (3.14).toString(): "${(3.14).toString()}"`);
console.log(`  \`\${123}\`: "${123}"`);

// 从字符串转换
console.log(`  parseInt("123"): ${parseInt("123")}`);
console.log(`  parseFloat("3.14"): ${parseFloat("3.14")}`);
console.log(`  Number("123"): ${Number("123")}`);
console.log(`  +"456": ${+"456"}`);

// 进制转换
console.log(`  parseInt("ff", 16): ${parseInt("ff", 16)}`);
console.log(`  (255).toString(16): "${(255).toString(16)}"`);

// ==================== Unicode ====================
console.log("\n8. Unicode 支持");

const emoji = "😀";
console.log(`  emoji: ${emoji}`);
console.log(`  codePointAt: ${emoji.codePointAt(0)}`);
console.log(`  fromCodePoint: ${String.fromCodePoint(128512)}`);

// Unicode 转义
console.log(`  \\u0041: ${"\u0041"}`);
console.log(`  \\u{1F600}: ${"\u{1F600}"}`);

// ==================== 正则表达式 ====================
console.log("\n9. 正则表达式");

const email = "test@example.com";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log(`  邮箱验证 "${email}": ${emailRegex.test(email)}`);

const text2 = "Hello123World456";
const numbers = text2.match(/\d+/g);
console.log(`  提取数字: ${JSON.stringify(numbers)}`);

const replaced = text2.replace(/\d+/g, "[数字]");
console.log(`  替换数字: ${replaced}`);

console.log("\n=== 字符串操作示例运行完成 ===");