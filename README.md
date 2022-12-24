# Express App

##Insomnia Collectio

get the insomnia collection in insomnia.json at root directory

## How to set up

- ### Dev environtment
    - make `.env.local` file or copy with below command to create an env local file for your local machine
        ```sh
        cp .env.example .env.local
        ```
    - create new database
    - set up the port and the mysql as per your database in .env.local file
    - install depedencies
        ```sh
        yarn install
        ```
    - set up rabbit mq with docker
        ```sh
        docker-compose up -d
        ```
    - run prisma migration using `yarn prisma:migrate` to migrate database structure to your database
    - run `yarn build && yarn dev` to start the development

- ### Test environtment
    - make `.env.test` file or copy with below command to create an env local file for your local machine
        ```sh
        cp .env.example .env.test
        ```
    - create new test database, recommended to name it as `{your current database name in local}_test`
    - set up the port and the mysql as per your database in .env.test file , make sure to use different port from the local env
    - install depedencies
        ```sh
        yarn install
        ```
        
    - run prisma migration using `yarn prisma:migrate-test` to migrate database structure to your test database
    - run `yarn:test` to run unit test
    - run `yarn test:coverage` to run unit test and coverage

