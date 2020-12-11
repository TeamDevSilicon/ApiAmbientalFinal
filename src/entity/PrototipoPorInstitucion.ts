import { ViewEntity, ViewColumn, Connection } from "typeorm";
import { DatoAmbiental } from "./DatoAmbiental";

@ViewEntity({
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("institucion.id", "idInstitucion")
        .addSelect("prototipo.id", "idPrototipo")
        .addSelect("prototipo.nombre", "nombrePrototipo")
        .distinct(true)
        .from(DatoAmbiental, "datoAmbiental")
        .innerJoin("datoAmbiental.prototipo", "prototipo")
        .innerJoin("datoAmbiental.institucion", "institucion")
        .where("datoAmbiental.institucion = institucion.id")
})
export class PrototipoPorInstitucion {

    @ViewColumn()
    idInstitucion: number;

    @ViewColumn()
    idPrototipo: number;

    @ViewColumn()
    nombrePrototipo: string;





    // @OneToMany(type => DatoAmbiental, datoAmbiental => datoAmbiental.prototipo)
    // datosAmbientales: DatoAmbiental[];

}