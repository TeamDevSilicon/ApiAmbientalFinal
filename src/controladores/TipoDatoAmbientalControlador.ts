import { JsonController, Get, Param, Post, Put, Body, Delete } from "routing-controllers";
import { getRepository } from "typeorm";
import { TipoDatoAmbiental } from "../entity/TipoDatoAmbiental";


@JsonController()
export class TipoDatoAmbientalControlador {

    private tipoRepositorio = getRepository(TipoDatoAmbiental);

    @Get("/tipoDato")
    getAll() {
        return this.tipoRepositorio.find();
    }

    @Get("/tipoDato/:id")
    // @OnUndefined(UserNotFoundError)
    getOne(@Param("id") id: number) {
        console.log('Id ' + id.toString.length)
        return this.tipoRepositorio.findOne(id);
    }

    @Post("/tipoDato")
    post(@Body() user: any) {
        return this.tipoRepositorio.save(user);
    }

    @Put("/tipoDato/:id")
    put(@Param("id") id: number, @Body() user: any) {
        return "Updating a user...";
    }

    @Delete("/tipoDato/:id")
    async remove(@Param("id") id: number) {
        let datoARemover = await this.tipoRepositorio.findOne(id);
        return this.tipoRepositorio.remove(datoARemover);
    }

    @Get("/tipoDatos")
    async crearTiposDeDatos() {
        //const element = array[index];
        let tipos = await this.tipoRepositorio.find();
        await this.tipoRepositorio.createQueryBuilder().delete().execute();
        let datoAmbiental1 = new TipoDatoAmbiental("temperatura ambiente");
        let datoAmbiental2 = new TipoDatoAmbiental("humedad ambiente");
        let datoAmbiental3 = new TipoDatoAmbiental("lluvia");
        let datoAmbiental4 = new TipoDatoAmbiental("luz");
        let datoAmbiental5 = new TipoDatoAmbiental("otro");

        await this.tipoRepositorio.save(datoAmbiental1);
        await this.tipoRepositorio.save(datoAmbiental2);
        await this.tipoRepositorio.save(datoAmbiental3);
        await this.tipoRepositorio.save(datoAmbiental4);
        await this.tipoRepositorio.save(datoAmbiental5);
        return ""/* this.tipoRepositorio.save() */;
    }



}