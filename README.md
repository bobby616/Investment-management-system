# TickTelerik

# General Description
TickTelerik is an investment management system platform. It is designed to be used by account
managers in respectable financial institutions. They have to manage the money of wealthy clients, FAST!
It is a single page application done with angular. 

##### Home Page
It is a page where user can only to login. Users with admin and manager permission can access only.
`Admin` is the user who can register new clients, admins, and managers. 
`Manager` is the user who can see client portfolios and all active positions buy or sell stocks for clients,.
`Clients` are these for whom we gave our health, nerves, time...and get their money :)

##General Overview
Main page where manager can operate, select clients, view financial news and open positions.
##Client Overview
The main page for the client, it is activated when the manager selects him in the `General Overview`
##Admin Overview
The main page for the admin. Here he can create new clients, assign them to a manager, create a new manger, etc.

# Prerequisites
If you want to run the project you should have the following technologies installed.
* [Node.js](https://nodejs.org/) 
* [MariaDB](https://downloads.mariadb.org/)
* [MySQL Workbench](https://www.mysql.com/products/workbench/) 

# Installing

After you clone successfully this repository:
#### Server
- navigate to `back-end` folder, after that run `npm install`, to install all packages from `package.json` file.
```sh
$ npm install
```
 - create in MySQL Workcbench **database**. In `ormconfig.json` and `ormconfig.js` default name is *testdb*, you can change the name if you desire, but it has to be the same in MySQL.
- then you should run the last migration to generate columns in your data base.
```sh
$ npm run migration:run
```
- aftern you have migrated successfully, you whould run the following commands in order to seed sample data
```sh
$ npm run setup
```
- for fake prices run:
```sh
$ npm run update
```
- create `.env` file at root level which include sensitive information for your server:
```sh
DB_DATABASE_NAME='your Database Name'
JWT_SECRET='password For Generate JWTokens'
```
- to run the server use:
```sh
$ npm run start
```

#### Client
- navigate to `project/src/app` folder, after that run `npm install` to get all packages and `ng-serve` to serve the application
```sh
$ ng serve
```

# Run test
For testing purposes we use [Jest](https://jestjs.io/)
#### Server
- in `back-end` folder you can run tests with
```sh
$ npm test
```

- in `project/src` folder you can run tests with
```sh
$ npm run test
```

# Technologies used
Trading 11 uses a number of open source projects to work properly:
- [Angular](https://angular.io/) - framework user
- [NestJS](https://nestjs.com/) - framework for building our server-side in [Node.js](https://nodejs.org/en/)
- [Angular Material](https://material.angular.io/) - for designing components in Angular
- [ag-Grid](https://www.ag-grid.com/) - for efficient searching and filtering information
- [Jest](https://jestjs.io/) - for testing
- [JWT](https://jwt.io/) - for authentication and authorization
- [MariaDB](https://mariadb.org/)
- [TypeORM](http://typeorm.io/#/)
# Authors
- [Bogdan Dinchev](https://github.com/bobby616)
- [Dimitar Vutov](https://gitlab.com/D.Vutov)
# Acknowledgments
Telerik Academy trainers:
- [Martin Veshev](https://github.com/vesheff)
- [Steven Tsvetkov](https://github.com/StevenTsvetkov)
- [Rosen Urkov](https://github.com/RosenUrkov)