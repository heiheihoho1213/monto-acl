import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('t_user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'o_id', type: 'int', nullable: true, unique: true, comment: 'oa那边的Id, 负数代表虚拟用户' })
  oId: number;

  @Index()
  @Column({ type: 'varchar', length: 128, nullable: false, comment: '项目名称' })
  namespace: string;

  @Index()
  @Column({ type: 'varchar', length: 255, nullable: false, comment: '用户英文名' })
  user: string;

  @Column({ type: 'varchar', length: 255, nullable: false, comment: '用户中文名' })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: '', comment: '职位名称' })
  job: string;

  @Column({ type: 'varchar', length: 255, nullable: false, default: '', comment: '密码' })
  password: string;

  @Column({ name: 'phone_number', type: 'varchar', length: 255, nullable: true, default: '', comment: '手机号码' })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: '', comment: '邮箱' })
  email: string;

  @Column({ name: 'create_time', type: 'int', unsigned: true, nullable: false, default: 0, comment: '创建时间' })
  createTime: number;

  @Column({ name: 'update_time', type: 'int', unsigned: true, nullable: false, default: 0, comment: '更新时间' })
  updateTime: number;

  @Column({ name: 'delete_time', type: 'int', unsigned: true, nullable: true, default: 0, comment: '删除时间' })
  deleteTime: number;
}
