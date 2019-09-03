import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { DatoAmbiental } from "./DatoAmbiental";


@Entity()
export class TipoDatoAmbiental {

    public constructor(descripcion: string) {
        this.descripcion = descripcion;
    }

    @PrimaryGeneratedColumn({ name: "id_tipoDatoAmbiental" })
    private id: number;

    @Column()
    private descripcion: string;

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
     * Getter $descripcion
     * @return {string}
     */
    public get $descripcion(): string {
        return this.descripcion;
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
     * Setter $descripcion
     * @param {string} value
     */
    public set $descripcion(value: string) {
        this.descripcion = value;
    }

    /**
     * Setter $datosAmbientales
     * @param {DatoAmbiental[]} value
     */
    public set $datosAmbientales(value: DatoAmbiental[]) {
        this.datosAmbientales = value;
    }


}