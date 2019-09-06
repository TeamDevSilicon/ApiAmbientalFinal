import { Entity, Generated, PrimaryGeneratedColumn, OneToMany, ManyToOne, Column, AfterInsert, BeforeInsert } from "typeorm";
// import { ValorDatoAmbiental } from "./ValorDatoAmbiental";
import { Prototipo } from "./Prototipo";
import { Sensor } from "./Sensor";
import { TipoDatoAmbiental } from "./TipoDatoAmbiental";
import { Institucion } from "./Institucion";
import { DateUtils } from "../util/DateUtils"

@Entity()
export class DatoAmbiental {

    @PrimaryGeneratedColumn({ name: "id_datoAmbiental" })
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    private fecha: Date;
    /* { default: DateUtils.mixedDateToDateString(new Date()) } */
    @Column()
    fechaCreacion: String;

    @Column()
    private valor: number;

    @Column()
    private ubicacion: string;

    @BeforeInsert()
    setearFecha() {
        console.log('Before');
        this.fechaCreacion = DateUtils.mixedDateToDateString(new Date());
    }

    // @OneToMany(type => ValorDatoAmbiental, valorAmbiental => valorAmbiental.datoAmbiental)
    // valores: ValorDatoAmbiental[];

    @ManyToOne(type => Prototipo, prototipo => prototipo.datosAmbientales, { cascade: true })
    private prototipo: Prototipo;

    @ManyToOne(type => Sensor, sensor => sensor.datosAmbientales, { cascade: true })
    private sensor: Sensor;

    @ManyToOne(type => TipoDatoAmbiental, tipoDatoAmbiental => tipoDatoAmbiental.$datosAmbientales, { cascade: true })
    private tipoDato: TipoDatoAmbiental;

    @ManyToOne(type => Institucion, institucion => institucion.$datosAmbientales, { cascade: true })
    institucion: Institucion;


    /**
     * Getter $id
     * @return {number}
     */
    public get $id(): number {
        return this.id;
    }

    /**
     * Setter $id
     * @param {number} value
     */
    public set $id(value: number) {
        this.id = value;
    }

    /**
     * Getter $fecha
     * @return {Date}
     */
    public get $fecha(): Date {
        return this.fecha;
    }

    /**
     * Getter $valor
     * @return {number}
     */
    public get $valor(): number {
        return this.valor;
    }

    /**
     * Getter $ubicacion
     * @return {string}
     */
    public get $ubicacion(): string {
        return this.ubicacion;
    }

    /**
     * Setter $fecha
     * @param {Date} value
     */
    public set $fecha(value: Date) {
        this.fecha = value;
    }

    /**
     * Setter $valor
     * @param {number} value
     */
    public set $valor(value: number) {
        this.valor = value;
    }

    /**
     * Setter $ubicacion
     * @param {string} value
     */
    public set $ubicacion(value: string) {
        this.ubicacion = value;
    }


    /**
     * Getter $prototipo
     * @return {Prototipo}
     */
    public get $prototipo(): Prototipo {
        return this.prototipo;
    }

    /**
     * Getter $sensor
     * @return {Sensor}
     */
    public get $sensor(): Sensor {
        return this.sensor;
    }

    /**
     * Getter $tipoDato
     * @return {TipoDatoAmbiental}
     */
    public get $tipoDato(): TipoDatoAmbiental {
        return this.tipoDato;
    }

    /**
     * Getter $institucion
     * @return {Institucion}
     */
    public get $institucion(): Institucion {
        return this.institucion;
    }

    /**
     * Setter $prototipo
     * @param {Prototipo} value
     */
    public set $prototipo(value: Prototipo) {
        this.prototipo = value;
    }

    /**
     * Setter $sensor
     * @param {Sensor} value
     */
    public set $sensor(value: Sensor) {
        this.sensor = value;
    }

    /**
     * Setter $tipoDato
     * @param {TipoDatoAmbiental} value
     */
    public set $tipoDato(value: TipoDatoAmbiental) {
        this.tipoDato = value;
    }

    /**
     * Setter $institucion
     * @param {Institucion} value
     */
    public set $institucion(value: Institucion) {
        this.institucion = value;
    }

}