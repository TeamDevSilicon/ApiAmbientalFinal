import { JsonController, Get, OnUndefined, Param, Post, Body, Put, Delete } from "routing-controllers";
import { getRepository } from "typeorm";
import { User } from "../entity/User";


@JsonController()
export class UserControlador {

    private userRepositorio = getRepository(User);

    @Get("/usuarios")
    getAll() {
        return this.userRepositorio.find(/* { relations: ['hijos', 'hijos.horario', 'hijos.horario.trayecto', 'userapp'] } */);
    }

    @Get("/usuarios/:id")
    // @OnUndefined(UserNotFoundError)
    getOne(@Param("id") id: number) {
        console.log('Id ' + id.toString.length)
        return this.userRepositorio.findOne(id);
    }

    @Post("/usuarios")
    post(@Body() user: any) {
        return this.userRepositorio.save(user);
    }

    @Put("/usuarios/:id")
    put(@Param("id") id: number, @Body() user: any) {
        return this.userRepositorio.update(id, user);
    }

    @Delete("/usuarios/:id")
    async remove(@Param("id") id: number) {
        let userToRemove = await this.userRepositorio.findOne(id);
        return this.userRepositorio.remove(userToRemove);
    }

    // @Get("/tutorPorUsuario/:id")
    // @OnUndefined(UserNotFoundError)
    // async devolverTutorPorIdDeUsuario(@Param("id") id: number) {
    //     console.log("idUsuario " + id);
    //     // return this.tutorRepositorio
    //     //     .createQueryBuilder("user")
    //     //     .where("user.nombreUsuario = :nombreUsuario AND user.claveUsuario = :claveUsuario", { nombreUsuario: usuario, claveUsuario: clave })
    //     //     .getOne();
    //     const tutor = await this.tutorRepositorio.findOne({
    //         relations: ['hijos', 'hijos.observaciones', 'hijos.notificaciones', 'hijos.notificaciones.estado', 'hijos.notificaciones.tipo', 'hijos.horario', 'hijos.horario.division', 'hijos.horario.turno', 'hijos.horario.trayecto'],
    //         where: {
    //             userapp: id
    //         }
    //     });
    //     console.log(tutor);
    //     // relations: ['nivel', 'tutor', 'tutor.hijos', 'tutor.hijos.observaciones', 'tutor.hijos.notificaciones', 'tutor.hijos.notificaciones.estado', 'tutor.hijos.notificaciones.tipo', 'tutor.hijos.horario', 'tutor.hijos.horario.division', 'tutor.hijos.horario.turno', 'tutor.hijos.horario.trayecto'],
    //     return tutor;
    // }

    // @Get("/tutorPorDniYSinUsuario/:dni")
    // //@OnUndefined(UserNotFoundError)
    // async devolverTutorSiNoTieneUsuario(@Param("dni") dni: number) {
    //     console.log("dni " + dni);
    //     const tutor = await this.tutorRepositorio.findOne({
    //         where: {
    //             Dni_Tutor: dni, userapp: IsNull()
    //         }
    //     });
    //     console.log(tutor);
    //     return tutor ? true : false;
    // }


}