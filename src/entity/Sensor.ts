import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { DatoAmbiental } from "./DatoAmbiental";


@Entity()
export class Sensor {

    public constructor(nombre: string) {
        this.nombre = nombre;
    }

    @PrimaryGeneratedColumn({ name: "id_sensor" })
    private id: number;

    @Column()
    private nombre: string;

    @OneToMany(type => DatoAmbiental, datoAmbiental => datoAmbiental.$sensor)
    datosAmbientales: DatoAmbiental[];

}