import {MigrationInterface, QueryRunner} from "typeorm";

export class final1547476106849 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `prices` CHANGE `opendate` `opendate` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `companies` CHANGE `closedate` `closedate` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `opendate` `opendate` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `closedate` `closedate` datetime NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `dateregistered` `dateregistered` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `clients` CHANGE `dateregistered` `dateregistered` datetime NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `clients` CHANGE `dateregistered` `dateregistered` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `dateregistered` `dateregistered` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `closedate` `closedate` datetime(0) NULL");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `opendate` `opendate` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `companies` CHANGE `closedate` `closedate` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `prices` CHANGE `opendate` `opendate` datetime(0) NOT NULL");
    }

}
