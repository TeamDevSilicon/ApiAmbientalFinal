import { JsonController, Get, Param, Post, Put, Body, Delete } from "routing-controllers";
import { getRepository } from "typeorm";
import { Institucion } from "../entity/Institucion";

@JsonController()
export class InstitucionControlador {

    private institucionRepositorio = getRepository(Institucion);

    @Get("/institucion")
    getAll() {
        return this.institucionRepositorio.find({ relations: ['departamento', 'localidad'] });
    }

    @Get("/institucionTemporal")
    async getAll2() {

        let dato = await this.institucionRepositorio.createQueryBuilder("institucion")
            .select("institucion.id", "id")
            .addSelect("institucion.nombre", "nombre")
            .addSelect("latitud")
            .addSelect("longitud")
            .addSelect("cue")
            .addSelect("departamento.nombre", "departamento")
            .addSelect("localidad.nombre", "localidad")
            .innerJoin("institucion.departamento", "departamento")
            .innerJoin("institucion.localidad", "localidad")
            .getRawMany()

        return dato;
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
    put(@Param("id") id: number, @Body() institucion: Institucion) {
        console.log(institucion);
        return this.institucionRepositorio.update(id, institucion);
    }

    @Delete("/institucion/:id")
    async remove(@Param("id") id: number) {
        let datoARemover = await this.institucionRepositorio.findOne(id);
        return this.institucionRepositorio.remove(datoARemover);
    }


}