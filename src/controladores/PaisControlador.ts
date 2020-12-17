import { JsonController, Get, Param, Post, Body, Put, Delete } from "routing-controllers";
import { getRepository } from "typeorm";
import { Pais } from "../entity/Pais";

@JsonController()
export class PaisControlador {

    private paisRepositorio = getRepository(Pais);

    @Get("/pais")
    getAll() {
        return this.paisRepositorio.find({ relations: ['provincias'] });
    }

    @Get("/pais/:id")
    // @OnUndefined(UserNotFoundError)
    getOne(@Param("id") id: number) {
        console.log('Id ' + id.toString.length)
        return this.paisRepositorio.findOne(id);
    }

    @Post("/pais")
    post(@Body() pais: Pais) {
        return this.paisRepositorio.save(pais);
    }

    @Put("/pais/:id")
    put(@Param("id") id: number, @Body() pais: Pais) {
        console.log(pais);
        return this.paisRepositorio.update(id, pais);
    }

    @Delete("/pais/:id")
    async remove(@Param("id") id: number) {
        let paisToRemove = await this.paisRepositorio.findOne(id);
        return this.paisRepositorio.remove(paisToRemove);
    }


}