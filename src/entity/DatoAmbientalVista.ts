import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, ViewEntity } from "typeorm";
import { DatoPorFechaVista } from "./DatoPorFechaVista";
import { Prototipo } from "./Prototipo";

@Entity({ name: "datosAmbientales" })
export class DatoAmbientalVista {

    @PrimaryColumn({
        select: false,
        name: "fecha"
    })
    fecha: Date;

    @Column("int", { name: "Temperatura ambiente" })
    temperaturaAmbiente: number;

    @Column({ name: "Humedad ambiente" })
    humedadAmbiente: number;

    @Column({ name: "Humedad suelo" })
    humedadSuelo: number;

    @Column({ name: "Luz" })
    luz: number;

    @Column({ name: "Lluvia" })
    lluvia: number;

    @Column({ name: "Viento" })
    viento: number;

    @Column({ name: "Precipitaciones" })
    precipitaciones: number;

    @Column({ name: "Direccion viento" })
    direccionViento: number;

    @ManyToOne(type => Prototipo, prototipo => prototipo.datosPorFecha, { cascade: true })
    @JoinColumn({ name: "prototipoId" })
    prototipo: Prototipo;

    @ManyToOne(type => DatoPorFechaVista, datosPorFecha => datosPorFecha.datosAmbientales, { cascade: true })
    @JoinColumn({ name: "fecha" })
    //@JoinColumn({ name: "fecha" })
    datosPorFecha: DatoPorFechaVista;


}