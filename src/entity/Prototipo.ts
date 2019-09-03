import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { DatoAmbiental } from "./DatoAmbiental";

@Entity()
export class Prototipo {

    public constructor(descripcion: string) {
        this.descripcion = descripcion;
    }

    @PrimaryGeneratedColumn({ name: "id_prototipo" })
    private id: number;

    @Column()
    private descripcion: string;

    @OneToMany(type => DatoAmbiental, datoAmbiental => datoAmbiental.$prototipo)
    datosAmbientales: DatoAmbiental[];

}