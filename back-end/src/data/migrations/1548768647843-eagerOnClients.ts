import {MigrationInterface, QueryRunner} from "typeorm";

export class eagerOnClients1548768647843 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `prices` DROP FOREIGN KEY `FK_e4ac7a6865d8c92ef5137df5a41`");
        await queryRunner.query("ALTER TABLE `prices` CHANGE `opendate` `opendate` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `prices` CHANGE `companyId` `companyId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `companies` DROP FOREIGN KEY `FK_d10b3310c1016d05c123fdd08e1`");
        await queryRunner.query("ALTER TABLE `companies` CHANGE `closedate` `closedate` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `companies` CHANGE `industryId` `industryId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `orders` DROP FOREIGN KEY `FK_1457f286d91f271313fded23e53`");
        await queryRunner.query("ALTER TABLE `orders` DROP FOREIGN KEY `FK_b6fe899d5ca4a3f5925463990d1`");
        await queryRunner.query("ALTER TABLE `orders` DROP FOREIGN KEY `FK_37b50c6e3b13ecaf98e4306c2d7`");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `opendate` `opendate` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `closedate` `closedate` datetime NULL");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `clientId` `clientId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `companyId` `companyId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `statusId` `statusId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_368e146b785b574f42ae9e53d5e`");
        await queryRunner.query("ALTER TABLE `users` CHANGE `dateregistered` `dateregistered` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `roleId` `roleId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `clients` DROP FOREIGN KEY `FK_b298c69fe5af01a26569338853f`");
        await queryRunner.query("ALTER TABLE `clients` DROP FOREIGN KEY `FK_13b1464a61422b2f926bf3aa4d9`");
        await queryRunner.query("ALTER TABLE `clients` DROP FOREIGN KEY `FK_b8e64b50749430c132cce33c38b`");
        await queryRunner.query("ALTER TABLE `clients` CHANGE `dateregistered` `dateregistered` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `clients` CHANGE `managerId` `managerId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `clients` CHANGE `watchlistId` `watchlistId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `clients` CHANGE `fundsId` `fundsId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `prices` ADD CONSTRAINT `FK_e4ac7a6865d8c92ef5137df5a41` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`)");
        await queryRunner.query("ALTER TABLE `companies` ADD CONSTRAINT `FK_d10b3310c1016d05c123fdd08e1` FOREIGN KEY (`industryId`) REFERENCES `industries`(`id`)");
        await queryRunner.query("ALTER TABLE `orders` ADD CONSTRAINT `FK_1457f286d91f271313fded23e53` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`)");
        await queryRunner.query("ALTER TABLE `orders` ADD CONSTRAINT `FK_b6fe899d5ca4a3f5925463990d1` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`)");
        await queryRunner.query("ALTER TABLE `orders` ADD CONSTRAINT `FK_37b50c6e3b13ecaf98e4306c2d7` FOREIGN KEY (`statusId`) REFERENCES `orderstatus`(`id`)");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_368e146b785b574f42ae9e53d5e` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`)");
        await queryRunner.query("ALTER TABLE `clients` ADD CONSTRAINT `FK_b298c69fe5af01a26569338853f` FOREIGN KEY (`managerId`) REFERENCES `users`(`id`)");
        await queryRunner.query("ALTER TABLE `clients` ADD CONSTRAINT `FK_13b1464a61422b2f926bf3aa4d9` FOREIGN KEY (`watchlistId`) REFERENCES `watchlists`(`id`)");
        await queryRunner.query("ALTER TABLE `clients` ADD CONSTRAINT `FK_b8e64b50749430c132cce33c38b` FOREIGN KEY (`fundsId`) REFERENCES `funds`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `clients` DROP FOREIGN KEY `FK_b8e64b50749430c132cce33c38b`");
        await queryRunner.query("ALTER TABLE `clients` DROP FOREIGN KEY `FK_13b1464a61422b2f926bf3aa4d9`");
        await queryRunner.query("ALTER TABLE `clients` DROP FOREIGN KEY `FK_b298c69fe5af01a26569338853f`");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_368e146b785b574f42ae9e53d5e`");
        await queryRunner.query("ALTER TABLE `orders` DROP FOREIGN KEY `FK_37b50c6e3b13ecaf98e4306c2d7`");
        await queryRunner.query("ALTER TABLE `orders` DROP FOREIGN KEY `FK_b6fe899d5ca4a3f5925463990d1`");
        await queryRunner.query("ALTER TABLE `orders` DROP FOREIGN KEY `FK_1457f286d91f271313fded23e53`");
        await queryRunner.query("ALTER TABLE `companies` DROP FOREIGN KEY `FK_d10b3310c1016d05c123fdd08e1`");
        await queryRunner.query("ALTER TABLE `prices` DROP FOREIGN KEY `FK_e4ac7a6865d8c92ef5137df5a41`");
        await queryRunner.query("ALTER TABLE `clients` CHANGE `fundsId` `fundsId` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `clients` CHANGE `watchlistId` `watchlistId` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `clients` CHANGE `managerId` `managerId` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `clients` CHANGE `dateregistered` `dateregistered` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `clients` ADD CONSTRAINT `FK_b8e64b50749430c132cce33c38b` FOREIGN KEY (`fundsId`) REFERENCES `funds`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `clients` ADD CONSTRAINT `FK_13b1464a61422b2f926bf3aa4d9` FOREIGN KEY (`watchlistId`) REFERENCES `watchlists`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `clients` ADD CONSTRAINT `FK_b298c69fe5af01a26569338853f` FOREIGN KEY (`managerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `users` CHANGE `roleId` `roleId` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `users` CHANGE `dateregistered` `dateregistered` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_368e146b785b574f42ae9e53d5e` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `statusId` `statusId` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `companyId` `companyId` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `clientId` `clientId` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `closedate` `closedate` datetime(0) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `opendate` `opendate` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `orders` ADD CONSTRAINT `FK_37b50c6e3b13ecaf98e4306c2d7` FOREIGN KEY (`statusId`) REFERENCES `orderstatus`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `orders` ADD CONSTRAINT `FK_b6fe899d5ca4a3f5925463990d1` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `orders` ADD CONSTRAINT `FK_1457f286d91f271313fded23e53` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `companies` CHANGE `industryId` `industryId` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `companies` CHANGE `closedate` `closedate` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `companies` ADD CONSTRAINT `FK_d10b3310c1016d05c123fdd08e1` FOREIGN KEY (`industryId`) REFERENCES `industries`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `prices` CHANGE `companyId` `companyId` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `prices` CHANGE `opendate` `opendate` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `prices` ADD CONSTRAINT `FK_e4ac7a6865d8c92ef5137df5a41` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
    }

}
