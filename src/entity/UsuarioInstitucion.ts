import { PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Entity, OneToOne, JoinColumn } from "typeorm";
import { Usuario } from "./Usuario";
import { Institucion } from "./Institucion";

@Entity()
export class UsuarioInstitucion extends Usuario {

    @OneToOne(type => Institucion, {
        cascade: true,
    })
    @JoinColumn({ name: "id_institucion" })
    institucion: Institucion;

}