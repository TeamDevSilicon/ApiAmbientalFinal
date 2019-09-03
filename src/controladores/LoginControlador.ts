import { JsonController, Get, Param, Post, Put, Body, Delete } from "routing-controllers";
import { getRepository } from "typeorm";
import { UsuarioAdmin } from "../entity/UsuarioAdmin";
import { UsuarioInstitucion } from "../entity/UsuarioInstitucion";

@JsonController()
export class LoginControlador {

    private adminRepositorio = getRepository(UsuarioAdmin);
    private institucionRepositorio = getRepository(UsuarioInstitucion);


    @Get("/login/:usuario/:clave")
    async getLogin(@Param("usuario") usuario: string, @Param("clave") clave: string) {
        return this.controlarUsuario(usuario, clave);
    }

    async controlarUsuario(@Param("usuario") usuario: string, @Param("clave") clave: string) {
        let retorno: Array<any> = [];
        let admin = await this.adminRepositorio.findOne({
            where: {
                usuario: usuario,
                clave: clave
            }
        });

        let institucion = await this.institucionRepositorio.findOne({
            relations: ['institucion'],
            where: {
                usuario: usuario,
                clave: clave
            }
        });

        if (admin) {
            retorno.push(admin);
            retorno.push('admin');
            return retorno;
        }
        if (institucion) {
            retorno.push(institucion);
            retorno.push('institucion');
            return retorno;
        }
        return false;
    }


    @Get("/login")
    getAll() {
        return this.adminRepositorio.find();
    }

}