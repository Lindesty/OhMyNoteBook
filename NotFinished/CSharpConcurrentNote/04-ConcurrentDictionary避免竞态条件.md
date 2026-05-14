# 模块04：ConcurrentDictionary 避免竞态条件

## 概述

本模块延续上一模块的极客服装公司应用开发，深入探讨并发编程中的一个关键问题：**竞态条件（Race Condition）**。当多个线程同时访问和修改共享数据时，竞态条件可能导致数据损坏。本模块将教你：

- 如何识别竞态条件可能发生的场景
- 竞态条件如何导致数据损坏
- 使用 `AddOrUpdate()` 和 `GetOrAdd()` 方法避免竞态条件
- 并发编程的核心原则：尽可能在单次方法调用中完成操作

---

## 演示场景：买卖T恤

### 业务模型

本模块的演示程序比之前更复杂，模拟了一个完整的买卖场景：

- **进货**：供应商以1-9件的批量向店铺出售T恤
- **销售**：顾客每次购买一件T恤
- **库存追踪**：使用字典存储每种T恤的当前库存数量
- **简化假设**：每天从零库存开始，必须先进货才能销售

### 程序结构

```csharp
// TShirt.cs - T恤实体类
public class TShirt
{
    public string Code { get; }
    public string Name { get; }
    public int PricePence { get; }
    
    public TShirt(string code, string name, int pricePence)
    {
        Code = code;
        Name = name;
        PricePence = pricePence;
    }
}

// TShirtProvider.cs - 不可变的T恤数据源
public static class TShirtProvider
{
    public static ImmutableArray<TShirt> AllShirts { get; } = ImmutableArray.Create(
        new TShirt("igeek", "IGeek", 500),
        new TShirt("bigdata", "Big Data", 600),
        // ... 更多T恤
    );
    
    public static ImmutableDictionary<string, TShirt> AllShirtsByCode { get; } 
        = AllShirts.ToImmutableDictionary(x => x.Code);
    
    public static TShirt SelectRandomShirt()
    {
        int selectedIndex = Rnd.NextInt(AllShirts.Length);
        return AllShirts[selectedIndex];
    }
}
```

> **注意**：`TShirtProvider` 使用不可变集合，因此不需要担心线程同步问题。

---

## 单线程实现（存在隐患的版本）

### StockController 初始版本

```csharp
public class StockController
{
    private Dictionary<string, int> _stock = new Dictionary<string, int>();
    int _totalQuantityBought;
    int _totalQuantitySold;
    
    // 进货方法
    public void BuyShirts(string code, int quantityToBuy)
    {
        if (!_stock.ContainsKey(code))
            _stock.Add(code, 0);
        _stock[code] += quantityToBuy;
        _totalQuantityBought += quantityToBuy;
    }
    
    // 销售方法
    public bool TrySellShirt(string code)
    {
        if (_stock.TryGetValue(code, out int stock) && stock > 0)
        {
            --_stock[code];
            ++_totalQuantitySold;
            return true;
        }
        return false;
    }
    
    // 显示库存并进行一致性检查
    public void DisplayStock()
    {
        Console.WriteLine("Stock levels by item:");
        foreach (TShirt shirt in TShirtProvider.AllShirts)
        {
            _stock.TryGetValue(shirt.Code, out int stockLevel);
            Console.WriteLine($"{shirt.Name,-30}: {stockLevel}");
        }
        
        int totalStock = _stock.Values.Sum();
        Console.WriteLine($"\nBought = {_totalQuantityBought}");
        Console.WriteLine($"Sold   = {_totalQuantitySold}");
        Console.WriteLine($"Stock  = {totalStock}");
        
        // 一致性检查：库存 = 进货 - 销售
        int error = totalStock + _totalQuantitySold - _totalQuantityBought;
        if (error == 0)
            Console.WriteLine("Stock levels match");
        else
            Console.WriteLine($"Error in stock level: {error}");
    }
}
```

### 单线程程序入口

```csharp
static void Main(string[] args)
{
    StockController controller = new StockController();
    TimeSpan workDay = new TimeSpan(0, 0, 0, 0, 500); // 半秒工作日
    
    new SalesPerson("Tim").Work(workDay, controller);
    controller.DisplayStock();
}
```

---

## 转换为多线程版本

### 问题初现

当我们将程序转换为多线程版本后：

```csharp
static void Main(string[] args)
{
    StockController controller = new StockController();
    TimeSpan workDay = new TimeSpan(0, 0, 0, 0, 500);
    
    Task task1 = Task.Run(() => new SalesPerson("Tim").Work(workDay, controller));
    Task task2 = Task.Run(() => new SalesPerson("Koffi").Work(workDay, controller));
    Task task3 = Task.Run(() => new SalesPerson("Julie").Work(workDay, controller));
    Task task4 = Task.Run(() => new SalesPerson("Michael").Work(workDay, controller));
    
    Task.WaitAll(task1, task2, task3, task4);
    controller.DisplayStock();
}
```

将 `Dictionary` 改为 `ConcurrentDictionary` 后，唯一需要修改的是 `Add()` 改为 `TryAdd()`：

```csharp
// 原代码
if (!_stock.ContainsKey(code))
    _stock.Add(code, 0);

// 修改后
_stock.TryAdd(code, 0);
```

程序可以编译运行，但**一致性检查失败**！这说明数据已损坏。

---

## 竞态条件详解

### 什么是竞态条件？

**竞态条件**是指操作的结果取决于线程执行的顺序。当多个线程同时访问和修改共享数据时，如果操作不是原子的，就可能导致数据损坏。

### 问题代码分析

```csharp
_stock[code] += quantityToBuy;
```

这行看似简单的代码实际上是 C# 的语法糖，编译器会展开为：

```csharp
// 步骤1：读取当前值
int currentValue = _stock[code];
// 步骤2：计算新值
int newValue = currentValue + quantityToBuy;
// 步骤3：写回新值
_stock[code] = newValue;
```

### 竞态条件示例

假设当前 iGeek T恤库存为 6 件：
- **线程A**：要进货 4 件
- **线程B**：要销售 1 件

正确结果应该是：6 + 4 - 1 = 9 件

但竞态条件可能导致：

| 步骤 | 线程A | 线程B | 实际库存 |
|------|-------|-------|----------|
| 1 | 读取库存：6 | | 6 |
| 2 | 计算新值：6+4=10 | | 6 |
| 3 | | 读取库存：6 | 6 |
| 4 | | 计算新值：6-1=5 | 6 |
| 5 | 写入：10 | | 10 |
| 6 | | 写入：5 | **5** |

最终库存是 5 件而不是正确的 9 件！这就是数据损坏。

---

## 错误的解决方案：TryUpdate()

### 尝试使用 TryUpdate()

```csharp
public void BuyShirts(string code, int quantityToBuy)
{
    _stock.TryAdd(code, 0);
    int newStock = _stock[code] + quantityToBuy;
    bool success = _stock.TryUpdate(code, newStock, _stock[code]);
    // 问题：如果失败怎么办？
}
```

`TryUpdate()` 方法的签名：

```csharp
public bool TryUpdate(TKey key, TValue newValue, TValue comparisonValue)
```

它需要三个参数：
- `key`：要更新的键
- `newValue`：新值
- `comparisonValue`：期望的旧值（用于比较）

### 为什么 TryUpdate() 不能解决问题？

1. `TryUpdate()` 确实是**原子操作**
2. 但在读取旧值和调用 `TryUpdate()` 之间，其他线程可能已经修改了数据
3. 如果值不匹配，`TryUpdate()` 返回 `false`
4. **关键问题**：进货操作不应该失败！我们不能告诉顾客"抱歉，因为线程同步问题无法进货"

**结论**：Try模式适用于可以接受失败的操作，但进货操作必须成功。

---

## 正确的解决方案：AddOrUpdate()

### AddOrUpdate() 方法

`ConcurrentDictionary` 提供了 `AddOrUpdate()` 高层方法，可以在单次调用中完成"添加或更新"操作：

```csharp
public TValue AddOrUpdate(
    TKey key,
    TValue addValue,
    Func<TKey, TValue, TValue> updateValueFactory)
```

参数说明：
- `key`：要操作的关键字
- `addValue`：如果键不存在，添加此值
- `updateValueFactory`：如果键存在，使用此Lambda计算新值

### 使用 AddOrUpdate() 实现进货

```csharp
public void BuyShirts(string code, int quantityToBuy)
{
    _stock.AddOrUpdate(
        code,                                    // 键
        quantityToBuy,                           // 不存在时的初始值
        (key, oldValue) => oldValue + quantityToBuy  // 存在时的更新逻辑
    );
    Interlocked.Add(ref _totalQuantityBought, quantityToBuy);
}
```

**优势**：
- 整个操作在一次方法调用中完成
- 不需要先检查键是否存在
- 线程安全，不会产生竞态条件

---

## Interlocked 类：原子操作计数器

### 问题代码

```csharp
_totalQuantityBought += quantityToBuy;
```

`+=` 操作符同样存在竞态条件问题，因为它涉及读取-计算-写入三个步骤。

### 解决方案：Interlocked.Add()

```csharp
Interlocked.Add(ref _totalQuantityBought, quantityToBuy);
```

`Interlocked` 类提供了一组原子操作方法：
- `Interlocked.Add()`：原子加法
- `Interlocked.Increment()`：原子递增
- `Interlocked.Decrement()`：原子递减
- `Interlocked.Exchange()`：原子交换
- `Interlocked.CompareExchange()`：原子比较交换

> **重要**：`Interlocked` 类是处理简单数值原子操作的首选工具。

---

## 核心原则：单次方法调用

### 最佳实践

**尽量在单次并发集合方法调用中完成整个操作**。

为什么这很重要？

并发集合的线程安全性**仅保证在方法执行期间**，而不是**方法调用之间**。每当有多次方法调用，就存在其他线程在中间修改数据的风险。

### 对比分析

```csharp
// 错误：多次方法调用，存在竞态条件风险
if (!_stock.ContainsKey(code))
    _stock.TryAdd(code, 0);
_stock[code] += quantityToBuy;  // 这不是原子操作

// 正确：单次方法调用，线程安全
_stock.AddOrUpdate(code, quantityToBuy, (k, v) => v + quantityToBuy);
```

---

## 复杂场景：条件销售

### 问题

销售操作比进货更复杂，因为需要检查库存是否足够。如何在一个原子操作中完成检查和更新？

### 错误方案1：分步操作

```csharp
public bool TrySellShirt(string code)
{
    if (_stock.TryGetValue(code, out int stock) && stock > 0)
    {
        // 危险！在检查和更新之间，其他线程可能修改库存
        _stock.AddOrUpdate(code, 0, (k, v) => v - 1);
        Interlocked.Increment(ref _totalQuantitySold);
        return true;
    }
    return false;
}
```

**问题**：两次方法调用之间存在竞态条件窗口。

### 错误方案2：在Lambda中判断

```csharp
_stock.AddOrUpdate(code, 0, (key, oldValue) =>
{
    if (oldValue > 0)
        return oldValue - 1;
    return oldValue;
});
// 问题：如何知道是否成功销售？
```

**问题**：`AddOrUpdate()` 执行后，不知道是否真的卖出了一件T恤。

### 正确方案：使用闭包传递结果

```csharp
public bool TrySellShirt(string code)
{
    bool success = false;
    
    _stock.AddOrUpdate(
        code,
        // 不存在时的处理：添加并标记失败
        (itemName) => { success = false; return 0; },
        // 存在时的处理：检查库存并更新
        (itemName, oldValue) =>
        {
            if (oldValue == 0)
            {
                success = false;
                return 0;
            }
            else
            {
                success = true;
                return oldValue - 1;
            }
        }
    );
    
    if (success)
        Interlocked.Increment(ref _totalQuantitySold);
    
    return success;
}
```

**关键点**：
1. 使用闭包变量 `success` 记录操作结果
2. 所有逻辑在单次 `AddOrUpdate()` 调用中完成
3. Lambda 可以执行多次（见下文注意事项）

### 重要注意事项：Lambda可能多次执行

`AddOrUpdate()` 不是完全原子的。在某些情况下，ConcurrentDictionary 可能会多次执行Lambda：
- 计算新值时发现数据已被其他线程修改
- 需要重新执行Lambda

因此：
1. Lambda 应该是**无副作用**的，或者
2. 如果有副作用（如修改闭包变量），需要处理多次执行的情况

上述代码中，通过在两个Lambda中都设置 `success` 变量来处理这种情况。

---

## GetOrAdd()：保证读取成功

### 用途

`GetOrAdd()` 确保读取时键存在，如果不存在则自动添加。

```csharp
public TValue GetOrAdd(TKey key, TValue value)
public TValue GetOrAdd(TKey key, Func<TKey, TValue> valueFactory)
```

### 示例

```csharp
public void DisplayStock()
{
    Console.WriteLine("Stock levels by item:");
    foreach (TShirt shirt in TShirtProvider.AllShirts)
    {
        // 如果键不存在，返回0并添加到字典中
        int stockLevel = _stock.GetOrAdd(shirt.Code, 0);
        Console.WriteLine($"{shirt.Name,-30}: {stockLevel}");
    }
    // ...
}
```

`GetOrAdd()` 与 `TryGetValue()` 的区别：
- `TryGetValue()`：键不存在时返回 `false`
- `GetOrAdd()`：键不存在时自动添加并返回默认值

---

## 完整的线程安全实现

```csharp
using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading;

public class StockController
{
    private ConcurrentDictionary<string, int> _stock = 
        new ConcurrentDictionary<string, int>();
    private int _totalQuantityBought;
    private int _totalQuantitySold;
    
    // 进货：使用AddOrUpdate
    public void BuyShirts(string code, int quantityToBuy)
    {
        _stock.AddOrUpdate(
            code, 
            quantityToBuy,
            (key, oldValue) => oldValue + quantityToBuy
        );
        Interlocked.Add(ref _totalQuantityBought, quantityToBuy);
    }
    
    // 销售：使用闭包实现条件更新
    public bool TrySellShirt(string code)
    {
        bool success = false;
        
        _stock.AddOrUpdate(
            code,
            (itemName) => { success = false; return 0; },
            (itemName, oldValue) =>
            {
                if (oldValue == 0)
                {
                    success = false;
                    return 0;
                }
                else
                {
                    success = true;
                    return oldValue - 1;
                }
            }
        );
        
        if (success)
            Interlocked.Increment(ref _totalQuantitySold);
        
        return success;
    }
    
    // 显示库存
    public void DisplayStock()
    {
        Console.WriteLine("Stock levels by item:");
        foreach (TShirt shirt in TShirtProvider.AllShirts)
        {
            int stockLevel = _stock.GetOrAdd(shirt.Code, 0);
            Console.WriteLine($"{shirt.Name,-30}: {stockLevel}");
        }
        
        int totalStock = _stock.Values.Sum();
        Console.WriteLine($"\nBought = {_totalQuantityBought}");
        Console.WriteLine($"Sold   = {_totalQuantitySold}");
        Console.WriteLine($"Stock  = {totalStock}");
        
        int error = totalStock + _totalQuantitySold - _totalQuantityBought;
        if (error == 0)
            Console.WriteLine("Stock levels match");
        else
            Console.WriteLine($"Error in stock level: {error}");
    }
}
```

---

## 要点总结

### 1. 竞态条件的本质

- 竞态条件是操作结果依赖于线程执行顺序的问题
- 多次方法调用之间存在其他线程修改数据的风险
- 简单的 `+=` 操作符不是原子操作，会展开为读取-计算-写入三步

### 2. TryUpdate() 的局限性

- `TryUpdate()` 是原子操作，但只能用于"可以失败"的场景
- 对于必须成功的操作（如进货），Try模式不适用
- 在读取旧值和调用 `TryUpdate()` 之间仍存在竞态窗口

### 3. AddOrUpdate() 的优势

- 单次方法调用完成"添加或更新"操作
- 不需要预先检查键是否存在
- 线程安全，避免竞态条件

### 4. 核心设计原则

> **尽可能在单次并发集合方法调用中完成整个操作**

这是避免竞态条件的关键原则。并发集合的线程安全仅保证方法执行期间，而不是方法调用之间。

### 5. Interlocked 类

用于简单数值的原子操作：
- `Interlocked.Add()` 替代 `+=`
- `Interlocked.Increment()` 替代 `++`
- `Interlocked.Decrement()` 替代 `--`

### 6. 闭包与Lambda

- 可以使用闭包变量在Lambda和外部代码之间传递信息
- 注意 `AddOrUpdate()` 的Lambda可能被多次执行
- 确保Lambda能正确处理多次执行的情况

### 7. GetOrAdd() 与 TryGetValue()

- `GetOrAdd()` 保证返回值（不存在时自动添加）
- `TryGetValue()` 需要检查返回值判断是否存在
- 根据场景需求选择合适的方法

---

## 相关方法参考

| 方法 | 用途 | 特点 |
|------|------|------|
| `AddOrUpdate()` | 添加或更新 | 保证成功，单次调用 |
| `GetOrAdd()` | 获取或添加 | 保证返回值 |
| `TryUpdate()` | 条件更新 | 可能失败，需处理失败情况 |
| `TryGetValue()` | 尝试获取 | 可能失败，需检查返回值 |
| `TryAdd()` | 尝试添加 | 可能失败，键已存在时返回false |
| `TryRemove()` | 尝试移除 | 可能失败，键不存在时返回false |

---

*下一模块将介绍并发栈和并发队列，展示所学知识如何应用到其他并发集合类型。*