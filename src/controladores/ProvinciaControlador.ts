import { JsonController, Get, Param, Post, Body, Put, Delete } from "routing-controllers";
import { getRepository } from "typeorm";
import { Provincia } from "../entity/Provincia";

@JsonController()
export class ProvinciaControlador {

    private provinciaRepositorio = getRepository(Provincia);

    @Get("/provincia")
    getAll() {
        return this.provinciaRepositorio.find({ relations: ['departamentos'] });
    }

    @Get("/provincia/:id")
    // @OnUndefined(UserNotFoundError)
    getOne(@Param("id") id: number) {
        console.log('Id ' + id.toString.length)
        return this.provinciaRepositorio.findOne(id);
    }

    @Post("/provincia")
    post(@Body() provincia: Provincia) {
        return this.provinciaRepositorio.save(provincia);
    }

    @Put("/provincia/:id")
    put(@Param("id") id: number, @Body() provincia: Provincia) {
        return this.provinciaRepositorio.update(id, provincia);
    }

    @Delete("/provincia/:id")
    async remove(@Param("id") id: number) {
        let provinciaToRemove = await this.provinciaRepositorio.findOne(id);
        return this.provinciaRepositorio.remove(provinciaToRemove);
    }


}