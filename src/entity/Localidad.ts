import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DatoAmbiental } from "./DatoAmbiental";
import { Departamento } from "./Departamento";
import { Institucion } from "./Institucion";
import { Provincia } from "./Provincia";

@Entity({ name: "localidades" })
export class Localidad {


    @PrimaryGeneratedColumn({ name: "Id_Localidad" })
    id: number;

    @Column({ name: "Nombre" })
    nombre: string;

    @ManyToOne(type => Departamento, departamento => departamento.localidades, { cascade: true })
    @JoinColumn({ name: "Id_Departamento" })
    departamento: Departamento;

    @OneToMany(type => Institucion, institucion => institucion.localidad)
    instituciones: Institucion[];
}