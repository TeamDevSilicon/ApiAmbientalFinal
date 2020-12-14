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
                fecha = DateUtils.mixedDateToDateString(value.fecha);
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


        // retorno.forEach(value => {
        //     value.forEach(dato => {
        //         console.log(dato.tipoDato);
        //         console.log(dato.fecha);
        //         fecha = dato.fecha;
        //         if (dato.tipoDato.id == 1) {
        //             datoObject.temperaturaAmbiente = dato.valor;
        //         }
        //         if (dato.tipoDato.id == 2) {
        //             datoObject.humedadAmbiente = dato.$valor;

        //         }
        //         if (dato.tipoDato.id == 3) {
        //             datoObject.humedadSuelo = dato.$valor;

        //         }
        //         if (dato.tipoDato.id == 4) {
        //             datoObject.luz = dato.$valor;

        //         }
        //         if (dato.tipoDato.id == 5) {
        //             datoObject.lluvia = dato.$valor;

        //         }
        //         if (dato.tipoDato.id == 6) {
        //             datoObject.viento = dato.$valor;

        //         }
        //         if (dato.tipoDato.id == 7) {
        //             datoObject.precipitaciones = dato.$valor;
        //         }
        //     })
        // });

        lista.push(datoObject);
        console.log(lista.length)
        inst.fecha = fecha;
        inst.datosAmbientales = lista;

        return inst;
    }

    //Devuelve ultimos datos ambientales por prototipo entre 2 fechas
    @Get("/datoAmbientalPrototipo/:prototipoId/:fechaDesde/:fechaHasta")
    // @OnUndefined(institucionNotFoundError)
    async devolverDatosPorPrototipoYFecha(@Param("prototipoId") id: number, @Param("fechaDesde") fechaDesde: string, @Param("fechaHasta") fechaHasta: string) {
        console.log('Id ' + id.toString.length)
        let dato = await this.datoRepositorio.createQueryBuilder("datoAmbiental")
            .select("fecha", "fecha")
            .distinct(true)
            .where("datoAmbiental.prototipo = :id", { id: id })
            .andWhere("datoAmbiental.fecha between :fechaDesde and :fechaHasta", { fechaDesde: "2020-01-31", fechaHasta: "2020-02-05" })
            .getRawMany();

        console.log(dato);
        dato.forEach(valor => {
            console.log(valor.fecha);
        });

        let retorno: Array<DatoAmbiental[]> = [];
        for (let index = 1; index < 8; index++) {
            let dato: DatoAmbiental[] = [];
            dato = await this.datoRepositorio.find({
                relations: ['tipoDato'],
                order: { id: "DESC" },
                where: {
                    tipoDato: index,
                    fechaCreacion: Between(fechaDesde, fechaHasta),
                    prototipo: id
                }/* ,
                skip: 0,
                take: 1 */
            });
            if (dato.length > 0) {
                console.log(dato);
                retorno.push(dato);
            }
        }

        let inst = new InstitucionDato();
        let lista: Array<Dato> = [];
        let datoObject = new Dato();
        let fecha;

        retorno.forEach(value => {
            value.forEach(dato => {
                console.log(dato.tipoDato);
                console.log(dato.fecha);
                fecha = dato.fecha;
                if (dato.tipoDato.id == 1) {
                    datoObject.temperaturaAmbiente = dato.valor;
                }
                if (dato.tipoDato.id == 2) {
                    datoObject.humedadAmbiente = dato.valor;
                }
                if (dato.tipoDato.id == 3) {
                    datoObject.humedadSuelo = dato.valor;
                }
                if (dato.tipoDato.id == 4) {
                    datoObject.luz = dato.valor;
                }
                if (dato.tipoDato.id == 5) {
                    datoObject.lluvia = dato.valor;
                }
                if (dato.tipoDato.id == 6) {
                    datoObject.viento = dato.valor;
                }
                if (dato.tipoDato.id == 7) {
                    datoObject.precipitaciones = dato.valor;
                }
            })
        });

        lista.push(datoObject);
        console.log(lista.length)
        //inst.fecha = fecha;
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

    //Devuelve ultimos datos ambientales por prototipo
    //@Get("/datoAmbientalPrototipo2/:prototipoId")
    // @OnUndefined(institucionNotFoundError)
    async devolverFechas(id: number) {
        let dato = await this.datoRepositorio.createQueryBuilder("datoAmbiental")
            .select("fecha", "fecha")
            .distinct(true)
            // .addSelect("tipoDato.nombre", "nombreTipoDato")
            // .addSelect("valor", "valor")

            // .innerJoin("datoAmbiental.prototipo", "prototipo")
            // .innerJoin("datoAmbiental.tipoDato", "tipoDato")
            .where("datoAmbiental.prototipo = :id", { id: id })
            .andWhere("datoAmbiental.fecha between :fechaDesde and :fechaHasta", { fechaDesde: "2020-01-31", fechaHasta: "2020-02-05" })
            // .andWhere("datoAmbiental.")
            // .orderBy("datoAmbiental.id", "DESC")
            .getRawMany();
        console.log(dato);
        //console.log(DateUtils.mixedDateToDatetimeString("2020-01-31"));
        dato.forEach(valor => {
            console.log(valor.fecha);

        });
        return dato;
    }



    // async devolverDatoPorFechaTipo(id: number, fecha: Date, index: number) {
    //     return await this.datoRepositorio.createQueryBuilder("datoAmbiental")
    //         .select("fecha")
    //         .addSelect("tipoDatoId", "idDato")
    //         .addSelect("valor")
    //         // .distinct(true)
    //         .innerJoin("datoAmbiental.prototipo", "prototipo")

    //         .where("datoAmbiental.prototipo = :id", { id: id })
    //         .andWhere("datoAmbiental.fecha = :fecha", { fecha: fecha })
    //         //.andWhere("datoAmbiental.fecha between :fechaDesde and :fechaHasta", { fechaDesde: "2020-01-31", fechaHasta: "2020-02-05" })
    //         .andWhere("datoAmbiental.tipoDatoId = :idTipoDato", { idTipoDato: index })
    //         .groupBy("fecha,idDato,valor")
    //         .orderBy("fecha", "ASC")
    //         .getRawMany();
    // }

    //Devuelve ultimos datos ambientales por prototipo entre 2 fechas
    @Get("/datoAmbientalPrototipo2/:prototipoId/:fechaDesde/:fechaHasta")
    // @OnUndefined(institucionNotFoundError)
    async devolverDatosPorPrototipoYFechaOrdenados(@Param("prototipoId") id: number, @Param("fechaDesde") fechaDesde: string, @Param("fechaHasta") fechaHasta: string) {
        console.log('Id ' + id.toString.length)
        let prototipo = await getRepository(Prototipo).findOne(id);

        console.log("Proto ", prototipo);
        let dato = await this.datoRepositorio.createQueryBuilder("datoAmbiental")
            .select("fecha", "fecha")
            .distinct(true)
            .where("datoAmbiental.prototipo = :id", { id: id })
            .andWhere("datoAmbiental.fecha between :fechaDesde and :fechaHasta", { fechaDesde: "2020-01-31", fechaHasta: "2020-02-05" })
            .getRawMany();
        //console.log(dato);


        let retorno2 = new PrototipoInstitucion();
        retorno2.datosPorFecha = [];

        dato.forEach(async element => {
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
                    .andWhere("datoAmbiental.fecha = :fecha", { fecha: element.fecha })
                    //.andWhere("datoAmbiental.fecha between :fechaDesde and :fechaHasta", { fechaDesde: "2020-01-31", fechaHasta: "2020-02-05" })
                    .andWhere("datoAmbiental.tipoDatoId = :idTipoDato", { idTipoDato: index })
                    .groupBy("fecha,idDato,valor")
                    .orderBy("fecha", "ASC")
                    .getRawMany();
                //console.log(dato2);
                dato2.forEach(valor2 => {
                    //console.log(valor2.valor)
                    if (index == 1) {
                        datoObject.temperaturaAmbiente = valor2.valor;
                    }
                    if (index == 2) {
                        datoObject.humedadAmbiente = valor2.valor;
                    }
                    if (index == 3) {
                        datoObject.humedadSuelo = valor2.valor;
                    }
                    if (index == 4) {
                        datoObject.luz = valor2.valor;
                    }
                    if (index == 5) {
                        datoObject.lluvia = valor2.valor;
                    }
                    if (index == 6) {
                        datoObject.viento = valor2.valor;
                    }
                    if (index == 7) {
                        datoObject.precipitaciones = valor2.valor;
                    }
                });

            }
            lista.push(datoObject);
            inst.datosAmbientales = lista;
            retorno2.datosPorFecha.push(inst);
            //console.log(retorno2);
        });

        //console.log(retorno2);



        // let dato2 = await this.datoRepositorio.createQueryBuilder("datoAmbiental")
        //     .select("fecha")
        //     .addSelect("tipoDatoId", "idDato")
        //     .addSelect("valor")
        //     // .distinct(true)
        //     .innerJoin("datoAmbiental.prototipo", "prototipo")

        //     .where("datoAmbiental.prototipo = :id", { id: id })
        //     .andWhere("datoAmbiental.fecha between :fechaDesde and :fechaHasta", { fechaDesde: "2020-01-31", fechaHasta: "2020-02-05" })
        //     .andWhere("datoAmbiental.tipoDatoId = :idTipoDato", { idTipoDato: 7 })
        //     .groupBy("fecha,idDato,valor")
        //     .orderBy("fecha", "ASC")
        //     .getRawMany();
        // console.log(dato2);


        // let retorno2 = new PrototipoInstitucion();
        // retorno2.datosPorFecha = [];
        //dato.forEach(valor => {
        // let inst = new InstitucionDato();
        // let lista: Array<Dato> = [];
        // let datoObject = new Dato();
        // let fecha;
        //console.log(valor.fecha);
        // dato2.forEach(valor2 => {
        //     console.log(valor2.fecha);
        //     console.log(valor.fecha.getTime() == valor2.fecha.getTime());
        //     if (valor.fecha.getTime() == valor2.fecha.getTime()) {
        //         if (valor2.idDato == 1) {
        //             datoObject.temperaturaAmbiente = valor2.valor;
        //         }
        //         if (valor2.idDato == 2) {
        //             datoObject.humedadAmbiente = valor2.valor;
        //         }
        //         if (valor2.idDato == 3) {
        //             datoObject.humedadSuelo = valor2.valor;
        //         }
        //         if (valor2.idDato == 4) {
        //             datoObject.luz = valor2.valor;
        //         }
        //         if (valor2.idDato == 5) {
        //             datoObject.lluvia = valor2.valor;
        //         }
        //         if (valor2.idDato == 6) {
        //             datoObject.viento = valor2.valor;
        //         }
        //         if (valor2.idDato == 7) {
        //             datoObject.precipitaciones = valor2.valor;
        //         }
        //     } else {
        //         lista.push(datoObject);
        //         inst.datosAmbientales = lista;
        //         retorno2.datosPorFecha.push(inst);
        //     }

        // });



        // });


        // let retorno: Array<DatoAmbiental[]> = [];
        // for (let index = 1; index < 8; index++) {
        //     let dato: DatoAmbiental[] = [];
        //     dato = await this.datoRepositorio.find({
        //         relations: ['tipoDato'],
        //         order: { id: "DESC" },
        //         where: {
        //             tipoDato: index,
        //             fechaCreacion: Between(fechaDesde, fechaHasta),
        //             prototipo: id
        //         }/* ,
        //         skip: 0,
        //         take: 1 */
        //     });
        //     if (dato.length > 0) {
        //         //console.log(dato);
        //         retorno.push(dato);
        //     }
        // }

        // let inst = new InstitucionDato();
        // let lista: Array<Dato> = [];
        // let datoObject = new Dato();
        // let fecha;

        // retorno.forEach(value => {
        //     value.forEach(dato => {
        //         // console.log(dato.tipoDato);
        //         // console.log(dato.fecha);
        //         fecha = dato.fecha;
        //         if (dato.tipoDato.id == 1) {
        //             datoObject.temperaturaAmbiente = dato.valor;
        //         }
        //         if (dato.tipoDato.id == 2) {
        //             datoObject.humedadAmbiente = dato.valor;
        //         }
        //         if (dato.tipoDato.id == 3) {
        //             datoObject.humedadSuelo = dato.valor;
        //         }
        //         if (dato.tipoDato.id == 4) {
        //             datoObject.luz = dato.valor;
        //         }
        //         if (dato.tipoDato.id == 5) {
        //             datoObject.lluvia = dato.valor;
        //         }
        //         if (dato.tipoDato.id == 6) {
        //             datoObject.viento = dato.valor;
        //         }
        //         if (dato.tipoDato.id == 7) {
        //             datoObject.precipitaciones = dato.valor;
        //         }
        //     })
        // });

        // lista.push(datoObject);
        // //console.log(lista.length)
        // //inst.fecha = fecha;
        // inst.datosAmbientales = lista;

        return retorno2;
    }

}


