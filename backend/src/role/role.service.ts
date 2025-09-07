import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';

import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) { }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const now = dayjs().unix();
    const role = this.roleRepository.create({
      ...createRoleDto,
      createTime: now,
      updateTime: now,
    });
    return this.roleRepository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findOne(id: number): Promise<Role> {
    return this.roleRepository.findOne({ where: { id } });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const now = dayjs().unix();
    await this.roleRepository.update(id, {
      ...updateRoleDto,
      updateTime: now,
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const now = dayjs().unix();
    await this.roleRepository.update(id, { deleteTime: now });
  }
}
