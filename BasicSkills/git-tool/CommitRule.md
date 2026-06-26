# .NET 项目 Conventional Commits 规范

## 1. 提交信息格式

每条 commit 必须遵循：

```
<type>(<scope>): <subject>

<body>

<footer>
```

最常用形式：

```txt
feat(api): add user login endpoint
fix(db): fix migration error for user table
refactor(service): simplify order validation logic
```

## 2. type 类型

| type       | 含义                           | 是否影响版本  |
| ---------- | ---------------------------- | ------- |
| `feat`     | 新功能                          | minor   |
| `fix`      | 修复 bug                       | patch   |
| `docs`     | 文档修改                         | 不影响     |
| `style`    | 代码格式、空格、命名微调，不影响逻辑           | 不影响     |
| `refactor` | 重构，不新增功能、不修 bug              | 不影响     |
| `perf`     | 性能优化                         | patch   |
| `test`     | 添加或修改测试                      | 不影响     |
| `build`    | 构建系统、MSBuild、csproj、NuGet 配置 | 不影响     |
| `ci`       | CI/CD 配置                     | 不影响     |
| `chore`    | 杂项维护                         | 不影响     |
| `revert`   | 回滚提交                         | 按回滚内容判断 |

## 3. .NET 推荐 scope

scope 用于说明影响范围，建议使用模块名、项目名或技术层。

### 通用分层

```txt
api
app
domain
service
repository
db
migration
config
auth
logging
cache
validation
serialization
```

### .NET 项目相关

```txt
csproj
nuget
msbuild
aot
trim
efcore
linq
aspnetcore
middleware
minimal-api
mvc
signalr
grpc
worker
blazor
wpf
avalonia
maui
winforms
```

### 测试相关

```txt
unit-test
integration-test
benchmark
test-fixture
mock
```

示例：

```txt
fix(efcore): correct cascade delete behavior
build(csproj): enable nullable reference types
perf(linq): reduce allocations in order query
feat(avalonia): add file drag and drop behavior
```

## 4. subject 规则

subject 是提交标题，必须简短清晰。

推荐规则：

```txt
- 使用英文小写开头
- 使用祈使句
- 不以句号结尾
- 长度建议不超过 72 个字符
```

推荐：

```txt
fix(api): return 404 when user is not found
feat(auth): add jwt refresh token support
```

不推荐：

```txt
fix(api): fixed a bug.
feat(auth): Added JWT Refresh Token Support.
```

## 5. body 规则

body 用于解释“为什么改”和“改了什么”。

适合以下情况使用：

```txt
- 修改逻辑较复杂
- 修复了隐藏 bug
- 有兼容性影响
- 涉及性能、安全、数据库结构
```

示例：

```txt
fix(db): prevent duplicate order creation

Add a unique index for OrderNo and update the repository logic to
handle duplicate insert exceptions.
```

## 6. footer 规则

footer 用于关联 Issue、PR、破坏性变更等。

示例：

```txt
Refs: #123
Closes: #456
```

## 7. Breaking Change

如果提交包含不兼容变更，必须使用以下任一方式。

方式一：

```txt
feat(api)!: change user response format
```

方式二：

```txt
feat(api): change user response format

BREAKING CHANGE: UserDto.Name was renamed to UserDto.DisplayName.
```

常见 .NET Breaking Change：

```txt
- 修改 public API
- 删除 public class/interface/method/property
- 修改 DTO 字段名
- 修改数据库字段含义
- 修改配置项名称
- 修改 NuGet 包对外行为
- 修改接口返回结构
```

## 8. 版本号映射

遵循 SemVer：

```txt
fix      -> patch，例如 1.2.3 -> 1.2.4
feat     -> minor，例如 1.2.3 -> 1.3.0
BREAKING -> major，例如 1.2.3 -> 2.0.0
```

## 9. 常见提交示例

### 新功能

```txt
feat(api): add endpoint for creating orders
feat(auth): support refresh token rotation
feat(avalonia): add image preview panel
```

### 修复 bug

```txt
fix(service): handle null customer address
fix(efcore): fix migration script for sqlite
fix(aot): replace reflection-based json serialization
```

### 重构

```txt
refactor(domain): extract order status transition logic
refactor(repository): simplify query specification handling
```

### 性能优化

```txt
perf(linq): reduce allocations in product search
perf(cache): add memory cache for user permissions
```

### 构建相关

```txt
build(csproj): enable native aot publishing
build(nuget): update Microsoft.Extensions packages
build(msbuild): add publish profile for win-x64
```

### CI/CD

```txt
ci(github): add dotnet test workflow
ci(gitlab): cache nuget packages
```

### 文档

```txt
docs(readme): add local development guide
docs(api): document authentication errors
```

### 测试

```txt
test(service): add tests for order validation
test(api): add integration tests for login endpoint
```

### 杂项

```txt
chore(editorconfig): update formatting rules
chore(solution): remove unused project reference
```

## 10. 不推荐的提交

不推荐：

```txt
update code
fix bug
修改了一些东西
优化
wip
临时提交
```

推荐替换为：

```txt
fix(order): correct total price calculation
refactor(service): simplify user creation flow
perf(query): optimize product search
```

## 11. 分支合并建议

普通开发提交应遵循 Conventional Commits。

合并提交可以使用：

```txt
merge: merge feature/order-api into main
```

或保持平台默认合并信息。

Squash Merge 时，最终 squash commit 必须符合规范。

## 12. Pull Request 标题规则

如果团队使用 Squash Merge，PR 标题也应遵循 Conventional Commits。

示例：

```txt
feat(order): add order creation api
fix(auth): prevent expired token reuse
build(aot): support native aot publish
```

## 13. 推荐 commitlint 配置

`.commitlintrc.json`

```json
{
  "extends": ["@commitlint/config-conventional"],
  "rules": {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert"
      ]
    ],
    "scope-case": [2, "always", "lower-case"],
    "subject-case": [0],
    "subject-full-stop": [2, "never", "."],
    "header-max-length": [2, "always", 100]
  }
}
```

## 14. 推荐团队约定

建议团队统一采用：

```txt
type 使用英文
scope 使用英文小写 kebab-case
subject 使用英文
body 可以使用中文或英文
footer 使用英文关键词
```

例如：

```txt
feat(native-aot): add source-generated json context

为 Native AOT 场景添加 System.Text.Json source generator，
避免运行时反射导致发布失败。
```

## 15. 最终推荐模板

```txt
<type>(<scope>): <subject>

<why>

<what changed>

<footer>
```

示例：

```txt
fix(aot): replace reflection-based json serialization

System.Text.Json reflection serialization is not suitable for Native AOT.

Add JsonSerializerContext and update serialization calls to use generated
metadata.

Closes: #42
```
