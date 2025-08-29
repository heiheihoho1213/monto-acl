import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('t_namespace')
export class Namespace {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: 'varchar', length: 128, nullable: false, unique: true, comment: '项目名称' })
  namespace: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: '', comment: '项目描述' })
  description: string;

  @Column({ name: 'create_time', type: 'int', unsigned: true, nullable: false, default: 0, comment: '创建时间' })
  createTime: number;

  @Column({ name: 'update_time', type: 'int', unsigned: true, nullable: false, default: 0, comment: '更新时间' })
  updateTime: number;

  @Column({ name: 'delete_time', type: 'int', unsigned: true, nullable: true, default: 0, comment: '删除时间' })
  deleteTime: number;
}
