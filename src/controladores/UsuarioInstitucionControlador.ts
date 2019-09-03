import { JsonController, Get, Param, Post, Put, Body, Delete } from "routing-controllers";
import { getRepository } from "typeorm";
import { UsuarioAdmin } from "../entity/UsuarioAdmin";
import { UsuarioInstitucion } from "../entity/UsuarioInstitucion";

@JsonController()
export class UsuarioInstitucionControlador {

    private institucionRepositorio = getRepository(UsuarioInstitucion);

    @Get("/usuarioInstitucion")
    getAll() {
        return this.institucionRepositorio.find({ relations: ['institucion'] });
    }

    @Get("/usuarioInstitucion/:id")
    // @OnUndefined(institucionNotFoundError)
    getOne(@Param("id") id: number) {
        console.log('Id ' + id.toString.length)
        return this.institucionRepositorio.findOne(id);
    }

    @Post("/usuarioInstitucion")
    post(@Body() usuarioInstitucion: UsuarioInstitucion) {
        return this.institucionRepositorio.save(usuarioInstitucion);
    }

    @Put("/usuarioInstitucion/:id")
    put(@Param("id") id: number, @Body() admin: any) {
        return "Updating a institucion...";
    }

    @Delete("/usuarioInstitucion/:id")
    async remove(@Param("id") id: number) {
        let datoARemover = await this.institucionRepositorio.findOne(id);
        return this.institucionRepositorio.remove(datoARemover);
    }

}