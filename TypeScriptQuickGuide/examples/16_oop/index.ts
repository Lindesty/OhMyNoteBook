// 面向对象示例代码
// 运行方式: npx tsx src/09_oop/index.ts

console.log("=== TypeScript 面向对象示例 ===\n");

// ==================== 类定义 ====================
console.log("1. 类定义");

class Person {
  // 属性
  private _name: string;
  public age: number;
  protected email: string;

  // 静态属性
  static species = "Human";

  // 构造函数
  constructor(name: string, age: number, email: string) {
    this._name = name;
    this.age = age;
    this.email = email;
  }

  // Getter
  get name(): string {
    return this._name;
  }

  // Setter
  set name(value: string) {
    if (value.length > 0) {
      this._name = value;
    }
  }

  // 方法
  greet(): string {
    return `Hello, I'm ${this._name}`;
  }

  // 静态方法
  static create(name: string): Person {
    return new Person(name, 0, "");
  }
}

const person = new Person("Tom", 30, "tom@example.com");
console.log(`  ${person.greet()}`);
console.log(`  年龄: ${person.age}`);
console.log(`  物种: ${Person.species}`);

const defaultPerson = Person.create("Default");
console.log(`  静态工厂: ${defaultPerson.greet()}`);

// ==================== 简写语法 ====================
console.log("\n2. 构造函数参数属性");

class Book {
  constructor(
    public title: string,
    public author: string,
    private _price: number
  ) {}

  get price(): number {
    return this._price;
  }
}

const book = new Book("TypeScript Guide", "Tom", 29.99);
console.log(`  书名: ${book.title}, 作者: ${book.author}, 价格: $${book.price}`);

// ==================== 继承 ====================
console.log("\n3. 继承");

class Animal {
  constructor(public name: string) {}

  speak(): string {
    return `${this.name} makes a sound`;
  }

  move(distance: number): string {
    return `${this.name} moved ${distance}m`;
  }
}

class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name);
  }

  speak(): string {
    return `${this.name} barks: Woof!`;
  }

  fetch(): string {
    return `${this.name} fetches the ball`;
  }
}

const dog = new Dog("Buddy", "Labrador");
console.log(`  ${dog.speak()}`);
console.log(`  ${dog.move(10)}`);
console.log(`  ${dog.fetch()}, breed: ${dog.breed}`);

// ==================== 接口 ====================
console.log("\n4. 接口");

interface User {
  id: number;
  name: string;
  email?: string;
  readonly createdAt: Date;
}

interface Admin extends User {
  permissions: string[];
}

class BasicUser implements User {
  readonly createdAt: Date = new Date();

  constructor(
    public id: number,
    public name: string,
    public email?: string
  ) {}
}

class AdminUser implements Admin {
  readonly createdAt: Date = new Date();

  constructor(
    public id: number,
    public name: string,
    public permissions: string[],
    public email?: string
  ) {}

  hasPermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }
}

const basicUser = new BasicUser(1, "Tom");
console.log(`  普通用户: ${basicUser.name}`);

const admin = new AdminUser(2, "Admin", ["read", "write", "delete"]);
console.log(`  管理员: ${admin.name}, 有写入权限: ${admin.hasPermission("write")}`);

// ==================== 抽象类 ====================
console.log("\n5. 抽象类");

abstract class Shape {
  constructor(public color: string) {}

  abstract getArea(): number;

  describe(): string {
    return `A ${this.color} shape with area ${this.getArea().toFixed(2)}`;
  }
}

class Circle extends Shape {
  constructor(color: string, public radius: number) {
    super(color);
  }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(color: string, public width: number, public height: number) {
    super(color);
  }

  getArea(): number {
    return this.width * this.height;
  }
}

const circle = new Circle("red", 5);
const rectangle = new Rectangle("blue", 4, 6);

console.log(`  ${circle.describe()}`);
console.log(`  ${rectangle.describe()}`);

// ==================== 可辨识联合 ====================
console.log("\n6. 可辨识联合");

interface SquareShape {
  kind: "square";
  sideLength: number;
}

interface CircleShape {
  kind: "circle";
  radius: number;
}

interface TriangleShape {
  kind: "triangle";
  base: number;
  height: number;
}

type AllShapes = SquareShape | CircleShape | TriangleShape;

function calculateArea(shape: AllShapes): number {
  switch (shape.kind) {
    case "square":
      return shape.sideLength ** 2;
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "triangle":
      return (shape.base * shape.height) / 2;
  }
}

const shapes: AllShapes[] = [
  { kind: "square", sideLength: 4 },
  { kind: "circle", radius: 3 },
  { kind: "triangle", base: 4, height: 5 }
];

console.log("  各形状面积:");
shapes.forEach(shape => {
  console.log(`    ${shape.kind}: ${calculateArea(shape).toFixed(2)}`);
});

// ==================== 混入 ====================
console.log("\n7. 混入 (Mixin)");

type Constructor<T = {}> = new (...args: any[]) => T;

function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  };
}

function Tagged<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    tags: string[] = [];
    addTag(tag: string) { this.tags.push(tag); }
  };
}

class Article {
  constructor(public title: string) {}
}

const TimestampedArticle = Timestamped(Article);
const TaggedTimestampedArticle = Tagged(Timestamped(Article));

const article = new TaggedTimestampedArticle("TypeScript Tutorial");
article.addTag("typescript");
article.addTag("tutorial");

console.log(`  文章: ${article.title}`);
console.log(`  时间戳: ${article.timestamp}`);
console.log(`  标签: ${article.tags.join(", ")}`);

console.log("\n=== 面向对象示例运行完成 ===");