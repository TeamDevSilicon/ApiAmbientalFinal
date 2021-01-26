import { JsonController, Get, Param, Post, Put, Body, Delete } from "routing-controllers";
import { getRepository } from "typeorm";
import { Prototipo } from "../entity/Prototipo";
import { DateUtils } from "../util/DateUtils";


@JsonController()
export class PrototipoControlador {

    private prototipoRepositorio = getRepository(Prototipo);

    @Get("/prototipo")
    getAll() {
        return this.prototipoRepositorio.find({ relations: ['institucion'] });
    }

    @Get("/prototipo/:id")
    // @OnUndefined(UserNotFoundError)
    getOne(@Param("id") id: number) {
        console.log('Id ' + id.toString.length)
        return this.prototipoRepositorio.findOne(id/* , {
            relations: ['datosAmbientales', 'datosAmbientales.tipoDato']

        } */);
    }

    @Post("/prototipo")
    post(@Body() user: any) {
        return this.prototipoRepositorio.save(user);
    }

    @Put("/prototipo/:id")
    put(@Param("id") id: number, @Body() user: any) {
        return "Updating a user...";
    }

    @Delete("/prototipo/:id")
    async remove(@Param("id") id: number) {
        let datoARemover = await this.prototipoRepositorio.findOne(id);
        return this.prototipoRepositorio.remove(datoARemover);
    }


    @Get("/prototipoFecha")
    // @OnUndefined(UserNotFoundError)
    async devolver(/* @Param("id") id: number */) {
        let dato = await this.prototipoRepositorio.createQueryBuilder("prototipo")
            .select("prototipo.id")
            .addSelect(["prototipo.nombre", "prototipo.latitud", "prototipo.longitud"])
            // .addSelect("prototipo.nombre")
            // .addSelect("prototipo.latitud")
            // .addSelect("prototipo.longitud")

            .addSelect("datosPorFecha")
            .addSelect(["datosAmbientales.temperaturaAmbiente", "datosAmbientales.humedadAmbiente"
                , "datosAmbientales.humedadSuelo", "datosAmbientales.luz", "datosAmbientales.lluvia"
                , "datosAmbientales.viento", "datosAmbientales.precipitaciones", "datosAmbientales.direccionViento"])
            // .distinct(true)
            .innerJoin("prototipo.datosPorFecha", "datosPorFecha")
            .innerJoin("datosPorFecha.datosAmbientales", "datosAmbientales")
            // .innerJoin("institucion.departamento", "departamento")
            // .innerJoin("institucion.localidad", "localidad")
            // .where("datoAmbiental.institucion = :id", { id: id })
            .orderBy("datosPorFecha.fecha", "DESC")
            .addOrderBy("prototipo.id", "ASC")
            .getMany()
        return dato;
    }

    @Get("/datoAmbientalPrototipo/:prototipoId/:fecha")
    async devolverDatosPorPrototipoYFecha(@Param("prototipoId") id: number, @Param("fecha") fecha: String) {
        let fechaDesde = DateUtils.mixedDateToDateString(fecha + " 00:00:00");
        let fechaHasta = DateUtils.mixedDateToDateString(fecha + " 23:59:00");
        let prototipo = await this.prototipoRepositorio.findOne(id);
        let retorno;
        if (!prototipo) {
            return "No existe un prototipo con id " + id;
        }
        let dato = await this.prototipoRepositorio.createQueryBuilder("prototipo")
            .select("prototipo.id")
            .addSelect(["prototipo.nombre", "prototipo.latitud", "prototipo.longitud"])
            .addSelect("datosPorFecha")
            .addSelect(["datosAmbientales.temperaturaAmbiente", "datosAmbientales.humedadAmbiente"
                , "datosAmbientales.humedadSuelo", "datosAmbientales.luz", "datosAmbientales.lluvia"
                , "datosAmbientales.viento", "datosAmbientales.precipitaciones", "datosAmbientales.direccionViento"])
            .innerJoin("prototipo.datosPorFecha", "datosPorFecha")
            .innerJoin("datosPorFecha.datosAmbientales", "datosAmbientales")
            .where("prototipo.id = :id", { id: id })
            .andWhere("datosPorFecha.fecha >= :fechaDesde and datosPorFecha.fecha <= :fechaHasta", { fechaDesde: fechaDesde, fechaHasta: fechaHasta })
            .orderBy("datosPorFecha.fecha", "DESC")
            .addOrderBy("prototipo.id", "ASC")
            .getOne();

        if (dato) {
            return retorno = {
                "id": dato.id,
                "nombre": dato.nombre,
                "lat": dato.latitud,
                "long": dato.longitud,
                "datosPorFecha": dato.datosPorFecha
            };
        }

        return {
            "id": prototipo.id,
            "nombre": prototipo.nombre,
            "lat": prototipo.latitud,
            "long": prototipo.longitud,
            "datosPorFecha": [
                {
                    "fecha": fecha,
                    "datosAmbientales": {
                        "temperaturaAmbiente": 0,
                        "humedadAmbiente": 0,
                        "humedadSuelo": 0,
                        "lluvia": 0,
                        "luz": 0,
                        "precipitaciones": 0,
                        "direccionViento": 0,
                        "viento": 0
                    }
                }
            ]
        };
    }

    @Get("/datoAmbientalPrototipo/:prototipoId/:fechaDesde/:fechaHasta")
    async devolverDatosPorPrototipoYRangoDeFechas(@Param("prototipoId") id: number, @Param("fechaDesde") fechaDesde: String, @Param("fechaHasta") fechaHasta: String) {
        // let fechaDesde = DateUtils.mixedDateToDateString(fecha + " 00:00:00");
        // let fechaHasta = DateUtils.mixedDateToDateString(fecha + " 23:59:00");
        let fechaDesdeForm = fechaDesde + " 00:00:00";
        let fechaHastaForm = fechaHasta + " 23:59:00";
        let prototipo = await this.prototipoRepositorio.findOne(id);
        let retorno;
        if (!prototipo) {
            return "No existe un prototipo con id " + id;
        }
        let dato = await this.prototipoRepositorio.createQueryBuilder("prototipo")
            .select("prototipo.id")
            .addSelect(["prototipo.nombre", "prototipo.latitud", "prototipo.longitud"])
            .addSelect("datosPorFecha")
            .addSelect(["datosAmbientales.temperaturaAmbiente", "datosAmbientales.humedadAmbiente"
                , "datosAmbientales.humedadSuelo", "datosAmbientales.luz", "datosAmbientales.lluvia"
                , "datosAmbientales.viento", "datosAmbientales.precipitaciones", "datosAmbientales.direccionViento"])
            .innerJoin("prototipo.datosPorFecha", "datosPorFecha")
            .innerJoin("datosPorFecha.datosAmbientales", "datosAmbientales")
            .where("prototipo.id = :id", { id: id })
            .andWhere("datosPorFecha.fecha >= :fechaDesde and datosPorFecha.fecha <= :fechaHasta", { fechaDesde: fechaDesdeForm, fechaHasta: fechaHastaForm })
            .orderBy("datosPorFecha.fecha", "DESC")
            .addOrderBy("prototipo.id", "ASC")
            .getOne();
        if (dato) {
            return retorno = {
                "id": dato.id,
                "nombre": dato.nombre,
                "lat": dato.latitud,
                "long": dato.longitud,
                "datosPorFecha": dato.datosPorFecha
            };
        }
        return [];
    }


    //Devuelve los prototipos de una institucion
    @Get("/datoAmbientalPrototiposPorInstitucion/:institucionId")
    // @OnUndefined(institucionNotFoundError)
    async devolverPrototiposPorInstitucion(@Param("institucionId") id: number) {

        return await this.prototipoRepositorio.createQueryBuilder("prototipo")
            .select(["prototipo.id as id", "prototipo.nombre as nombre", "prototipo.longitud ", "prototipo.latitud ", "departamento.nombre as departamento", "localidad.nombre as localidad"])
            .innerJoin("prototipo.institucion", "institucion")
            .innerJoin("institucion.departamento", "departamento")
            .innerJoin("institucion.localidad", "localidad")
            .where("institucion.id =:id", { id: id })
            .getRawMany();
    }


}