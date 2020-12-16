import { JsonController, Get, Param, Post, Put, Body, Delete } from "routing-controllers";
import { getRepository } from "typeorm";
import { Institucion } from "../entity/Institucion";

@JsonController()
export class InstitucionControlador {

    private institucionRepositorio = getRepository(Institucion);

    @Get("/institucion")
    getAll() {
        return this.institucionRepositorio.find(/* { relations: ['prototipos'] } */);
    }

    @Get("/institucion/:id")
    // @OnUndefined(institucionNotFoundError)
    getOne(@Param("id") id: number) {
        console.log('Id ' + id.toString.length)
        return this.institucionRepositorio.findOne(id/* , {
            relations: ['datosAmbientales', 'datosAmbientales.tipoDato']
        } */);
    }

    @Post("/institucion")
    post(@Body() institucion: Institucion) {
        return this.institucionRepositorio.save(institucion);
    }

    @Put("/institucion/:id")
    put(@Param("id") id: number, @Body() institucion: any) {
        return "Updating a institucion...";
    }

    @Delete("/institucion/:id")
    async remove(@Param("id") id: number) {
        let datoARemover = await this.institucionRepositorio.findOne(id);
        return this.institucionRepositorio.remove(datoARemover);
    }


}