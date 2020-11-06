import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { DatoAmbiental } from "./DatoAmbiental";


@Entity()
export class Institucion {

    public constructor(nombre: string) {
        this.nombre = nombre;
    }

    @PrimaryGeneratedColumn({ name: "id_institucion" })
    private id: number;

    @Column()
    private nombre: string;

    @Column({ unique: true })
    private cue: string;

    @OneToMany(type => DatoAmbiental, datoAmbiental => datoAmbiental.institucion)
    datosAmbientales: DatoAmbiental[];

    @Column()
    longitud: string;

    @Column()
    latitud: string;

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
     * Getter $cue
     * @return {string}
     */
    public get $cue(): string {
        return this.cue;
    }

    // /**
    //  * Getter $datosAmbientales
    //  * @return {DatoAmbiental[]}
    //  */
    // public get $datosAmbientales(): DatoAmbiental[] {
    //     return this.datosAmbientales;
    // }

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
     * Setter $cue
     * @param {string} value
     */
    public set $cue(value: string) {
        this.cue = value;
    }

    // /**
    //  * Setter $datosAmbientales
    //  * @param {DatoAmbiental[]} value
    //  */
    // public set $datosAmbientales(value: DatoAmbiental[]) {
    //     this.datosAmbientales = value;
    // }



}