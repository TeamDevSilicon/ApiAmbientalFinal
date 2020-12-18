import { JsonController, Get, Param, Post, Body, Put, Delete } from "routing-controllers";
import { getRepository } from "typeorm";
import { Departamento } from "../entity/Departamento";

@JsonController()
export class DepartamentoControlador {

    private departamentoRepositorio = getRepository(Departamento);

    @Get("/departamento")
    getAll() {
        return this.departamentoRepositorio.find({ relations: ['localidades'] });
    }

    @Get("/departamento/:id")
    // @OnUndefined(UserNotFoundError)
    getOne(@Param("id") id: number) {
        console.log('Id ' + id.toString.length)
        return this.departamentoRepositorio.findOne(id);
    }

    @Post("/departamento")
    post(@Body() departamento: Departamento) {
        return this.departamentoRepositorio.save(departamento);
    }

    @Put("/departamento/:id")
    put(@Param("id") id: number, @Body() departamento: Departamento) {
        return this.departamentoRepositorio.update(id, departamento);
    }

    @Delete("/departamento/:id")
    async remove(@Param("id") id: number) {
        let departamentoToRemove = await this.departamentoRepositorio.findOne(id);
        return this.departamentoRepositorio.remove(departamentoToRemove);
    }


}