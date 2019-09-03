import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { DatoAmbiental } from "./DatoAmbiental";


@Entity()
export class Sensor {

    public constructor(descripcion: string) {
        this.descripcion = descripcion;
    }

    @PrimaryGeneratedColumn({ name: "id_sensor" })
    private id: number;

    @Column()
    private descripcion: string;

    @OneToMany(type => DatoAmbiental, datoAmbiental => datoAmbiental.$sensor)
    datosAmbientales: DatoAmbiental[];

}