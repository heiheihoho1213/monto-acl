import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as md5 from 'md5';
import * as dayjs from 'dayjs';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const now = dayjs().unix();
    const user = this.userRepository.create({
      ...createUserDto,
      password: md5(createUserDto.password),
      createTime: now,
      updateTime: now,
    });
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByUsername(user: string, namespace: string): Promise<User> {
    return this.userRepository.findOne({ where: { user, namespace } });
  }

  async findByUserName(userName: string): Promise<User[]> {
    return this.userRepository.find({
      where: { name: Like(`%${userName}%`) },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const now = dayjs().unix();
    await this.userRepository.update(id, {
      ...updateUserDto,
      updateTime: now,
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const now = dayjs().unix();
    await this.userRepository.update(id, { deleteTime: now });
  }

  async login(payload: { id: number; user: string; namespace: string }) {
    const jwtToken = this.jwtService.sign(payload);
    return { jwtToken };
  }
}
