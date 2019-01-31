import {MigrationInterface, QueryRunner} from "typeorm";

export class Ordersservice1548862623694 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `orders` DROP COLUMN `buyprice`");
        await queryRunner.query("ALTER TABLE `orders` DROP COLUMN `sellprice`");
        await queryRunner.query("ALTER TABLE `orders` ADD `openPrice` int NOT NULL");
        await queryRunner.query("ALTER TABLE `orders` ADD `closePrice` int NULL");
        await queryRunner.query("ALTER TABLE `orders` ADD `result` int NULL");
        await queryRunner.query("ALTER TABLE `orders` ADD `direction` varchar(255) NOT NULL");
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
        await queryRunner.query("ALTER TABLE `orders` DROP COLUMN `direction`");
        await queryRunner.query("ALTER TABLE `orders` DROP COLUMN `result`");
        await queryRunner.query("ALTER TABLE `orders` DROP COLUMN `closePrice`");
        await queryRunner.query("ALTER TABLE `orders` DROP COLUMN `openPrice`");
        await queryRunner.query("ALTER TABLE `orders` ADD `sellprice` int NOT NULL");
        await queryRunner.query("ALTER TABLE `orders` ADD `buyprice` int NOT NULL");
    }

}
