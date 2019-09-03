import { JsonController, Get, Param, Post, Put, Body, Delete } from "routing-controllers";
import { getRepository } from "typeorm";
import { UsuarioAdmin } from "../entity/UsuarioAdmin";

@JsonController()
export class AdminControlador {

    private adminRepositorio = getRepository(UsuarioAdmin);

    @Get("/admin")
    getAll() {
        return this.adminRepositorio.find(/* { relations: ['datosAmbientales'] } */);
    }

    @Get("/admin/:id")
    // @OnUndefined(institucionNotFoundError)
    getOne(@Param("id") id: number) {
        console.log('Id ' + id.toString.length)
        return this.adminRepositorio.findOne(id);
    }

    @Post("/admin")
    post(@Body() admin: UsuarioAdmin) {
        return this.adminRepositorio.save(admin);
    }

    @Put("/admin/:id")
    put(@Param("id") id: number, @Body() admin: any) {
        return "Updating a institucion...";
    }

    @Delete("/admin/:id")
    async remove(@Param("id") id: number) {
        let datoARemover = await this.adminRepositorio.findOne(id);
        return this.adminRepositorio.remove(datoARemover);
    }

}