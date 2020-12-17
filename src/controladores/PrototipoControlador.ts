import { JsonController, Get, Param, Post, Put, Body, Delete } from "routing-controllers";
import { getRepository } from "typeorm";
import { Prototipo } from "../entity/Prototipo";


@JsonController()
export class PrototipoControlador {

    private prototipoRepositorio = getRepository(Prototipo);

    @Get("/prototipo")
    getAll() {
        return this.prototipoRepositorio.find({ /* relations: ['datosAmbientales'] */ });
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

}