import { JsonController, Get, Post, Param, Body, Put, Delete } from "routing-controllers";
import { Between, getRepository } from "typeorm";
import { DatoAmbiental } from "../entity/DatoAmbiental";
import { Prototipo } from "../entity/Prototipo";
import { TipoDatoAmbiental } from "../entity/TipoDatoAmbiental";
import { Dato } from "../Solucion/Dato";
import { InstitucionDato } from "../Solucion/InstitucionDato";


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
        let retorno: Array<DatoAmbiental[]> = [];
        for (let index = 1; index < 8; index++) {
            let dato: DatoAmbiental[] = [];
            dato = await this.datoRepositorio.find({
                relations: ['tipoDato',], order: { id: "DESC" },
                where: {
                    tipoDato: index,
                    prototipo: id
                },
                skip: 0,
                take: 1
            });
            if (dato.length > 0) {
                retorno.push(dato);
            }
        }

        return retorno;
        // let inst = new InstitucionDato();
        // // let fecha = retorno.find(value => value.forEach(element => {
        // //     return element.$fecha;
        // // }));
        // // let datoAmbientales = retorno.find();
        // // let fecha = datoAmbientales.find(value => value.$fecha);
        // //console.log("Fecha " + fecha);
        // let lista: Array<Dato> = [];
        // let datoObject = new Dato();

        // retorno.forEach(value => {
        //     value.forEach(dato => {
        //         console.log(dato.tipoDato);
        //         if (dato.tipoDato.id == 1) {
        //             datoObject.temperaturaAmbiente = dato.$valor;

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
        // lista.push(datoObject);
        // console.log(lista.length)
        // inst.datosAmbientales = lista;
        // return inst;
    }

    //Devuelve ultimos datos ambientales por prototipo entre 2 fechas
    @Get("/datoAmbientalPrototipo/:prototipoId/:fechaDesde/:fechaHasta")
    // @OnUndefined(institucionNotFoundError)
    async devolverDatosPorPrototipoYFecha(@Param("prototipoId") id: number, @Param("fechaDesde") fechaDesde: string, @Param("fechaHasta") fechaHasta: string) {
        console.log('Id ' + id.toString.length)

        let retorno: Array<DatoAmbiental[]> = [];
        for (let index = 1; index < 8; index++) {
            let dato: DatoAmbiental[] = [];
            dato = await this.datoRepositorio.find({
                relations: ['tipoDato'], order: { id: "DESC" },
                where: {
                    tipoDato: index,
                    fechaCreacion: Between(fechaDesde, fechaHasta),
                    prototipo: id
                },
                skip: 0/* ,
                take: 1 */
            });
            if (dato.length > 0) {
                retorno.push(dato);
            }
        }
        return retorno;
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

}