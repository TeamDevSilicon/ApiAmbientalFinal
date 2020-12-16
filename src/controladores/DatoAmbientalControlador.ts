import { JsonController, Get, Post, Param, Body, Put, Delete } from "routing-controllers";
import { Between, getRepository } from "typeorm";
import { DatoAmbiental } from "../entity/DatoAmbiental";
import { Prototipo } from "../entity/Prototipo";
import { TipoDatoAmbiental } from "../entity/TipoDatoAmbiental";
import { ValorDatoAmbiental } from "../entity/ValorDatoAmbiental";
import { Dato } from "../Solucion/Dato";
import { InstitucionDato } from "../Solucion/InstitucionDato";
import { PrototipoInstitucion } from "../Solucion/PrototipoInstitucion";
import { DateUtils } from "../util/DateUtils";


@JsonController()
export class DatoAmbientalControlador {

    private datoRepositorio = getRepository(DatoAmbiental);

    @Get("/datoAmbiental")
    getAll() {
        return this.datoRepositorio.find({ relations: ['prototipo', 'sensor', 'tipoDato', 'institucion'], order: { id: "DESC" } });

    }

    @Get("/datoAmbiental8")
    getUltimos8() {
        return this.datoRepositorio.find({
            relations: ['prototipo', 'sensor', 'tipoDato', 'institucion'], order: { id: "DESC" },
            skip: 0,
            take: 8
        });
    }

    @Get("/datoAmbiental/:id")
    // @OnUndefined(datoAmbientalNotFoundError)
    getOne(@Param("id") id: number) {
        console.log('Id ' + id.toString.length)
        return this.datoRepositorio.findOne(id);
    }

    @Get("/datoAmbientalPorTipo/:id")
    // @OnUndefined(datoAmbientalNotFoundError)
    devolverDatoAmbientalPorTipoDato(@Param("id") id: number) {
        console.log('Id ' + id.toString.length)
        return this.datoRepositorio.find({
            relations: ['prototipo', 'sensor', 'tipoDato', 'institucion'], order: { id: "DESC" },
            where: {
                tipoDato: id
            },
            skip: 0,
            take: 6
        });
    }

    @Post("/datoAmbiental")
    post(@Body() datoAmbiental: DatoAmbiental) {

        // let fecha = new Date();
        // let fullName: string = JSON.stringify(datoAmbiental);
        // console.log('Dato A ' + fullName);
        // console.log('Dato B' + datoAmbiental);
        // // console.log(Object.keys(datoAmbiental));
        // Object.keys(datoAmbiental).forEach(e => console.log(`key=${e}  value=${datoAmbiental[e]}`));
        // // console.log(Object.values(datoAmbiental));
        // console.log(datoAmbiental);
        this.datoRepositorio.save(datoAmbiental);
        // return "ok"/* this.datoRepositorio.save(datoAmbiental) */;
        return "ok";
    }

    @Put("/datoAmbiental/:id")
    put(@Param("id") id: number, @Body() datoAmbiental: any) {
        return "Updating a datoAmbiental...";
    }

    @Delete("/datoAmbiental/:id")
    async remove(@Param("id") id: number) {
        let datoARemover = await this.datoRepositorio.findOne(id);
        return this.datoRepositorio.remove(datoARemover);
    }

    //Devuelve una coleccion de colleciones de datos ambientales por tipo de dato y fecha
    @Get("/datoAmbientalUltimosDatos/:fecha/:idInstitucion")
    // @OnUndefined(datoAmbientalNotFoundError)
    async devolverUltimosDatosAmbientalesPorTipoDato(@Param("fecha") fecha: string, @Param("idInstitucion") idInstitucion: number) {
        let retorno: Array<DatoAmbiental[]> = [];
        for (let index = 1; index < 8; index++) {
            retorno.push(await this.datoRepositorio.find({
                relations: ['prototipo', 'sensor', 'tipoDato', 'institucion'], order: { id: "DESC" },
                where: {
                    tipoDato: index,
                    fechaCreacion: fecha,
                    institucion: idInstitucion

                },
                skip: 0,
                take: 7
            }));
        }
        //console.log(retorno);
        return retorno;;
    }

    //Devuelve una coleccion de colleciones de datos ambientas por tipo de dato y fecha
    @Get("/datoAmbientalUltimoDato/:fecha/:idInstitucion")
    // @OnUndefined(datoAmbientalNotFoundError)
    async devolverUltimoDatoAmbientalesPorTipoDato(@Param("fecha") fecha: string, @Param("idInstitucion") idInstitucion: number) {
        let retorno: Array<DatoAmbiental[]> = [];
        for (let index = 1; index < 8; index++) {
            retorno.push(await this.datoRepositorio.find({
                relations: ['prototipo', 'sensor', 'tipoDato', 'institucion'], order: { id: "DESC" },
                where: {
                    tipoDato: index,
                    fechaCreacion: fecha,
                    institucion: idInstitucion
                },
                skip: 0,
                take: 1
            }));
        }
        //console.log(retorno);
        return retorno;
    }

    //Devuelve ultimos datos ambientales por prototipo
    @Get("/datoAmbientalPrototipo/:prototipoId")
    // @OnUndefined(institucionNotFoundError)
    async devolverDatosPorPrototipo(@Param("prototipoId") id: number) {
        console.log('Id ' + id.toString.length)
        //let retorno: Array<DatoAmbiental[]> = [];
        let retorno: Array<DatoAmbiental> = [];
        for (let index = 1; index < 8; index++) {
            //let dato: DatoAmbiental[] = [];
            let dato: DatoAmbiental = new DatoAmbiental();
            dato = await this.datoRepositorio.findOne({
                relations: ['tipoDato',], order: { id: "DESC" },
                where: {
                    tipoDato: index,
                    prototipo: id
                }/* ,
                skip: 0,
                take: 1 */
            });
            if (dato != null) {
                retorno.push(dato);
            }

        }
        console.log(retorno);

        let inst = new InstitucionDato();
        let lista: Array<Dato> = [];
        let datoObject = new Dato();
        let fecha;

        retorno.forEach(value => {
            if (value.tipoDato.id == 1) {
                fecha = value.fecha/* DateUtils.mixedDateToDateString(value.fecha) */;
                datoObject.temperaturaAmbiente = value.valor;
            }
            if (value.tipoDato.id == 2) {
                datoObject.humedadAmbiente = value.valor;
            }
            if (value.tipoDato.id == 3) {
                datoObject.humedadSuelo = value.valor;
            }
            if (value.tipoDato.id == 4) {
                datoObject.luz = value.valor;
            }
            if (value.tipoDato.id == 5) {
                datoObject.lluvia = value.valor;
            }
            if (value.tipoDato.id == 6) {
                datoObject.viento = value.valor;
            }
            if (value.tipoDato.id == 7) {
                datoObject.precipitaciones = value.valor;
            }
        });

        lista.push(datoObject);
        console.log(lista.length)
        inst.fecha = fecha;
        inst.datosAmbientales = lista;

        return inst;
    }

    //Devuelve ultimos datos ambientales por prototipo
    @Get("/datoAmbientalPrototipo/:prototipoId/:fecha")
    // @OnUndefined(institucionNotFoundError)
    async devolverDatosPorPrototipoPorUnaFecha(@Param("prototipoId") id: number, @Param("fecha") fecha: String) {
        console.log('Id ' + id.toString.length)
        //let retorno: Array<DatoAmbiental[]> = [];
        let retorno: Array<DatoAmbiental> = [];
        let fechaDesde = new Date(fecha + " 00:00:00");
        let fechaHasta = new Date(fecha + " 23:59:00");
        for (let index = 1; index < 8; index++) {
            //let dato: DatoAmbiental[] = [];
            let dato: DatoAmbiental = new DatoAmbiental();
            dato = await this.datoRepositorio.findOne({
                relations: ['tipoDato',], order: { id: "DESC" },
                where: {
                    tipoDato: index,
                    prototipo: id,
                    fecha: Between(fechaDesde, fechaHasta),
                }/* ,
                 skip: 0,
                 take: 1 */
            });
            if (dato != null) {
                retorno.push(dato);
            }

        }
        console.log(retorno);

        let inst = new InstitucionDato();
        let lista: Array<Dato> = [];
        let datoObject = new Dato();
        let fechaInstitucion;

        retorno.forEach(value => {
            if (value.tipoDato.id == 1) {
                fechaInstitucion = value.fecha/* DateUtils.mixedDateToDateString(value.fecha) */;
                datoObject.temperaturaAmbiente = value.valor;
            }
            if (value.tipoDato.id == 2) {
                datoObject.humedadAmbiente = value.valor;
            }
            if (value.tipoDato.id == 3) {
                datoObject.humedadSuelo = value.valor;
            }
            if (value.tipoDato.id == 4) {
                datoObject.luz = value.valor;
            }
            if (value.tipoDato.id == 5) {
                datoObject.lluvia = value.valor;
            }
            if (value.tipoDato.id == 6) {
                datoObject.viento = value.valor;
            }
            if (value.tipoDato.id == 7) {
                datoObject.precipitaciones = value.valor;
            }
        });

        lista.push(datoObject);
        console.log(lista.length);
        inst.fecha = fechaInstitucion;
        inst.datosAmbientales = lista;

        return inst;
    }

    //Devuelve los prototipos de una institucion
    @Get("/datoAmbientalPrototiposPorInstitucion/:institucionId")
    // @OnUndefined(institucionNotFoundError)
    async devolverPrototiposPorInstitucion(@Param("institucionId") id: number) {
        console.log('Id ' + id.toString.length)

        let dato = await this.datoRepositorio.createQueryBuilder("datoAmbiental")
            .select("prototipo.id", "id")
            .addSelect("prototipo.nombre", "nombre")
            .distinct(true)
            .innerJoin("datoAmbiental.prototipo", "prototipo")
            .where("datoAmbiental.institucion = :id", { id: id })
            .getRawMany();
        console.log(dato);
        return dato;
    }


    @Get("/datoAmbientalPrototipo/:prototipoId/:fechaDesde/:fechaHasta")
    // @OnUndefined(institucionNotFoundError)
    async devolverDatosPorPrototipoYFechaOrdenados2(@Param("prototipoId") id: number, @Param("fechaDesde") fechaDesde: String, @Param("fechaHasta") fechaHasta: String) {
        console.log('Id ' + id.toString.length)
        let prototipo = await getRepository(Prototipo).findOne(id);
        if (!prototipo) {
            return "No existe un prototipo con id " + id;
        }
        console.log("Proto ", prototipo);
        let fechaHastaForm = new Date(fechaHasta + " 15:10:00");
        let dato = await this.datoRepositorio.createQueryBuilder("datoAmbiental")
            .select("fecha", "fecha")
            .distinct(true)
            .where("datoAmbiental.prototipo = :id", { id: id })
            //.andWhere("datoAmbiental.fecha between :fechaDesde and :fechaHasta", { fechaDesde: fechaDesde, fechaHasta: fechaHasta })
            .andWhere("datoAmbiental.fecha >= :fechaDesde and  datoAmbiental.fecha <= :fechaHasta", { fechaDesde: fechaDesde, fechaHasta: fechaHastaForm })
            .getRawMany();


        let retorno2 = new PrototipoInstitucion();
        retorno2.id = prototipo.id;
        retorno2.nombre = prototipo.nombre;
        retorno2.datosPorFecha = [];

        for (let file of dato) {
            let inst = new InstitucionDato();
            let lista: Array<Dato> = [];
            let datoObject = new Dato();
            for (let index = 1; index < 8; index++) {
                let dato2 = await this.datoRepositorio.createQueryBuilder("datoAmbiental")
                    .select("fecha")
                    .addSelect("tipoDatoId", "idDato")
                    .addSelect("valor")
                    // .distinct(true)
                    .innerJoin("datoAmbiental.prototipo", "prototipo")

                    .where("datoAmbiental.prototipo = :id", { id: id })
                    .andWhere("datoAmbiental.fecha = :fecha", { fecha: file.fecha })
                    //.andWhere("datoAmbiental.fecha between :fechaDesde and :fechaHasta", { fechaDesde: "2020-01-31", fechaHasta: "2020-02-05" })
                    .andWhere("datoAmbiental.tipoDatoId = :idTipoDato", { idTipoDato: index })
                    .groupBy("fecha,idDato,valor")
                    .orderBy("fecha", "ASC")
                    .getRawMany();
                for (let dato of dato2) {
                    console.log(dato);
                    if (index == 1) {
                        datoObject.temperaturaAmbiente = dato.valor;
                    }
                    if (index == 2) {
                        datoObject.humedadAmbiente = dato.valor;
                    }
                    if (index == 3) {
                        datoObject.humedadSuelo = dato.valor;
                    }
                    if (index == 4) {
                        datoObject.luz = dato.valor;
                    }
                    if (index == 5) {
                        datoObject.lluvia = dato.valor;
                    }
                    if (index == 6) {
                        datoObject.viento = dato.valor;
                    }
                    if (index == 7) {
                        datoObject.precipitaciones = dato.valor;
                    }
                }
            }
            lista.push(datoObject);
            inst.fecha = file.fecha;
            inst.datosAmbientales = lista;
            retorno2.datosPorFecha.push(inst);
        }

        return retorno2;

    }

}


