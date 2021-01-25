import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { DatoAmbiental } from "./DatoAmbiental";
import { DatoPorFechaVista } from "./DatoPorFechaVista";
import { Institucion } from "./Institucion";

@Entity()
export class Prototipo {

    public constructor(nombre: string) {
        this.nombre = nombre;
    }

    @PrimaryGeneratedColumn({ name: "id_prototipo" })
    id: number;

    @Column()
    nombre: string;

    @Column()
    longitud: string;

    @Column()
    latitud: string;

    @OneToMany(type => DatoAmbiental, datoAmbiental => datoAmbiental.prototipo)
    datosAmbientales: DatoAmbiental[];

    // @OneToMany(type => DatoPorFechaVista, datosPorFecha => datosPorFecha.prototipo)
    // datosPorFecha: DatoPorFechaVista[];

    @ManyToOne(type => Institucion /* => departamento.id, { cascade: true } */)
    @JoinColumn({ name: "institucionId" })
    institucion: Institucion;

}