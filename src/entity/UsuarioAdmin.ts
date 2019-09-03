import { PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Entity } from "typeorm";
import { Usuario } from "./Usuario";

@Entity()
export class UsuarioAdmin extends Usuario {
    // public constructor(usuario: string, clave: string) {
    //     this.usuario = usuario;
    //     this.clave = clave;
    // }

    // @PrimaryGeneratedColumn({ name: "id_usuario" })
    // private id: number;

    // @Column()
    // private usuario: string;

    // @Column()
    // private clave: string;


}