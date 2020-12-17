import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { DatoAmbiental } from "./DatoAmbiental";
import { Provincia } from "./Provincia";

@Entity({ name: "paises" })
export class Pais {

    @PrimaryGeneratedColumn({ name: "Id_Pais" })
    id: number;

    @Column({ name: "Nombre" })
    nombre: string;

    @OneToMany(type => Provincia, provincia => provincia.pais)
    provincias: Provincia[];

}