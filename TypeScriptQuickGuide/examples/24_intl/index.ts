// 全球化处理示例代码
// 运行方式: npx tsx src/24_intl/index.ts

console.log("=== TypeScript 全球化处理示例 ===\n");

// ==================== 1. UTF-16 编码问题 ====================
console.log("1. UTF-16 编码问题");

const emoji = "😀";
const chinese = "𠮷";

console.log(`  emoji "😀" length: ${emoji.length} (应为 1)`);
console.log(`  汉字 "𠮷" length: ${chinese.length} (应为 1)`);

// 正确获取字符数
function getCharCount(str: string): number {
  return [...str].length;
}

console.log(`  正确字符数 emoji: ${getCharCount(emoji)}`);
console.log(`  正确字符数 汉字: ${getCharCount(chinese)}`);

// 字符串遍历
const str = "a😀b𠮷c";
console.log(`  字符串 "${str}" 的字符:`);
for (const char of str) {
  console.log(`    - "${char}"`);
}

// ==================== 2. Intl.DateTimeFormat ====================
console.log("\n2. Intl.DateTimeFormat 日期格式化");

const date = new Date();

const locales = ["zh-CN", "en-US", "ja-JP", "de-DE", "ar-SA"];
console.log("  不同地区的日期格式:");
for (const locale of locales) {
  const formatted = new Intl.DateTimeFormat(locale).format(date);
  console.log(`    ${locale}: ${formatted}`);
}

// 详细格式化
const detailedFormat = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false
});
console.log(`\n  详细格式: ${detailedFormat.format(date)}`);

// 时区
console.log("\n  不同时区的时间:");
const timeZones = ["Asia/Shanghai", "America/New_York", "Europe/London", "Asia/Tokyo"];
for (const tz of timeZones) {
  const formatted = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: tz,
    timeZoneName: "short"
  }).format(date);
  console.log(`    ${tz}: ${formatted}`);
}

// formatToParts
console.log("\n  formatToParts 分解:");
const parts = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric"
}).formatToParts(date);

for (const part of parts) {
  console.log(`    { type: "${part.type}", value: "${part.value}" }`);
}

// ==================== 3. Intl.NumberFormat ====================
console.log("\n3. Intl.NumberFormat 数字格式化");

const num = 1234567.89;

console.log("  不同地区的数字格式:");
for (const locale of ["zh-CN", "en-US", "de-DE", "en-IN"]) {
  const formatted = new Intl.NumberFormat(locale).format(num);
  console.log(`    ${locale}: ${formatted}`);
}

// 货币格式化
console.log("\n  货币格式化:");
const currencies = [
  { locale: "zh-CN", currency: "CNY" },
  { locale: "en-US", currency: "USD" },
  { locale: "ja-JP", currency: "JPY" },
  { locale: "de-DE", currency: "EUR" }
];

for (const { locale, currency } of currencies) {
  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency
  }).format(num);
  console.log(`    ${locale} ${currency}: ${formatted}`);
}

// 百分比
console.log("\n  百分比格式化:");
const ratio = 0.8765;
console.log(`    ${new Intl.NumberFormat("zh-CN", { style: "percent" }).format(ratio)}`);
console.log(`    ${new Intl.NumberFormat("zh-CN", { style: "percent", minimumFractionDigits: 2 }).format(ratio)}`);

// 单位格式化
console.log("\n  单位格式化:");
console.log(`    ${new Intl.NumberFormat("zh-CN", { style: "unit", unit: "kilometer" }).format(100)}`);
console.log(`    ${new Intl.NumberFormat("zh-CN", { style: "unit", unit: "kilometer-per-hour" }).format(60)}`);
console.log(`    ${new Intl.NumberFormat("zh-CN", { style: "unit", unit: "celsius" }).format(25)}`);

// 紧凑格式
console.log("\n  紧凑格式化:");
const large = 1234567890;
console.log(`    zh-CN: ${new Intl.NumberFormat("zh-CN", { notation: "compact" }).format(large)}`);
console.log(`    en-US: ${new Intl.NumberFormat("en-US", { notation: "compact" }).format(large)}`);

// ==================== 4. Intl.Collator ====================
console.log("\n4. Intl.Collator 字符串比较");

// 中文拼音排序
const names = ["张三", "李四", "王五", "赵六", "钱七"];
console.log(`  原始: ${names.join(", ")}`);
console.log(`  拼音排序: ${names.sort(new Intl.Collator("zh-CN").compare).join(", ")}`);

// 英文排序（忽略大小写）
const words = ["banana", "Apple", "cherry", "apple", "Banana"];
console.log(`\n  原始: ${words.join(", ")}`);
console.log(`  排序: ${words.sort(new Intl.Collator("en", { sensitivity: "base" }).compare).join(", ")}`);

// 比较相等
const collator = new Intl.Collator("en", { sensitivity: "base" });
console.log(`\n  "café" === "cafe": ${collator.compare("café", "cafe") === 0}`);

// ==================== 5. Intl.PluralRules ====================
console.log("\n5. Intl.PluralRules 复数处理");

// 英文复数
const prEn = new Intl.PluralRules("en");
console.log("  英文复数规则:");
[0, 1, 2, 5, 21].forEach(n => {
  console.log(`    ${n}: ${prEn.select(n)}`);
});

// 俄文复数（更多形式）
const prRu = new Intl.PluralRules("ru");
console.log("\n  俄文复数规则:");
[1, 2, 5, 21, 22, 25].forEach(n => {
  console.log(`    ${n}: ${prRu.select(n)}`);
});

// 实际应用
interface PluralForms {
  zero?: string;
  one?: string;
  two?: string;
  few?: string;
  many?: string;
  other: string;
}

function pluralize(count: number, forms: PluralForms, locale: string): string {
  const rule = new Intl.PluralRules(locale).select(count);
  const form = forms[rule as keyof PluralForms] ?? forms.other;
  return `${count} ${form}`;
}

console.log("\n  英文:");
console.log(`    ${pluralize(1, { one: "file", other: "files" }, "en")}`);
console.log(`    ${pluralize(5, { one: "file", other: "files" }, "en")}`);

console.log("\n  俄文:");
const ruFiles = { one: "файл", few: "файла", many: "файлов", other: "файлов" };
console.log(`    ${pluralize(1, ruFiles, "ru")}`);
console.log(`    ${pluralize(2, ruFiles, "ru")}`);
console.log(`    ${pluralize(5, ruFiles, "ru")}`);

// ==================== 6. Intl.RelativeTimeFormat ====================
console.log("\n6. Intl.RelativeTimeFormat 相对时间");

const rtfZh = new Intl.RelativeTimeFormat("zh-CN", { numeric: "auto" });
const rtfEn = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

console.log("  中文:");
console.log(`    -1 day: ${rtfZh.format(-1, "day")}`);
console.log(`    0 day: ${rtfZh.format(0, "day")}`);
console.log(`    1 day: ${rtfZh.format(1, "day")}`);
console.log(`    -2 week: ${rtfZh.format(-2, "week")}`);
console.log(`    3 month: ${rtfZh.format(3, "month")}`);

console.log("\n  英文:");
console.log(`    -1 day: ${rtfEn.format(-1, "day")}`);
console.log(`    1 day: ${rtfEn.format(1, "day")}`);
console.log(`    -2 week: ${rtfEn.format(-2, "week")}`);

// 实用函数
function formatRelativeTime(date: Date, locale: string): string {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  if (Math.abs(diffSec) < 60) return rtf.format(diffSec, "second");
  if (Math.abs(diffMin) < 60) return rtf.format(diffMin, "minute");
  if (Math.abs(diffHour) < 24) return rtf.format(diffHour, "hour");
  if (Math.abs(diffDay) < 30) return rtf.format(diffDay, "day");

  const diffMonth = Math.round(diffDay / 30);
  if (Math.abs(diffMonth) < 12) return rtf.format(diffMonth, "month");

  const diffYear = Math.round(diffDay / 365);
  return rtf.format(diffYear, "year");
}

console.log("\n  实际应用:");
console.log(`    5秒后: ${formatRelativeTime(new Date(Date.now() + 5000), "zh-CN")}`);
console.log(`    1小时前: ${formatRelativeTime(new Date(Date.now() - 3600000), "zh-CN")}`);
console.log(`    2天后: ${formatRelativeTime(new Date(Date.now() + 172800000), "zh-CN")}`);

// ==================== 7. Intl.ListFormat ====================
console.log("\n7. Intl.ListFormat 列表格式化");

const fruits = ["苹果", "香蕉", "橙子"];

console.log("  中文:");
console.log(`    conjunction: ${new Intl.ListFormat("zh-CN", { type: "conjunction" }).format(fruits)}`);
console.log(`    disjunction: ${new Intl.ListFormat("zh-CN", { type: "disjunction" }).format(fruits)}`);

console.log("\n  英文:");
console.log(`    conjunction: ${new Intl.ListFormat("en-US", { type: "conjunction" }).format(fruits)}`);
console.log(`    disjunction: ${new Intl.ListFormat("en-US", { type: "disjunction" }).format(fruits)}`);

// 不同风格
const items = ["A", "B", "C"];
console.log("\n  不同风格 (en):");
console.log(`    long: ${new Intl.ListFormat("en", { type: "conjunction", style: "long" }).format(items)}`);
console.log(`    short: ${new Intl.ListFormat("en", { type: "conjunction", style: "short" }).format(items)}`);
console.log(`    narrow: ${new Intl.ListFormat("en", { type: "conjunction", style: "narrow" }).format(items)}`);

// ==================== 8. Intl.DisplayNames ====================
console.log("\n8. Intl.DisplayNames 显示名称");

// 语言名称
const langNames = new Intl.DisplayNames("zh-CN", { type: "language" });
console.log("  语言名称:");
["en", "ja", "zh-Hans", "ko", "ar"].forEach(code => {
  console.log(`    ${code}: ${langNames.of(code)}`);
});

// 货币名称
const currencyNames = new Intl.DisplayNames("zh-CN", { type: "currency" });
console.log("\n  货币名称:");
["USD", "EUR", "JPY", "GBP", "CNY"].forEach(code => {
  console.log(`    ${code}: ${currencyNames.of(code)}`);
});

// 地区名称
const regionNames = new Intl.DisplayNames("zh-CN", { type: "region" });
console.log("\n  地区名称:");
["US", "GB", "JP", "DE", "FR", "KR"].forEach(code => {
  console.log(`    ${code}: ${regionNames.of(code)}`);
});

// ==================== 9. Intl.Locale ====================
console.log("\n9. Intl.Locale 语言环境");

const locale = new Intl.Locale("zh-Hans-CN");
console.log(`  语言: ${locale.language}`);
console.log(`  文字: ${locale.script}`);
console.log(`  地区: ${locale.region}`);
console.log(`  完整: ${locale.toString()}`);

// 使用选项创建
const locale2 = new Intl.Locale("zh", {
  region: "TW",
  script: "Hant"
});
console.log(`\n  繁体中文: ${locale2.toString()}`);

// ==================== 10. Intl.Segmenter ====================
console.log("\n10. Intl.Segmenter 文本分段");

// 按词分段
const text = "Hello, 世界！这是一段测试文本。";
const wordSegmenter = new Intl.Segmenter("zh-CN", { granularity: "word" });
const words2 = [...wordSegmenter.segment(text)]
  .filter(s => s.isWordLike)
  .map(s => s.segment);

console.log(`  文本: "${text}"`);
console.log(`  词语: ${words2.join(", ")}`);

// 按句子分段
const sentences = "Hello world. This is a test. 这也是一个测试。";
const sentenceSegmenter = new Intl.Segmenter("zh-CN", { granularity: "sentence" });
const sentenceList = [...sentenceSegmenter.segment(sentences)].map(s => s.segment.trim());

console.log(`\n  文本: "${sentences}"`);
console.log("  句子:");
sentenceList.forEach((s, i) => console.log(`    ${i + 1}. ${s}`));

// 按字符分段（正确处理代理对）
const complexText = "a😀b𠮷c";
const charSegmenter = new Intl.Segmenter("zh-CN", { granularity: "grapheme" });
const chars = [...charSegmenter.segment(complexText)].map(s => s.segment);

console.log(`\n  文本: "${complexText}"`);
console.log(`  length 属性: ${complexText.length}`);
console.log(`  实际字符数: ${chars.length}`);
console.log(`  字符: ${chars.join(", ")}`);

console.log("\n=== 全球化处理示例运行完成 ===");