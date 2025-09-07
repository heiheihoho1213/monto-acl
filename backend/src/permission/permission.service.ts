import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';

import { RolePermission } from './entities/role-permission.entity';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(RolePermission)
    private rolePermissionRepository: Repository<RolePermission>,
  ) { }

  async create(createRolePermissionDto: CreateRolePermissionDto): Promise<RolePermission> {
    const now = dayjs().unix();
    const rolePermission = this.rolePermissionRepository.create({
      ...createRolePermissionDto,
      createTime: now,
      updateTime: now,
    });
    return this.rolePermissionRepository.save(rolePermission);
  }

  async findAll(): Promise<RolePermission[]> {
    return this.rolePermissionRepository.find();
  }

  async findOne(id: number): Promise<RolePermission> {
    return this.rolePermissionRepository.findOne({ where: { id } });
  }

  async update(id: number, updateRolePermissionDto: UpdateRolePermissionDto): Promise<RolePermission> {
    const now = dayjs().unix();
    await this.rolePermissionRepository.update(id, {
      ...updateRolePermissionDto,
      updateTime: now,
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const now = dayjs().unix();
    await this.rolePermissionRepository.update(id, { deleteTime: now });
  }
}
