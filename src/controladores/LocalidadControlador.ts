import { JsonController, Get, Param, Post, Body, Put, Delete } from "routing-controllers";
import { getRepository } from "typeorm";
import { Departamento } from "../entity/Departamento";
import { Localidad } from "../entity/Localidad";

@JsonController()
export class LocalidadControlador {

    private localidadRepositorio = getRepository(Localidad);

    @Get("/localidad")
    getAll() {
        return this.localidadRepositorio.find();
    }

    @Get("/localidad/:id")
    // @OnUndefined(UserNotFoundError)
    getOne(@Param("id") id: number) {
        console.log('Id ' + id.toString.length)
        return this.localidadRepositorio.findOne(id);
    }

    @Post("/localidad")
    post(@Body() localidad: Localidad) {
        return this.localidadRepositorio.save(localidad);
    }

    @Put("/localidad/:id")
    put(@Param("id") id: number, @Body() localidad: Localidad) {
        return this.localidadRepositorio.update(id, localidad);
    }

    @Delete("/localidad/:id")
    async remove(@Param("id") id: number) {
        let localidadToRemove = await this.localidadRepositorio.findOne(id);
        return this.localidadRepositorio.remove(localidadToRemove);
    }


}