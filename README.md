<p align="center">
    <img alt ="homepage" src="https://github.com/helcioItiyama/GoFinanceWeb/blob/master/src/assets/logo.png"/>
</p>

## :triangular_flag_on_post:Index

* [About the project](#arrow_right-about-the-project)
* [Technologies used for this project](#computer-technologies-used-for-this-project)
* [How to run the application](#information_source-how-to-run-the-application)


## :arrow_right: ABOUT THE PROJECT

This is the backend project for the web application GoFinance. A portifolio investiment organizer to control all your investiments in one place.

This project provides a RESTfull API that allows users to list, create, update and delete incomes. Users must be authenticated to use the website, so it was use JWT authentication for this purpose.

## :raising_hand: Users Endpoints:
* [Login](endpoints/login.md) : `POST  baseUrl/session`
* [SignUp](endpoints/signup.md) : `POST  baseUrl/users`


## :moneybag: Income Endpoints:

* [List Incomes](endpoints/listIncomes.md) : `GET  baseUrl/incomes`
* [Add Income](endpoints/addIncome.md) : `POST  baseUrl/incomes`
* [Edit Income](endpoints/editIncome.md) : `PUT  baseUrl/incomes/:id`
* [Delete Income](endpoints/deleteIncome.md) : `DELETE  baseUrl/incomes/:id`


## :computer: TECHNOLOGIES USED FOR THIS PROJECT:

- [**express**](https://github.com/expressjs/express)
- [**celebrate**](https://github.com/arb/celebrate)
- [**cors**](https://github.com/expressjs/cors)
- [**date-fns**](https://github.com/date-fns/date-fns)
- [**bcrypt**](https://github.com/kelektiv/node.bcrypt.js/)
- [**json web token**](https://github.com/auth0/node-jsonwebtoken)
- [**tsyringe**](https://github.com/microsoft/tsyringe)
- [**typeorm**](https://github.com/typeorm)
- [**typescript**](https://github.com/microsoft/TypeScript)
- [**postgres**](https://github.com/postgres/postgres)


## :information_source: HOW TO RUN THE APPLICATION

To clone and run this application, you'll need Git, NodeJS, PostgreSQL and Yarn.

Start cloning the Github repository running the following commands:

```bash
# Clone this repository
$ https://github.com/helcioItiyama/GoFinance.git

# Go into the repository in the terminal
$ cd fashionista

# Install dependencies
$ yarn
```

After that, you need to install the Postgres database. It is strongly recommended to
use [**Docker**](https://www.docker.com/get-started) to avoid having to install Postgres locally.

After installing Docker, type the following commands in your terminal:

```bash
# install Postgres image
docker run --name imageName -e POSTGRES_PASSWORD=yourPassword -p 5432:5432 -d postgres

# start Postgres
docker start imageName
```

You will also need to create a file with the name of ```.env ``` and follow the example of the ```.env.example``` file to fill in the development variables.

Now with Postgres installed and running, you need to create a database. Rotate the code below to install the MIGRATIONS:

```bash
$ yarn typeorm migration:run
```

And finally, to start running the application type:

```bash
yarn dev: server
```

If you would like to run the frontend application as well you can follow the instructions here:

GoFinance-Frontend: https://github.com/helcioItiyama/GoFinanceWeb
