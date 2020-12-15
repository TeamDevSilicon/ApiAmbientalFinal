import { InstitucionDato } from "./InstitucionDato";

export class PrototipoInstitucion {

    id: number;
    nombre: string;
    lat: number;
    long: number;

    datosPorFecha: InstitucionDato[];


}