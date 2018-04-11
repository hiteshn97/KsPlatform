This is a node.js based project<br />
It is a knowledge sharing platform specifically modelled for pwd engineers<br />

Use the below command to install all the dependencies<br />
npm install <br />

To run the node application use the below command<br />
node app.js<br />
Or<br />
nodemon app.js for live server<br />

Guidelines to run the project----<br />
1.migration and seed used are part of knex to keep the schema up to date and to generate test data respectively <br />
2.To use the project a local postgresql has to be installed. pgadmin is recommended for database server management <br />
3.For smooth function use the server details used in knexfile.js <br />
4.type in knex migrate in console for knex commands. ex- to make migration files, seeds and to run them <br />

### Environment

`env.yaml`

```
# Development-specific settings.
development:
  PORT: 3000
  DATABASE: 'postgres://postgres:postgres@localhost:5432/kbdb'
# Production-specific settings.
production:
  PORT: 80
  DATABASE: 'postgres://postgres:postgres@localhost:5432/kbdb'
```