import { JsonController, Get, Param, Post, Put, Body, Delete } from "routing-controllers";
import { getRepository } from "typeorm";
import { PrototipoPorInstitucion } from "../entity/PrototipoPorInstitucion";
// import { protoPorInst } from "../entity/protoPorInst";


@JsonController()
export class PrototipoPorInstitucionControlador {

    private protoPorInstRepositorio = getRepository(PrototipoPorInstitucion);

    @Get("/protoPorInst")
    getAll() {
        return this.protoPorInstRepositorio.find({ order: { idPrototipo: "ASC" } });
    }

    @Get("/protoPorInst/:id")
    // @OnUndefined(UserNotFoundError)
    getOne(@Param("id") id: number) {
        console.log('Id ' + id)
        return this.protoPorInstRepositorio.find({ idInstitucion: id });
    }

    @Post("/protoPorInst")
    post(@Body() user: any) {
        return this.protoPorInstRepositorio.save(user);
    }

    @Put("/protoPorInst/:id")
    put(@Param("id") id: number, @Body() user: any) {
        return "Updating a user...";
    }

    @Delete("/protoPorInst/:id")
    async remove(@Param("id") id: number) {
        let datoARemover = await this.protoPorInstRepositorio.findOne(id);
        return this.protoPorInstRepositorio.remove(datoARemover);
    }

}