// 时间处理示例代码
// 运行方式: npx tsx src/13_datetime/index.ts

console.log("=== TypeScript 时间处理示例 ===\n");

// ==================== 创建日期 ====================
console.log("1. 创建日期");

const now = new Date();
console.log(`  当前时间: ${now.toString()}`);

const fromTimestamp = new Date(1672531200000);
console.log(`  时间戳创建: ${fromTimestamp.toLocaleString()}`);

const fromString = new Date("2024-01-01T10:30:00");
console.log(`  字符串创建: ${fromString.toLocaleString()}`);

const specified = new Date(2024, 0, 1, 10, 30, 0); // 月份从0开始
console.log(`  指定时间: ${specified.toLocaleString()}`);

// ==================== 获取日期信息 ====================
console.log("\n2. 获取日期信息");

const date = new Date("2024-03-15T14:30:45");

console.log(`  年: ${date.getFullYear()}`);
console.log(`  月: ${date.getMonth() + 1} (返回 ${date.getMonth()}, 需+1)`);
console.log(`  日: ${date.getDate()}`);
console.log(`  星期: ${["日", "一", "二", "三", "四", "五", "六"][date.getDay()]}`);
console.log(`  时: ${date.getHours()}`);
console.log(`  分: ${date.getMinutes()}`);
console.log(`  秒: ${date.getSeconds()}`);
console.log(`  时间戳: ${date.getTime()}`);

// ==================== 设置日期 ====================
console.log("\n3. 设置日期");

const modifyDate = new Date();
console.log(`  原始时间: ${modifyDate.toLocaleString()}`);

modifyDate.setFullYear(2025);
modifyDate.setMonth(11); // 12月
modifyDate.setDate(25);
modifyDate.setHours(12);

console.log(`  修改后: ${modifyDate.toLocaleString()}`);

// ==================== 格式化 ====================
console.log("\n4. 格式化");

const formatExample = new Date();

console.log(`  toString: ${formatExample.toString()}`);
console.log(`  toDateString: ${formatExample.toDateString()}`);
console.log(`  toTimeString: ${formatExample.toTimeString()}`);
console.log(`  toISOString: ${formatExample.toISOString()}`);
console.log(`  toLocaleDateString: ${formatExample.toLocaleDateString()}`);
console.log(`  toLocaleTimeString: ${formatExample.toLocaleTimeString()}`);
console.log(`  toLocaleString: ${formatExample.toLocaleString()}`);

// ==================== Intl.DateTimeFormat ====================
console.log("\n5. Intl.DateTimeFormat");

const intlDate = new Date();

// 简单格式化
const simpleFormat = new Intl.DateTimeFormat("zh-CN").format(intlDate);
console.log(`  简单格式化: ${simpleFormat}`);

// 详细格式化
const detailFormat = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
}).format(intlDate);
console.log(`  详细格式化: ${detailFormat}`);

// 不同地区
const usFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric"
}).format(intlDate);
console.log(`  美式格式: ${usFormat}`);

// ==================== 日期计算 ====================
console.log("\n6. 日期计算");

// 加减天数
function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// 加减月份
function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

// 计算差值（天数）
function diffDays(date1: Date, date2: Date): number {
  const diff = date1.getTime() - date2.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

const baseDate = new Date("2024-01-15");
console.log(`  基准日期: ${baseDate.toLocaleDateString()}`);
console.log(`  +7天: ${addDays(baseDate, 7).toLocaleDateString()}`);
console.log(`  -7天: ${addDays(baseDate, -7).toLocaleDateString()}`);
console.log(`  +1月: ${addMonths(baseDate, 1).toLocaleDateString()}`);

const date1 = new Date("2024-01-15");
const date2 = new Date("2024-01-01");
console.log(`  1月15日 - 1月1日 = ${diffDays(date1, date2)} 天`);

// 获取月份天数
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

console.log(`  2024年2月天数: ${getDaysInMonth(2024, 1)} (闰年)`);
console.log(`  2023年2月天数: ${getDaysInMonth(2023, 1)}`);

// ==================== 日期比较 ====================
console.log("\n7. 日期比较");

const compare1 = new Date("2024-01-01T10:00:00");
const compare2 = new Date("2024-01-01T12:00:00");

console.log(`  compare1 < compare2: ${compare1 < compare2}`);
console.log(`  compare1 === compare2: ${compare1.getTime() === compare2.getTime()}`);

// 判断是否同一天
function isSameDay(d1: Date, d2: Date): boolean {
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
}

const sameDay1 = new Date("2024-01-01T10:00:00");
const sameDay2 = new Date("2024-01-01T15:00:00");
console.log(`  同一天判断: ${isSameDay(sameDay1, sameDay2)}`);

// ==================== 实用函数 ====================
console.log("\n8. 实用函数");

// 获取本周开始（周一）
function getWeekStart(date: Date): Date {
  const result = new Date(date);
  const day = result.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  result.setDate(result.getDate() + diff);
  result.setHours(0, 0, 0, 0);
  return result;
}

// 获取本月开始
function getMonthStart(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

// 获取本月结束
function getMonthEnd(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

// 是否是今天
function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

// 自定义格式化
function formatDate(date: Date, format: string): string {
  const pad = (n: number) => n.toString().padStart(2, "0");

  return format
    .replace("yyyy", date.getFullYear().toString())
    .replace("MM", pad(date.getMonth() + 1))
    .replace("dd", pad(date.getDate()))
    .replace("HH", pad(date.getHours()))
    .replace("mm", pad(date.getMinutes()))
    .replace("ss", pad(date.getSeconds()));
}

const utilityDate = new Date("2024-03-15T14:30:45");
console.log(`  本周开始: ${getWeekStart(utilityDate).toLocaleDateString()}`);
console.log(`  本月开始: ${getMonthStart(utilityDate).toLocaleDateString()}`);
console.log(`  本月结束: ${getMonthEnd(utilityDate).toLocaleDateString()}`);
console.log(`  是否今天: ${isToday(utilityDate)}`);
console.log(`  自定义格式: ${formatDate(utilityDate, "yyyy-MM-dd HH:mm:ss")}`);

// ==================== 时区处理 ====================
console.log("\n9. 时区信息");

const tzDate = new Date();
console.log(`  时区偏移(分钟): ${tzDate.getTimezoneOffset()}`);
console.log(`  时区偏移(小时): ${-tzDate.getTimezoneOffset() / 60}`);

// UTC 时间
console.log(`  本地时间: ${tzDate.toLocaleString()}`);
console.log(`  UTC 时间: ${tzDate.toUTCString()}`);

// ==================== 计时器 ====================
console.log("\n10. 计时器");

const startTime = Date.now();

// 模拟一些操作
for (let i = 0; i < 1000000; i++) {
  Math.random();
}

const endTime = Date.now();
console.log(`  操作耗时: ${endTime - startTime}ms`);

console.log("\n=== 时间处理示例运行完成 ===");