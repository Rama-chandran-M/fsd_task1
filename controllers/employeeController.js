const {Client} = require("pg");
const client = new Client({
    connectionString:"postgres://ram:ramcit09@localhost:5432/fsd_task1"
});
client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL', err.stack);
  });
const addEmployee = async(req,res) => {
    const {empname,empid,empmail,empphone,empdept,empjoiningdate,emprole} = req.body;
    try{
        const result = await client.query(
            `SELECT * FROM employees WHERE emp_id = $1 OR emp_mail = $2`,
            [empid, empmail]
        );
        
        if(result.rows.length>0){
            return res.status(400).json({message:"Name or Email already exist"});
        }
        const query = `insert into employees (emp_name,emp_id,emp_mail,emp_phone,emp_dept,emp_joiningdate,emp_role) values ($1,$2,$3,$4,$5,$6,$7)`;
        await client.query(query,[empname,empid,empmail,empphone,empdept,empjoiningdate,emprole]);
        return res.status(201).json({message:"Employee details added successfully"});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Error Occured , Details not added"});
    }
}
module.exports = {addEmployee};