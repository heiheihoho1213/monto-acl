# ACL 权限管理系统 - NestJS 后端

这是一个使用 NestJS 框架重构的 ACL 权限管理系统后端。

## 技术栈

- **框架**: NestJS 10.x
- **数据库**: MySQL + TypeORM
- **认证**: JWT + Passport
- **API 文档**: Swagger/OpenAPI
- **验证**: class-validator + class-transformer
- **语言**: TypeScript

## 项目结构

```
src/
├── auth/                 # 认证模块
│   ├── dto/             # 数据传输对象
│   ├── entities/         # 实体
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── jwt.strategy.ts
│   └── jwt-auth.guard.ts
├── user/                 # 用户模块
│   ├── dto/
│   ├── entities/
│   ├── user.controller.ts
│   ├── user.service.ts
│   └── user.module.ts
├── role/                 # 角色模块
├── resource/             # 资源模块
├── namespace/            # 命名空间模块
├── permission/           # 权限模块
├── app.controller.ts     # 应用控制器
├── app.service.ts        # 应用服务
├── app.module.ts         # 应用模块
└── main.ts              # 应用入口
```

## 安装和运行

### 1. 安装依赖

```bash
pnpm install
```

### 2. 环境配置

复制 `env.example` 为 `.env` 并配置数据库连接信息：

```bash
cp env.example .env
```

### 3. 启动开发服务器

```bash
pnpm run start:dev
```

### 4. 构建生产版本

```bash
pnpm run build
pnpm run start:prod
```

## API 文档

启动服务后，访问 `http://localhost:3000/api-docs` 查看 Swagger API 文档。

## 主要功能

- **用户管理**: 用户的增删改查
- **角色管理**: 角色的增删改查
- **资源管理**: 资源的增删改查
- **权限管理**: 角色权限的分配和管理
- **命名空间**: 多项目支持
- **JWT 认证**: 安全的用户认证

## 数据库表结构

- `t_user`: 用户表
- `t_role`: 角色表
- `t_resource`: 资源表
- `t_namespace`: 命名空间表
- `t_role_permission`: 角色权限关联表
- `t_user_role`: 用户角色关联表

## 开发命令

```bash
# 开发模式
pnpm run start:dev

# 构建
pnpm run build

# 生产模式
pnpm run start:prod

# 代码检查
pnpm run lint

# 代码格式化
pnpm run format

# 测试
pnpm run test

# 测试覆盖率
pnpm run test:cov
```

## 注意事项

1. 确保 MySQL 数据库已启动并创建了相应的数据库
2. 配置正确的数据库连接信息
3. 设置安全的 JWT 密钥
4. 在生产环境中禁用数据库同步功能
