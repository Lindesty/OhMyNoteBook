# BlockingCollection避免轮询

## 概述

在并发编程中，生产者-消费者模式是一个常见的场景。当消费者从集合中取出项目时，如果集合为空，消费者需要决定如何处理：是继续轮询等待，还是放弃？传统的解决方案是不断轮询集合，但这种方式效率低下且被认为是不良实践。

`BlockingCollection<T>` 提供了一个优雅的解决方案，它能够：
- 封装任何生产者-消费者集合（如 `ConcurrentQueue`、`ConcurrentStack`、`ConcurrentBag`）
- 自动阻塞线程等待新项目，避免轮询
- 提供完成添加的机制，通知消费者不再有新项目

## 核心概念

### 1. 问题背景：轮询的困境

在之前使用 `ConcurrentQueue` 的实现中，消费者面临的问题是：当队列为空时，不知道是否还会有新项目被添加。

**轮询方式的问题代码：**

```csharp
public class LogTradesQueue
{
    private IProducerConsumerCollection<Trade> _tradesToLog 
        = new ConcurrentQueue<Trade>();
    private readonly StaffRecords _staffLogs;
    private bool _workingDayComplete;
    
    public void QueueTradeForLogging(Trade trade) => _tradesToLog.TryAdd(trade);
    public void SetNoMoreTrades() => _workingDayComplete = true;

    public void MonitorAndLogTrades()
    {
        while (true)
        {
            Trade nextTrade;
            bool done = _tradesToLog.TryTake(out nextTrade);
            if (done)
            {
                _staffLogs.LogTrade(nextTrade);
                Console.WriteLine($"Processing transaction from {nextTrade.Person.Name}");
            }
            else if (_workingDayComplete)
            {
                Console.WriteLine("No more sales to log - exiting");
                return;
            }
            else
            {
                // 轮询：线程休眠后继续检查，效率低下
                Console.WriteLine("No transactions available");
                Thread.Sleep(500);
            }
        }
    }
}
```

这种轮询方式的问题：
- 线程在休眠期间无法响应
- 休眠时间难以确定（太短浪费CPU，太长延迟响应）
- 代码复杂，需要手动管理 `_workingDayComplete` 标志

### 2. BlockingCollection 基础用法

`BlockingCollection<T>` 是一个包装器，可以封装任何实现了 `IProducerConsumerCollection<T>` 接口的集合。

**声明与初始化：**

```csharp
// 使用默认的 ConcurrentQueue 作为底层集合
private BlockingCollection<Trade> _tradesToLog = new BlockingCollection<Trade>();

// 或显式指定底层集合
private BlockingCollection<Trade> _tradesToLog = 
    new BlockingCollection<Trade>(new ConcurrentQueue<Trade>());

// 也可以使用其他集合类型
private BlockingCollection<Trade> _tradesToLog = 
    new BlockingCollection<Trade>(new ConcurrentStack<Trade>());

private BlockingCollection<Trade> _tradesToLog = 
    new BlockingCollection<Trade>(new ConcurrentBag<Trade>());
```

### 3. 使用 Take() 方法避免轮询

`BlockingCollection<T>` 的核心特性是 `Take()` 方法：当集合为空时，它会阻塞线程直到有新项目被添加。

**改进后的代码：**

```csharp
public class LogTradesQueue
{
    private BlockingCollection<Trade> _tradesToLog = new BlockingCollection<Trade>();
    private readonly StaffRecords _staffLogs;
    
    public LogTradesQueue(StaffRecords staffLogs)
    {
        _staffLogs = staffLogs;
    }
    
    // 通知生产者不再添加项目
    public void SetNoMoreTrades() => _tradesToLog.CompleteAdding();
    
    // 添加项目到集合
    public void QueueTradeForLogging(Trade trade) => _tradesToLog.TryAdd(trade);

    public void MonitorAndLogTrades()
    {
        while (true)
        {
            try
            {
                // Take() 会阻塞等待，直到有项目可取
                // 如果集合为空且已调用 CompleteAdding()，则抛出异常
                Trade nextTrade = _tradesToLog.Take();
                _staffLogs.LogTrade(nextTrade);
                Console.WriteLine($"Processing transaction from {nextTrade.Person.Name}");
            }
            catch (InvalidOperationException ex)
            {
                // 集合为空且已标记完成，退出循环
                Console.WriteLine(ex.Message);
                return;
            }
        }
    }
}
```

**Take() 方法的工作原理：**

| 场景 | 行为 |
|------|------|
| 集合有项目 | 立即取出并返回项目 |
| 集合为空，但可能还有新项目 | 阻塞线程，等待新项目被添加 |
| 集合为空且已调用 `CompleteAdding()` | 抛出 `InvalidOperationException` |

**CompleteAdding() 方法：**
- 调用后，不能再向集合添加新项目
- 通知所有等待中的消费者：不会再有新项目
- 如果添加项目会抛出 `InvalidOperationException`

### 4. 使用 GetConsumingEnumerable() 进一步简化

`BlockingCollection<T>` 提供了一个更简洁的方式：`GetConsumingEnumerable()` 方法，它返回一个可枚举对象，可以配合 `foreach` 循环使用。

**最简洁的实现：**

```csharp
public class LogTradesQueue
{
    private BlockingCollection<Trade> _tradesToLog = new BlockingCollection<Trade>();
    private readonly StaffRecords _staffLogs;
    
    public LogTradesQueue(StaffRecords staffLogs)
    {
        _staffLogs = staffLogs;
    }
    
    public void SetNoMoreTrades() => _tradesToLog.CompleteAdding();
    public void QueueTradeForLogging(Trade trade) => _tradesToLog.TryAdd(trade);

    public void MonitorAndLogTrades()
    {
        // GetConsumingEnumerable() 自动处理等待和完成逻辑
        foreach (Trade nextTrade in _tradesToLog.GetConsumingEnumerable())
        {
            _staffLogs.LogTrade(nextTrade);
            Console.WriteLine("Processing transaction from " + nextTrade.Person.Name);
        }
    }
}
```

**GetConsumingEnumerable() 的工作原理：**
- 自动阻塞等待新项目
- 当集合为空且已调用 `CompleteAdding()` 时，自动结束枚举
- 内部实现了与 `Take()` 方法相同的阻塞逻辑

### 5. 常见错误：直接枚举 BlockingCollection

**错误示范：**

```csharp
// 错误：直接使用 foreach 遍历 BlockingCollection
foreach (Trade nextTrade in _tradesToLog)
{
    // 这只是遍历集合的快照，不会消费项目！
    // 而且快照可能在遍历时还是空的
}
```

直接对 `BlockingCollection` 使用 `foreach` 会：
- 获取集合的**快照**而非消费项目
- 项目不会被从集合中移除
- 如果在添加项目之前就开始遍历，可能遍历的是空集合

**正确做法：** 必须使用 `GetConsumingEnumerable()` 方法。

### 6. 完整示例

**主程序结构：**

```csharp
static void Main(string[] args)
{
    StockController controller = new StockController();
    TimeSpan workDay = new TimeSpan(0, 0, 0, 0, 500);
    StaffRecords staffLogs = new StaffRecords();
    LogTradesQueue tradesQueue = new LogTradesQueue(staffLogs);

    SalesPerson[] staff =
    {
        new SalesPerson("Sahil"),
        new SalesPerson("Julie"),
        new SalesPerson("Kim"),
        new SalesPerson("Chuck")
    };
    
    // 启动销售任务（生产者）
    List<Task> salesTasks = new List<Task>();
    foreach (SalesPerson person in staff)
    {
        salesTasks.Add(Task.Run(() => person.Work(workDay, controller, tradesQueue)));
    }

    // 启动日志任务（消费者）
    Task[] loggingTasks =
    {
        Task.Run(() => tradesQueue.MonitorAndLogTrades()),
        Task.Run(() => tradesQueue.MonitorAndLogTrades())
    };

    // 等待销售完成
    Task.WaitAll(salesTasks.ToArray());
    
    // 通知不再有新交易
    tradesQueue.SetNoMoreTrades();
    
    // 等待日志任务完成
    Task.WaitAll(loggingTasks);

    controller.DisplayStock();
    staffLogs.DisplayCommissions(staff);
}
```

## 要点总结

### BlockingCollection<T> 的核心特性

1. **封装器模式**：不是独立的集合，而是对任何 `IProducerConsumerCollection<T>` 的包装，默认使用 `ConcurrentQueue<T>`

2. **阻塞等待**：
   - `Take()` 方法在集合为空时会阻塞，直到有新项目
   - 避免了低效的轮询操作

3. **完成机制**：
   - `CompleteAdding()` 通知消费者不会再有新项目
   - `IsCompleted` 属性可检查是否已完成添加且集合为空

4. **简化代码**：
   - 使用 `GetConsumingEnumerable()` 可以将消费逻辑简化为 `foreach` 循环
   - 自动处理等待和退出逻辑

### 主要方法对照表

| 方法 | 说明 |
|------|------|
| `TryAdd(T item)` | 尝试添加项目，成功返回 `true` |
| `Take()` | 取出项目，集合为空时阻塞；若已完成添加则抛出异常 |
| `TryTake(out T item)` | 尝试取出项目，不阻塞 |
| `CompleteAdding()` | 标记不再添加新项目 |
| `IsCompleted` | 检查是否已完成添加且集合为空 |
| `GetConsumingEnumerable()` | 获取可消费的枚举器，支持 `foreach` |

### 最佳实践

1. **始终调用 CompleteAdding()**：确保消费者能够正确退出
2. **使用 GetConsumingEnumerable()**：代码更简洁，逻辑更清晰
3. **不要直接 foreach BlockingCollection**：必须使用 `GetConsumingEnumerable()`
4. **选择合适的底层集合**：根据需求选择 `ConcurrentQueue`（FIFO）、`ConcurrentStack`（LIFO）或 `ConcurrentBag`（无序）

### 异常处理

当调用 `Take()` 或 `GetConsumingEnumerable()` 时，如果集合为空且已调用 `CompleteAdding()`，会抛出 `InvalidOperationException`，异常消息为：

```
"The collection argument is empty and has been marked as complete with regard to additions."
```

正确处理方式是在使用 `Take()` 时捕获此异常，或使用 `GetConsumingEnumerable()` 让循环自然结束。