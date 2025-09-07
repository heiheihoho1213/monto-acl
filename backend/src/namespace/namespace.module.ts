import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NamespaceController } from './namespace.controller';
import { NamespaceService } from './namespace.service';
import { Namespace } from './entities/namespace.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Namespace])],
  controllers: [NamespaceController],
  providers: [NamespaceService],
  exports: [NamespaceService],
})
export class NamespaceModule { }
