import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';

import { Resource } from './entities/resource.entity';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
  ) { }

  async create(createResourceDto: CreateResourceDto): Promise<Resource> {
    const now = dayjs().unix();
    const resource = this.resourceRepository.create({
      ...createResourceDto,
      createTime: now,
      updateTime: now,
    });
    return this.resourceRepository.save(resource);
  }

  async findAll(): Promise<Resource[]> {
    return this.resourceRepository.find();
  }

  async findOne(id: number): Promise<Resource> {
    return this.resourceRepository.findOne({ where: { id } });
  }

  async update(id: number, updateResourceDto: UpdateResourceDto): Promise<Resource> {
    const now = dayjs().unix();
    await this.resourceRepository.update(id, {
      ...updateResourceDto,
      updateTime: now,
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const now = dayjs().unix();
    await this.resourceRepository.update(id, { deleteTime: now });
  }
}
