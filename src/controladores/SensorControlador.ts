import { JsonController, Get, Param, Post, Put, Body, Delete } from "routing-controllers";
import { getRepository } from "typeorm";
import { Sensor } from "../entity/Sensor";


@JsonController()
export class SensorControlador {

    private sensorRepositorio = getRepository(Sensor);

    @Get("/sensor")
    getAll() {
        return this.sensorRepositorio.find();
    }

    @Get("/sensor/:id")
    // @OnUndefined(UserNotFoundError)
    getOne(@Param("id") id: number) {
        console.log('Id ' + id.toString.length)
        return this.sensorRepositorio.findOne(id);
    }

    @Post("/sensor")
    post(@Body() user: any) {
        return this.sensorRepositorio.save(user);
    }

    @Put("/sensor/:id")
    put(@Param("id") id: number, @Body() user: any) {
        return "Updating a user...";
    }

    @Delete("/sensor/:id")
    async remove(@Param("id") id: number) {
        let datoARemover = await this.sensorRepositorio.findOne(id);
        return this.sensorRepositorio.remove(datoARemover);
    }

}