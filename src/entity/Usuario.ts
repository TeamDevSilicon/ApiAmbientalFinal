import { PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Entity } from "typeorm";

// @Entity()
export abstract class Usuario {

    public constructor(usuario: string, clave: string) {
        this.usuario = usuario;
        this.clave = clave;
    }

    @PrimaryGeneratedColumn({ name: "id_usuario" })
    private id: number;

    @Column()
    private usuario: string;

    @Column()
    private clave: string;

}