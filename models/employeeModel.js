const{Client} = require("pg");
const client = new Client({
    connectionString : "postgres://ram:ramcit09@localhost:5432/fsd_task1"
});
client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL', err.stack);
  });
const employeeTable = async() =>{
    const query = `
        CREATE TABLE IF NOT EXISTS employees (
    id serial PRIMARY KEY NOT NULL,
    emp_name varchar(30) NOT NULL,
    emp_id varchar(30) NOT NULL,
    emp_mail varchar(30) NOT NULL,
    emp_phone varchar(30) NOT NULL,
    emp_dept varchar(30) NOT NULL,
    emp_joiningdate date NOT NULL,
    emp_role varchar(30) NOT NULL
);

    `;
await client.query(query);
}
module.exports = {employeeTable};