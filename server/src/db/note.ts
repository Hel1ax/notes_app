import { Model, Column, DataType, Table, ForeignKey} from "sequelize-typescript";
import { User } from "./user";

interface noteCreationAttrs {
    title: string,
    content: string,
    userId: number
}

@Table({tableName: 'note'})
export class Note extends Model<Note, noteCreationAttrs>{
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true})
    declare id: number

    @Column({type: DataType.STRING, allowNull: false})
    declare title: string

    @Column({type: DataType.TEXT, allowNull: false})
    declare content: string

    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => User)
    declare userId: number
}

