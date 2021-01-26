import { JsonController, Get, Param, Post, Put, Body, Delete } from "routing-controllers";
import { getRepository } from "typeorm";
import { DatoPorFechaVista } from "../entity/DatoPorFechaVista";
import { Prototipo } from "../entity/Prototipo";
import { DateUtils } from "../util/DateUtils";

@JsonController()
export class datoPorFechaControlador {

    private datoPorFechaRepositorio = getRepository(DatoPorFechaVista);

    @Get("/datoPorFecha")
    getAll() {
        return this.datoPorFechaRepositorio.find({ /* relations: ['datosAmbientales'] */ });
    }

    @Get("/datoPorFecha/:id")
    // @OnUndefined(UserNotFoundError)
    getOne(@Param("id") id: number) {
        console.log('Id ' + id.toString.length)
        return this.datoPorFechaRepositorio.findOne(id/* , {
            relations: ['datosAmbientales', 'datosAmbientales.tipoDato']

        } */);
    }

    // @Post("/datoPorFecha")
    // post(@Body() user: any) {
    //     return this.datoPorFechaRepositorio.save(user);
    // }

    // @Put("/datoPorFecha/:id")
    // put(@Param("id") id: number, @Body() user: any) {
    //     return "Updating a user...";
    // }

    // @Delete("/datoPorFecha/:id")
    // async remove(@Param("id") id: number) {
    //     let datoARemover = await this.datoPorFechaRepositorio.findOne(id);
    //     return this.datoPorFechaRepositorio.remove(datoARemover);
    // }


    @Get("/datoAmbientalPrototipo/:prototipoId")
    // @OnUndefined(institucionNotFoundError)
    async devolverDatosPorPrototipo(@Param("prototipoId") id: number) {
        let dato = await this.datoPorFechaRepositorio.findOne({
            relations: ['datosAmbientales'], order: { fecha: "DESC" },
            where: {
                prototipo: id
            }
        });
        return dato;
    }

}