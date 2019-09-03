import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from "typeorm";
import { DatoAmbiental } from "./DatoAmbiental";

// @Entity()
export class ValorDatoAmbiental {

    @PrimaryGeneratedColumn({ name: "id_valorDatoAmbiental" })
    private id: number;

    @Column()
    private valor: number;

    // @ManyToOne(type => DatoAmbiental, datoAmbiental => datoAmbiental.valores)
    // datoAmbiental: DatoAmbiental;

}