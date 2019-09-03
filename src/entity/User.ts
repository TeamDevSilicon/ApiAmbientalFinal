import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from "typeorm";


@Entity()
export class User {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;


    @Column("varchar", {
        nullable: false,
        name: "firstName"
    })
    firstName: string;


    @Column("varchar", {
        nullable: false,
        name: "lastName"
    })
    lastName: string;


    @Column("int", {
        nullable: false,
        name: "age"
    })
    age: number;

}
