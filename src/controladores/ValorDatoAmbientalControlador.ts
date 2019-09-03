import { JsonController, Get, Param, Post, Put, Body, Delete } from "routing-controllers";
import { getRepository } from "typeorm";
import { TipoDatoAmbiental } from "../entity/TipoDatoAmbiental";


@JsonController()
export class ValorDatoAmbientalControlador {

    private valorRepositorio = getRepository(TipoDatoAmbiental);

    @Get("/valorAmbiental")
    getAll() {
        return this.valorRepositorio.find();
    }

    @Get("/valorAmbiental/:id")
    // @OnUndefined(UserNotFoundError)
    getOne(@Param("id") id: number) {
        console.log('Id ' + id.toString.length)
        return this.valorRepositorio.findOne(id);
    }

    @Post("/valorAmbiental")
    post(@Body() user: any) {
        return this.valorRepositorio.save(user);
    }

    @Put("/valorAmbiental/:id")
    put(@Param("id") id: number, @Body() user: any) {
        return "Updating a user...";
    }

    @Delete("/valorAmbiental/:id")
    async remove(@Param("id") id: number) {
        let datoARemover = await this.valorRepositorio.findOne(id);
        return this.valorRepositorio.remove(datoARemover);
    }


}