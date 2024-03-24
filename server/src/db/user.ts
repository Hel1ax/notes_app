import {Model, Table, Column, DataType, HasMany} from 'sequelize-typescript'
import {Note} from './note'

interface userCreationAttrs {
    name: string,
    email: string,
    password: string
}
@Table({tableName: 'user'})
export class User extends Model<User, userCreationAttrs> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true})
    declare id: number

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    declare name: string

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    declare email: string

    @Column({type: DataType.STRING, allowNull: false})
    declare password: string

    @HasMany(() => Note)
    declare notes: Note[]
}