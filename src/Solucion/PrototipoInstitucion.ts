import { InstitucionDato } from "./InstitucionDato";

export class PrototipoInstitucion {

    id: number;
    nombre: string;
    lat: string;
    long: string;

    datosPorFecha: InstitucionDato[];

}