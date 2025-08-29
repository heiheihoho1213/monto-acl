import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('t_user_role')
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: 'varchar', length: 128, nullable: false, comment: '项目名称' })
  namespace: string;

  @Index()
  @Column({ type: 'varchar', length: 255, nullable: false, comment: '用户名称' })
  user: string;

  @Index()
  @Column({ type: 'varchar', length: 255, nullable: false, comment: '角色名称' })
  role: string;

  @Column({ name: 'create_time', type: 'int', unsigned: true, nullable: false, default: 0, comment: '创建时间' })
  createTime: number;

  @Column({ name: 'update_time', type: 'int', unsigned: true, nullable: false, default: 0, comment: '更新时间' })
  updateTime: number;

  @Column({ name: 'delete_time', type: 'int', unsigned: true, nullable: true, default: 0, comment: '删除时间' })
  deleteTime: number;
}
