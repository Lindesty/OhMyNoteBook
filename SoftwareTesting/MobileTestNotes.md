# 移动测试

## UI 自动化分类与常见框架

### Web 自动化

- Selenium
- Playwright（H5 场景也常用）

### App 自动化

- Appium（跨平台主流方案）
- Android 原生：Espresso、UI Automator2
- iOS 原生：XCUITest

### 桌面 GUI 自动化

- Windows：WinAppDriver、pywinauto
- macOS：AppleScript、XCUITest（部分场景）

### 小程序自动化

- 本质是 App 容器 + WebView，通常结合 App 自动化和 Web 自动化能力

### 其他终端

- 智能设备、车机、工业 App、机器人控制端等

## 常见框架来源与生态

- Google：Espresso、UI Automator
- Facebook（Meta）：WebDriverAgent（iOS 生态关键组件）
- Sauce Labs：Appium 生态的重要推动者
- Alibaba：Macaca（历史方案）
- 其他历史方案：Selendroid、Robotium（多数场景已不建议新项目采用）

## Appium

### 设计理念

- 遵循 WebDriver 协议，统一自动化接口
- 通过驱动适配不同平台，降低测试代码的平台耦合
- 尽量使用黑盒方式接近真实用户行为

### 架构速览

- Client：Java、Python、JavaScript、Ruby 等语言客户端
- Server：接收 WebDriver 命令并路由到对应驱动
- Driver：如 UiAutomator2、Espresso、XCUITest
- Device/Simulator：真机或模拟器执行具体操作

### 官方地址

- https://appium.io/
- https://github.com/appium

### 主要特点

- 跨语言
- 跨平台
- 可切换驱动
- 生态成熟，工具链丰富

### Android 与 iOS 常见驱动

- Android
  - UiAutomator2：当前主流，兼顾稳定性与兼容性
  - Espresso：更贴近应用内部，执行效率高
  - Selendroid：历史方案，不建议新项目使用
- iOS
  - XCUITest：官方主流驱动方案

### 常见配套工具

- adb：Android 调试桥，设备管理与调试核心工具
- Appium Inspector：元素查看、定位验证
- 各语言 Appium Client：连接并操作 Appium Server
- AppCrawler：自动遍历与探索式测试

### Appium 常见能力

- 元素定位与交互
- 手势操作（点击、滑动、长按等）
- 会话管理（创建、复用、结束）
- 日志与截图采集
- 与云真机平台集成

## 自动化测试策略

### 定义

- 使用工具自动执行测试任务，以更高频率验证功能正确性并尽早发现缺陷

### 价值

- 提升回归效率
- 缩短发布反馈周期
- 提升多设备与多系统版本覆盖率
- 降低重复性人工测试成本

### 推荐分层策略

- 单元测试：覆盖核心业务逻辑，数量应最多
- 接口/集成测试：验证模块协作与边界条件
- UI 自动化：覆盖关键用户路径，不追求“全量 UI 自动化”
- 自动遍历：补足基础回归与异常探索
- 人工测试：关注体验、探索性测试与复杂业务判断

## Android 调试与测试命令

### adb

- 全称：Android Debug Bridge

### 常用命令

- adb devices
  - 查看已连接设备
- adb kill-server
  - 关闭 adb 后台服务
- adb start-server
  - 启动 adb 后台服务
- adb tcpip 5555
  - 切换设备到 TCP 模式（需先 USB 连接）
- adb connect <ip>:5555
  - 通过网络连接设备
- adb logcat
  - 查看系统与应用日志
- adb bugreport
  - 导出完整诊断信息

### adb shell

- adb shell 是设备上的命令行环境，可调用 Android 内置命令

### 常用子命令

- dumpsys
  - 导出系统服务状态
  - adb shell dumpsys window | grep mCurrentFocus
  - 用于查看当前前台窗口
- pm
  - adb install <apk_path>
  - 安装应用
  - adb shell pm clear <package>
  - 清除应用数据
- am
  - Activity Manager 工具
  - adb shell am start -n <package>/<activity> -S
  - 启动指定 Activity 并强制停止旧进程
- ps
  - 查看进程列表
- monkey
  - 进行稳定性与兼容性随机事件测试
- uiautomator
  - adb shell uiautomator dump && adb pull /sdcard/window_dump.xml
  - 导出当前界面 XML 供定位分析
- input
  - 模拟输入事件，如点击、滑动、按键

## 实践建议

- 优先保证可维护性，不盲目追求自动化覆盖率
- 定位策略优先使用稳定属性（id、accessibility id）
- 用例分层管理：冒烟、回归、全量
- 每次失败都保留日志、截图、录屏，便于快速复盘

