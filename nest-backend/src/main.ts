import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局前缀
  app.setGlobalPrefix('v1');

  // 全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 全局响应拦截器
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new LoggingInterceptor(),
  );

  // 全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: 422,
    }),
  );

  // CORS 配置
  app.enableCors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
  });

  // Swagger 配置
  const config = new DocumentBuilder()
    .setTitle('ACL API 文档')
    .setDescription(
      `
      ## ACL权限管理系统 API 文档
      
      ### 功能特性
      - 用户管理：用户的增删改查
      - 角色管理：角色的增删改查
      - 资源管理：资源的增删改查
      - 权限管理：角色权限的分配和管理
      - 命名空间：多项目支持
      - JWT 认证：安全的用户认证
      
      ### 认证方式
      使用 Bearer Token 进行认证，在请求头中添加：
      \`\`\`
      Authorization: Bearer <your-jwt-token>
      \`\`\`
      
      ### 响应格式
      所有 API 响应都遵循统一的格式：
      \`\`\`json
      {
        "success": true,
        "code": 200,
        "message": "Success",
        "data": {...},
        "timestamp": "2024-01-01T00:00:00.000Z"
      }
      \`\`\`
    `,
    )
    .setVersion('1.0.0')
    .setContact(
      'ACL Team',
      'https://github.com/your-repo',
      'your-email@example.com',
    )
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addServer('http://localhost:3000', '本地开发环境')
    .addServer('https://api.yourdomain.com', '生产环境')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: '输入 JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for references
    )
    .addTag('认证', '用户登录、注册、认证相关接口')
    .addTag('用户管理', '用户的增删改查操作')
    .addTag('角色管理', '角色的增删改查操作')
    .addTag('资源管理', '资源的增删改查操作')
    .addTag('命名空间', '命名空间的增删改查操作')
    .addTag('权限管理', '角色权限的分配和管理')
    .addTag('应用', '应用健康检查等基础接口')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    extraModels: [],
  });

  // 配置 Swagger UI 选项
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // 保持认证状态
      displayRequestDuration: true, // 显示请求耗时
      filter: true, // 启用搜索过滤
      showExtensions: true, // 显示扩展信息
      showCommonExtensions: true, // 显示通用扩展
      docExpansion: 'list', // 文档展开方式：none, list, full
      defaultModelsExpandDepth: 1, // 默认模型展开深度
      defaultModelExpandDepth: 1, // 默认模型属性展开深度
      displayOperationId: false, // 不显示操作ID
      tryItOutEnabled: true, // 启用"试试看"功能
    },
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { color: #3b82f6; font-size: 36px; }
      .swagger-ui .info .description { font-size: 14px; line-height: 1.6; }
      .swagger-ui .scheme-container { background: #f8fafc; padding: 20px; border-radius: 8px; }
    `,
    customSiteTitle: 'ACL API 文档',
    customfavIcon: '/favicon.ico',
  });

  // 启动应用
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger documentation: http://localhost:${port}/api-docs`);
  console.log(`🔐 API Base URL: http://localhost:${port}/v1`);
}

bootstrap();
