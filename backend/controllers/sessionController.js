
const p=require('../configuration/database');
const studentController=require('../controllers/studentController');

class Session
{

    static async Add(session,year,serial)
    {

      let a=await p.query("INSERT INTO session(session, year, serial)VALUES ('"+session+"','"+year+"','"+serial+"')");


return {Status:true};


    }


    static async getSession1()
    {
        let a=(await p.query("select * from session")).rows;

        return a;
        
    }

    static async getSession(p1, s) {
        try {
            const page = parseInt(p1);
            const size = parseInt(s);
    
            const offset = (page - 1) * size;
    
            const totalQuery = await p.query('SELECT COUNT(*) FROM session');
            const total = parseInt(totalQuery.rows[0].count);
    
            const usersQuery = await p.query('SELECT * FROM session LIMIT $1 OFFSET $2', [size, offset]);
            const users = usersQuery.rows;
    
            return {
                records: users,
                total,
                page,
                size
            };
        } catch (error) {
            console.error(error);
            return error;
        }
    }
 

    static async getSessionbyTitle(name, p1, s) {
        let users = {};
     
       
        try {
            const page = parseInt(p1);
            const size = parseInt(s);
    
            const offset = (page - 1) * size;
    
            let query = '';
            let queryParams = [];
    
            if (name.length === 0) {
                query = 'SELECT * FROM session OFFSET $1 LIMIT $2';
                queryParams = [offset, size];
            } else {
                query = 'SELECT * FROM session  WHERE session=$3  LIMIT $1 OFFSET $2';
                queryParams = [size, offset,name];
            }
    
            const totalQuery = 'SELECT COUNT(*) AS total FROM session';
            const { rows: totalRows } = await p.query(totalQuery);
            const total = totalRows[0].total;
    
            const { rows } = await p.query(query, queryParams);
    
            return {
                records: rows,
                total,
                page,
                size
            };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    static async DeleteSession(id)
    {
        await studentController.DeleteStudentBySession(id);

        let a=await p.query("delete from session where id='"+id+"'");

        return {Status:true};

        

    }


    static async getParticularSession(id) {
        
      let a=(await p.query("select * from session where id='"+id+"'")).rows;

      return a;

      }

      static async UpdateParticlarSession(id,session,year,serial)
      {
      
let a=await p.query("update session set session='"+session+"',year='"+year+"',serial='"+serial+"' where id='"+id+"'");
    return {Status:true};
    


      }
}
module.exports=Session;
