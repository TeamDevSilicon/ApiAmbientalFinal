import { JsonController, Get, Post, Param, Body, Put, Delete } from "routing-controllers";
import { getRepository } from "typeorm";
import { DatoAmbiental } from "../entity/DatoAmbiental";
import { TipoDatoAmbiental } from "../entity/TipoDatoAmbiental";
import { Sensor } from "../entity/Sensor";
import { Prototipo } from "../entity/Prototipo";
import { Institucion } from "../entity/Institucion";


@JsonController()
export class CrearDatos {

    private datoRepositorio = getRepository(DatoAmbiental);
    private sensorRepositorio = getRepository(Sensor);
    private prototipoRepositorio = getRepository(Prototipo);
    private institucionRepositorio = getRepository(Institucion);
    private tipoRepositorio = getRepository(TipoDatoAmbiental);

    @Get("/crear")
    async crear() {
        await this.sensorRepositorio.save(new Sensor("sensor1"));
        await this.prototipoRepositorio.save(new Prototipo("prototipo1"));
        await this.institucionRepositorio.save(new Institucion("institucion1"));
        await this.tipoRepositorio.save([new TipoDatoAmbiental("temperatura ambiente"), new TipoDatoAmbiental("humedad ambiente"),
        new TipoDatoAmbiental("lluvia"), new TipoDatoAmbiental("luz"), new TipoDatoAmbiental("otro")]);
        for (let index = 1; index < 6; index++) {
            let datoAmbiental = new DatoAmbiental();
            datoAmbiental.$ubicacion = "32123123123- 123321312"
            datoAmbiental.$valor = index + 100 + index;
            datoAmbiental.$institucion = await this.institucionRepositorio.findOne(1);
            datoAmbiental.prototipo = await this.prototipoRepositorio.findOne(1);
            datoAmbiental.$sensor = await this.sensorRepositorio.findOne(1);
            datoAmbiental.tipoDato = await this.tipoRepositorio.findOne(index);
            console.log(datoAmbiental);
            await this.datoRepositorio.save(datoAmbiental);
        }

        return "D";
    }

    // @Get("/datoAmbiental")
    // getAll() {
    //     return this.datoRepositorio.find({ relations: ['prototipo', 'sensor', 'tipoDato', 'institucion'], order: { id: "DESC" } });
    // }

    // @Get("/datoAmbiental8")
    // getUltimos8() {
    //     return this.datoRepositorio.find({
    //         relations: ['prototipo', 'sensor', 'tipoDato', 'institucion'], order: { id: "DESC" },
    //         skip: 0,
    //         take: 8
    //     });
    // }

    // @Get("/datoAmbiental/:id")
    // // @OnUndefined(datoAmbientalNotFoundError)
    // getOne(@Param("id") id: number) {
    //     console.log('Id ' + id.toString.length)
    //     return this.datoRepositorio.findOne(id);
    // }

    // @Get("/datoAmbientalPorTipo/:id")
    // // @OnUndefined(datoAmbientalNotFoundError)
    // devolverDatoAmbientalPorTipoDato(@Param("id") id: number) {
    //     console.log('Id ' + id.toString.length)
    //     return this.datoRepositorio.find({
    //         relations: ['prototipo', 'sensor', 'tipoDato', 'institucion'],
    //         where: {
    //             tipoDato: id
    //         }
    //     });
    // }

    // @Post("/datoAmbiental")
    // post(@Body() datoAmbiental: any) {
    //     // let fecha = new Date();
    //     // let fullName: string = JSON.stringify(datoAmbiental);
    //     // console.log('Dato A ' + fullName);
    //     // console.log('Dato B' + datoAmbiental);
    //     // // console.log(Object.keys(datoAmbiental));
    //     // Object.keys(datoAmbiental).forEach(e => console.log(`key=${e}  value=${datoAmbiental[e]}`));
    //     // // console.log(Object.values(datoAmbiental));
    //     return this.datoRepositorio.save(datoAmbiental);
    //     //  "";
    // }

    // @Put("/datoAmbiental/:id")
    // put(@Param("id") id: number, @Body() datoAmbiental: any) {
    //     return "Updating a datoAmbiental...";
    // }

    // @Delete("/datoAmbiental/:id")
    // async remove(@Param("id") id: number) {
    //     let datoARemover = await this.datoRepositorio.findOne(id);
    //     return this.datoRepositorio.remove(datoARemover);
    // }
}