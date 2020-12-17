import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { InstitucionDato } from "../Solucion/InstitucionDato";
import { DatoAmbiental } from "./DatoAmbiental";
import { Institucion } from "./Institucion";
import { Localidad } from "./Localidad";
import { Provincia } from "./Provincia";

@Entity({ name: "departamento" })
export class Departamento {


    @PrimaryGeneratedColumn({ name: "Id_Departamento" })
    id: number;

    @Column({ name: "Nombre" })
    nombre: string;

    @ManyToOne(type => Provincia, provincia => provincia.departamentos, { cascade: true })
    @JoinColumn({ name: "Id_Provincia" })
    provincia: Provincia;

    @OneToMany(type => Localidad, localidad => localidad.departamento)
    localidades: Localidad[];

    @OneToMany(type => Institucion, institucion => institucion.departamento)
    instituciones: Institucion[];

}