import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DatoAmbiental } from "../entity/DatoAmbiental";

export class Dato {

    fecha: Date;
    temperaturaAmbiente: number;
    humedadAmbiente: number
    humedadSuelo: number
    luz: number
    lluvia: number
    viento: number
    precipitaciones: number


    // public constructor(nombre: string) {
    //     this.nombre = nombre;
    // }

    // @PrimaryGeneratedColumn({ name: "id_prototipo" })
    // private id: number;

    // @Column()
    // private nombre: string;

    // @OneToMany(type => DatoAmbiental, datoAmbiental => datoAmbiental.prototipo)
    // datosAmbientales: DatoAmbiental[];

}