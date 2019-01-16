import {MigrationInterface, QueryRunner} from "typeorm";

export class ywewe1547474987263 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `funds` (`id` varchar(255) NOT NULL, `currentamount` int NOT NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `watchlists` (`id` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `industries` (`id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL DEFAULT '', UNIQUE INDEX `IDX_447df075c342af02a92901dc81` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `prices` (`id` varchar(255) NOT NULL, `opendate` datetime NOT NULL, `startprice` int NOT NULL, `endprice` int NOT NULL, `highprice` int NOT NULL, `lowprice` int NOT NULL, `companyId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `companies` (`id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL DEFAULT '', `abbr` varchar(255) NOT NULL DEFAULT '', `icon` varchar(255) NOT NULL DEFAULT '', `ceo` varchar(255) NOT NULL DEFAULT '', `address` varchar(255) NOT NULL DEFAULT '', `closedate` datetime NOT NULL, `industryId` varchar(255) NULL, UNIQUE INDEX `IDX_3dacbb3eb4f095e29372ff8e13` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `orderstatus` (`id` varchar(255) NOT NULL, `statusname` varchar(255) NOT NULL DEFAULT '', UNIQUE INDEX `IDX_22784d330c9d3947505d090d4d` (`statusname`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `orders` (`id` varchar(255) NOT NULL, `opendate` datetime NOT NULL, `closedate` datetime NULL, `buyprice` int NOT NULL, `sellprice` int NOT NULL, `units` int NOT NULL, `clientId` varchar(255) NULL, `companyId` varchar(255) NULL, `statusId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `roles` (`id` varchar(255) NOT NULL, `rolename` varchar(255) NOT NULL DEFAULT '', UNIQUE INDEX `IDX_2db66a4809c8d953c3cd1975c5` (`rolename`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(255) NOT NULL, `fullname` varchar(255) NOT NULL DEFAULT '', `dateregistered` datetime NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL DEFAULT '', `roleId` varchar(255) NULL, UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `clients` (`id` varchar(255) NOT NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `age` int NOT NULL, `address` varchar(255) NOT NULL, `dateregistered` datetime NOT NULL, `email` varchar(255) NOT NULL, `managerId` varchar(255) NULL, `watchlistId` varchar(255) NULL, `fundsId` varchar(255) NULL, UNIQUE INDEX `IDX_b48860677afe62cd96e1265948` (`email`), UNIQUE INDEX `REL_13b1464a61422b2f926bf3aa4d` (`watchlistId`), UNIQUE INDEX `REL_b8e64b50749430c132cce33c38` (`fundsId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `watchlists_companies_companies` (`watchlistsId` varchar(255) NOT NULL, `companiesId` varchar(255) NOT NULL, PRIMARY KEY (`watchlistsId`, `companiesId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `prices` ADD CONSTRAINT `FK_e4ac7a6865d8c92ef5137df5a41` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`)");
        await queryRunner.query("ALTER TABLE `companies` ADD CONSTRAINT `FK_d10b3310c1016d05c123fdd08e1` FOREIGN KEY (`industryId`) REFERENCES `industries`(`id`)");
        await queryRunner.query("ALTER TABLE `orders` ADD CONSTRAINT `FK_1457f286d91f271313fded23e53` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`)");
        await queryRunner.query("ALTER TABLE `orders` ADD CONSTRAINT `FK_b6fe899d5ca4a3f5925463990d1` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`)");
        await queryRunner.query("ALTER TABLE `orders` ADD CONSTRAINT `FK_37b50c6e3b13ecaf98e4306c2d7` FOREIGN KEY (`statusId`) REFERENCES `orderstatus`(`id`)");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_368e146b785b574f42ae9e53d5e` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`)");
        await queryRunner.query("ALTER TABLE `clients` ADD CONSTRAINT `FK_b298c69fe5af01a26569338853f` FOREIGN KEY (`managerId`) REFERENCES `users`(`id`)");
        await queryRunner.query("ALTER TABLE `clients` ADD CONSTRAINT `FK_13b1464a61422b2f926bf3aa4d9` FOREIGN KEY (`watchlistId`) REFERENCES `watchlists`(`id`)");
        await queryRunner.query("ALTER TABLE `clients` ADD CONSTRAINT `FK_b8e64b50749430c132cce33c38b` FOREIGN KEY (`fundsId`) REFERENCES `funds`(`id`)");
        await queryRunner.query("ALTER TABLE `watchlists_companies_companies` ADD CONSTRAINT `FK_884a1822eee73af4b6b1c666ee5` FOREIGN KEY (`watchlistsId`) REFERENCES `watchlists`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `watchlists_companies_companies` ADD CONSTRAINT `FK_81550d986781ff339a0bf2270b3` FOREIGN KEY (`companiesId`) REFERENCES `companies`(`id`) ON DELETE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `watchlists_companies_companies` DROP FOREIGN KEY `FK_81550d986781ff339a0bf2270b3`");
        await queryRunner.query("ALTER TABLE `watchlists_companies_companies` DROP FOREIGN KEY `FK_884a1822eee73af4b6b1c666ee5`");
        await queryRunner.query("ALTER TABLE `clients` DROP FOREIGN KEY `FK_b8e64b50749430c132cce33c38b`");
        await queryRunner.query("ALTER TABLE `clients` DROP FOREIGN KEY `FK_13b1464a61422b2f926bf3aa4d9`");
        await queryRunner.query("ALTER TABLE `clients` DROP FOREIGN KEY `FK_b298c69fe5af01a26569338853f`");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_368e146b785b574f42ae9e53d5e`");
        await queryRunner.query("ALTER TABLE `orders` DROP FOREIGN KEY `FK_37b50c6e3b13ecaf98e4306c2d7`");
        await queryRunner.query("ALTER TABLE `orders` DROP FOREIGN KEY `FK_b6fe899d5ca4a3f5925463990d1`");
        await queryRunner.query("ALTER TABLE `orders` DROP FOREIGN KEY `FK_1457f286d91f271313fded23e53`");
        await queryRunner.query("ALTER TABLE `companies` DROP FOREIGN KEY `FK_d10b3310c1016d05c123fdd08e1`");
        await queryRunner.query("ALTER TABLE `prices` DROP FOREIGN KEY `FK_e4ac7a6865d8c92ef5137df5a41`");
        await queryRunner.query("DROP TABLE `watchlists_companies_companies`");
        await queryRunner.query("DROP INDEX `REL_b8e64b50749430c132cce33c38` ON `clients`");
        await queryRunner.query("DROP INDEX `REL_13b1464a61422b2f926bf3aa4d` ON `clients`");
        await queryRunner.query("DROP INDEX `IDX_b48860677afe62cd96e1265948` ON `clients`");
        await queryRunner.query("DROP TABLE `clients`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP INDEX `IDX_2db66a4809c8d953c3cd1975c5` ON `roles`");
        await queryRunner.query("DROP TABLE `roles`");
        await queryRunner.query("DROP TABLE `orders`");
        await queryRunner.query("DROP INDEX `IDX_22784d330c9d3947505d090d4d` ON `orderstatus`");
        await queryRunner.query("DROP TABLE `orderstatus`");
        await queryRunner.query("DROP INDEX `IDX_3dacbb3eb4f095e29372ff8e13` ON `companies`");
        await queryRunner.query("DROP TABLE `companies`");
        await queryRunner.query("DROP TABLE `prices`");
        await queryRunner.query("DROP INDEX `IDX_447df075c342af02a92901dc81` ON `industries`");
        await queryRunner.query("DROP TABLE `industries`");
        await queryRunner.query("DROP TABLE `watchlists`");
        await queryRunner.query("DROP TABLE `funds`");
    }

}
