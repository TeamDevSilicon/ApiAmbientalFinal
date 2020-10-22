import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { DatoAmbiental } from "./DatoAmbiental";


@Entity()
export class TipoDatoAmbiental {

    public constructor(nombre: string) {
        this.nombre = nombre;
    }

    @PrimaryGeneratedColumn({ name: "id_tipoDatoAmbiental" })
    private id: number;

    @Column()
    private nombre: string;

    @OneToMany(type => DatoAmbiental, datoAmbiental => datoAmbiental.$tipoDato)
    private datosAmbientales: DatoAmbiental[];


    /**
     * Getter $id
     * @return {number}
     */
    public get $id(): number {
        return this.id;
    }

    /**
     * Getter $nombre
     * @return {string}
     */
    public get $nombre(): string {
        return this.nombre;
    }

    /**
     * Getter $datosAmbientales
     * @return {DatoAmbiental[]}
     */
    public get $datosAmbientales(): DatoAmbiental[] {
        return this.datosAmbientales;
    }

    /**
     * Setter $id
     * @param {number} value
     */
    public set $id(value: number) {
        this.id = value;
    }

    /**
     * Setter $nombre
     * @param {string} value
     */
    public set $nombre(value: string) {
        this.nombre = value;
    }

    /**
     * Setter $datosAmbientales
     * @param {DatoAmbiental[]} value
     */
    public set $datosAmbientales(value: DatoAmbiental[]) {
        this.datosAmbientales = value;
    }


}