import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DatoAmbiental } from "../entity/DatoAmbiental";
import { Dato } from "./Dato";

export class InstitucionDato {

    fecha: Date;
    datosAmbientales: Dato[];

}