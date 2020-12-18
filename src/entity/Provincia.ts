import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { DatoAmbiental } from "./DatoAmbiental";
import { Departamento } from "./Departamento";
import { Pais } from "./Pais";

@Entity({ name: "provincias" })
export class Provincia {

    @PrimaryGeneratedColumn({ name: "Id_Provincia" })
    id: number;

    @Column({ name: "Nombre" })
    nombre: string;

    @ManyToOne(type => Pais, pais => pais.provincias, { cascade: true })
    @JoinColumn({ name: "Id_Pais" })
    pais: Pais;

    @OneToMany(type => Departamento, departamento => departamento.provincia)
    departamentos: Departamento[];

}