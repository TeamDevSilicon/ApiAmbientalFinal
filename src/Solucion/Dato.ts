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

}