import { JsonController, Get, Post, Param, Body, Put, Delete } from "routing-controllers";
import { getRepository } from "typeorm";
import { DatoAmbiental } from "../entity/DatoAmbiental";
import { TipoDatoAmbiental } from "../entity/TipoDatoAmbiental";


@JsonController()
export class DatoAmbientalControlador {

    private datoRepositorio = getRepository(DatoAmbiental);
    private tipoRepositorio = getRepository(TipoDatoAmbiental);

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
    post(@Body() datoAmbiental: any) {

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

    //Devuelve una coleccion de colleciones de datos ambientas por tipo de dato y fecha
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
        console.log(retorno);
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
        console.log(retorno);
        return retorno;;
    }
}