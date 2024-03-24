import { Model, Column, DataType, Table, ForeignKey} from "sequelize-typescript";
import { User } from "./user";

@Table({tableName: 'note'})
export class Note extends Model{
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true})
    declare id: number

    @Column({type: DataType.STRING, allowNull: false})
    declare title: string

    @Column({type: DataType.TEXT, allowNull: false})
    declare content: string

    @Column({type: DataType.INTEGER, allowNull: false, unique: true})
    @ForeignKey(() => User)
    declare userId: number
}

