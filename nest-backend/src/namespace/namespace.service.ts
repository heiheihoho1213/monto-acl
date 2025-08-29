import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';

import { Namespace } from './entities/namespace.entity';
import { CreateNamespaceDto } from './dto/create-namespace.dto';
import { UpdateNamespaceDto } from './dto/update-namespace.dto';

@Injectable()
export class NamespaceService {
  constructor(
    @InjectRepository(Namespace)
    private namespaceRepository: Repository<Namespace>,
  ) { }

  async create(createNamespaceDto: CreateNamespaceDto): Promise<Namespace> {
    const now = dayjs().unix();
    const namespace = this.namespaceRepository.create({
      ...createNamespaceDto,
      createTime: now,
      updateTime: now,
    });
    return this.namespaceRepository.save(namespace);
  }

  async findAll(): Promise<Namespace[]> {
    return this.namespaceRepository.find();
  }

  async findOne(id: number): Promise<Namespace> {
    return this.namespaceRepository.findOne({ where: { id } });
  }

  async update(id: number, updateNamespaceDto: UpdateNamespaceDto): Promise<Namespace> {
    const now = dayjs().unix();
    await this.namespaceRepository.update(id, {
      ...updateNamespaceDto,
      updateTime: now,
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const now = dayjs().unix();
    await this.namespaceRepository.update(id, { deleteTime: now });
  }
}
