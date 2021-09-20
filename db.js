const sql = require("mssql");
sql.on("error", err => console.log);

const config = {
user: 'abc',
password: '123',
options: {
    enableArithAbort: true,
    encrypt: true
  },
server: 'localhost',
database: 'redpheonix',
};

module.exports.getEmployees = async () => {
    let query = `SELECT * FROM dbo.employees`;
  
    try {
      let pool = await sql.connect(config);
      let result = await pool.request().query(query);
      return result.recordset;
    } catch (err) {
      console.log(err);
    }
  };

  module.exports.getRequest = async requestID => {
    let query = `Select * from dbo.projects where project_id = @requestid`;
  
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("requestid",requestID)
        .query(query);
        return result.recordset[0];
    } catch (err) {
      console.log(err);
    }
  };

  module.exports.updateRequest = async (requestid, data) => {
    let query = `
      UPDATE dbo.projects
      SET progress = @progress, description = @description, start_date = @start_date, expected_end_date = @expected_end_date,
      execution_lead = @execution_lead, senior_analyst = @senior_analyst, analyst = @analyst
      WHERE project_id = @requestid`;
  
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("progress", data.progress)
        .input("description", data.description)
        .input("start_date",data.start_date)
        .input("expected_end_date",data.expected_end_date)
        .input("execution_lead",data.exLead)
        .input("senior_analyst",data.srAnalyst)
        .input("analyst",data.analyst)
        .input("requestid", requestid)
        .query(query);
      return result.rowsAffected[0] === 1;
    } catch (err) {
      console.log(err);
    }
  };