import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { DatoAmbiental } from "./DatoAmbiental";

@Entity()
export class Prototipo {

    public constructor(nombre: string) {
        this.nombre = nombre;
    }

    @PrimaryGeneratedColumn({ name: "id_prototipo" })
    id: number;

    @Column()
    nombre: string;

    @OneToMany(type => DatoAmbiental, datoAmbiental => datoAmbiental.prototipo)
    datosAmbientales: DatoAmbiental[];

}