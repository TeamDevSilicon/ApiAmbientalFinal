import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn, ViewEntity } from "typeorm";
import { DatoAmbientalVista } from "./DatoAmbientalVista";
import { Prototipo } from "./Prototipo";

@Entity({ name: "datosPorFecha" })
export class DatoPorFechaVista {

    @PrimaryGeneratedColumn({ name: "fecha" })
    fecha: Date;

    @ManyToOne(type => Prototipo, prototipo => prototipo.datosPorFecha, { cascade: true })
    @JoinColumn({ name: "prototipoId" })
    prototipo: Prototipo;


    @ManyToOne(type => DatoAmbientalVista, datosAmbientales => datosAmbientales.datosPorFecha/* , { cascade: true } */)
    //@JoinColumn({ name: "prototipoId", referencedColumnName: "prototipoId" })
    @JoinColumn({ name: "fecha", referencedColumnName: "fecha" })
    datosAmbientales: DatoAmbientalVista;

}