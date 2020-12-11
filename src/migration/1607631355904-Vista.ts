import { MigrationInterface, QueryRunner } from "typeorm";

export class Vista1607631355904 implements MigrationInterface {
    name = 'Vista1607631355904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DELETE FROM `ambiente3`.`typeorm_metadata` WHERE `type` = 'VIEW' AND `schema` = ? AND `name` = ?", ["ambiente3", "prototipo_por_institucion"]);
        await queryRunner.query("DROP VIEW `prototipo_por_institucion`");
        await queryRunner.query("CREATE VIEW `prototipo_por_institucion` AS SELECT DISTINCT `prototipo`.`id_prototipo` AS `idPrototipo`, `prototipo`.`nombre` AS `nombrePrototipo`, `institucion`.`id_institucion` AS `idInstitucion` FROM `dato_ambiental` `datoAmbiental` INNER JOIN `prototipo` `prototipo` ON `prototipo`.`id_prototipo`=`datoAmbiental`.`prototipoId`  INNER JOIN `institucion` `institucion` ON `institucion`.`id_institucion`=`datoAmbiental`.`institucionId` WHERE `datoAmbiental`.`institucionId` = `institucion`.`id_institucion`");
        await queryRunner.query("INSERT INTO `ambiente3`.`typeorm_metadata`(`type`, `schema`, `name`, `value`) VALUES (?, ?, ?, ?)", ["VIEW", "ambiente3", "prototipo_por_institucion", "SELECT DISTINCT `prototipo`.`id_prototipo` AS `idPrototipo`, `prototipo`.`nombre` AS `nombrePrototipo`, `institucion`.`id_institucion` AS `idInstitucion` FROM `dato_ambiental` `datoAmbiental` INNER JOIN `prototipo` `prototipo` ON `prototipo`.`id_prototipo`=`datoAmbiental`.`prototipoId`  INNER JOIN `institucion` `institucion` ON `institucion`.`id_institucion`=`datoAmbiental`.`institucionId` WHERE `datoAmbiental`.`institucionId` = `institucion`.`id_institucion`"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DELETE FROM `ambiente3`.`typeorm_metadata` WHERE `type` = 'VIEW' AND `schema` = ? AND `name` = ?", ["ambiente3", "prototipo_por_institucion"]);
        await queryRunner.query("DROP VIEW `prototipo_por_institucion`");
        await queryRunner.query("CREATE VIEW `prototipo_por_institucion` AS SELECT DISTINCT `prototipo`.`id_prototipo` AS `idPrototipo`, `prototipo`.`nombre` AS `nombrePrototipo` FROM `dato_ambiental` `datoAmbiental` INNER JOIN `prototipo` `prototipo` ON `prototipo`.`id_prototipo`=`datoAmbiental`.`prototipoId`  INNER JOIN `institucion` `institucion` ON `institucion`.`id_institucion`=`datoAmbiental`.`institucionId` WHERE `datoAmbiental`.`institucionId` = `institucion`.`id_institucion`");
        await queryRunner.query("INSERT INTO `ambiente3`.`typeorm_metadata`(`type`, `schema`, `name`, `value`) VALUES (?, ?, ?, ?)", ["VIEW", "ambiente3", "prototipo_por_institucion", "SELECT DISTINCT `prototipo`.`id_prototipo` AS `idPrototipo`, `prototipo`.`nombre` AS `nombrePrototipo` FROM `dato_ambiental` `datoAmbiental` INNER JOIN `prototipo` `prototipo` ON `prototipo`.`id_prototipo`=`datoAmbiental`.`prototipoId`  INNER JOIN `institucion` `institucion` ON `institucion`.`id_institucion`=`datoAmbiental`.`institucionId` WHERE `datoAmbiental`.`institucionId` = `institucion`.`id_institucion`"]);
    }

}
