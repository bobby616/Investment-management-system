import {MigrationInterface, QueryRunner} from "typeorm";

export class last1549527047451 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `prices` (`id` varchar(255) NOT NULL, `opendate` datetime NOT NULL, `startprice` int NOT NULL, `endprice` int NOT NULL, `highprice` int NOT NULL, `lowprice` int NOT NULL, `companyId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `companies` CHANGE `closedate` `closedate` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `opendate` `opendate` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `closedate` `closedate` datetime NULL");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `closePrice` `closePrice` int NULL");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `result` `result` int NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `dateregistered` `dateregistered` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `clients` CHANGE `dateregistered` `dateregistered` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `prices` ADD CONSTRAINT `FK_e4ac7a6865d8c92ef5137df5a41` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `prices` DROP FOREIGN KEY `FK_e4ac7a6865d8c92ef5137df5a41`");
        await queryRunner.query("ALTER TABLE `clients` CHANGE `dateregistered` `dateregistered` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `dateregistered` `dateregistered` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `result` `result` int NULL");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `closePrice` `closePrice` int NULL");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `closedate` `closedate` datetime(0) NULL");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `opendate` `opendate` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `companies` CHANGE `closedate` `closedate` datetime(0) NOT NULL");
        await queryRunner.query("DROP TABLE `prices`");
    }

}
