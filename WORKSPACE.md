# ACL Pro - PNPM Workspace 使用指南

这是一个使用 pnpm workspace 统一管理的前后端项目。

## 项目结构

```
acl-pro/
├── backend/          # 后端服务 (Node.js + Express + TypeScript)
├── monto-acl-be/     # NestJS 后端服务 (重构版本)
├── frontend/         # 前端应用 (React + TypeScript + Vite)
├── mysql/            # MySQL 数据库配置
├── package.json      # 根目录配置
└── pnpm-workspace.yaml # pnpm workspace 配置
```

## 环境要求

- Node.js >= 14.18.0
- pnpm >= 7.0.0

## 安装依赖

```bash
# 安装所有依赖（包括前后端）
pnpm install

# 或者使用根目录脚本
pnpm run install:all
```

## 开发命令

### 同时启动前后端
```bash
pnpm dev
```

### 分别启动
```bash
# 启动后端 (Express)
pnpm dev:backend

# 启动 NestJS 后端
pnpm dev:nest

# 启动前端
pnpm dev:frontend
```

### 构建项目
```bash
# 构建所有项目
pnpm build

# 构建后端 (Express)
pnpm build:backend

# 构建 NestJS 后端
pnpm build:nest

# 构建前端
pnpm build:frontend
```

### 代码质量
```bash
# 代码检查
pnpm lint

# 代码格式化
pnpm format

# 清理构建文件
pnpm clean
```

### Docker 相关
```bash
# 启动所有服务
pnpm docker:up

# 启动 MySQL
pnpm docker:mysql

# 停止服务
pnpm docker:down
```

## 常用 pnpm 命令

```bash
# 在特定包中运行命令
pnpm --filter monto-acl-be dev
pnpm --filter monto-acl-be start:dev
pnpm --filter monto-acl-fe dev

# 在所有包中运行命令
pnpm run --recursive build

# 并行运行命令
pnpm run --parallel dev

# 添加依赖到特定包
pnpm --filter monto-acl-be add express
pnpm --filter monto-acl-be add @nestjs/common
pnpm --filter monto-acl-fe add react

# 添加开发依赖
pnpm --filter monto-acl-be add -D @types/express
pnpm --filter monto-acl-be add -D @nestjs/cli
```

## 项目配置

### 后端 (backend/)
- 端口: 3000 (默认)
- 数据库: MySQL
- 框架: Express + TypeScript
- 构建工具: SWC

### NestJS 后端 (monto-acl-be/)
- 端口: 3000 (默认)
- 数据库: MySQL
- 框架: NestJS + TypeScript
- ORM: TypeORM
- 认证: JWT + Passport
- API 文档: Swagger

### 前端 (frontend/)
- 端口: 5173 (默认)
- 框架: React + TypeScript
- UI 库: Ant Design
- 构建工具: Vite
- 状态管理: MobX

## 注意事项

1. 确保使用 pnpm 而不是 npm 或 yarn
2. 前端已经配置了 `only-allow pnpm` 来强制使用 pnpm
3. 所有依赖都会安装在各自的包目录中
4. 使用 workspace 可以共享依赖，减少重复安装

## 故障排除

如果遇到问题，可以尝试：

```bash
# 清理所有 node_modules
pnpm run clean:node_modules

# 重新安装依赖
pnpm install

# 清理 pnpm 缓存
pnpm store prune
```
