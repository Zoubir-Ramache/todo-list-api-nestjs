import { Column, Table, Model } from 'sequelize-typescript';

@Table({
    tableName:"todos"
})
export class Todo extends Model{
    @Column
    title:string 

    @Column 
    content:string 


    
}