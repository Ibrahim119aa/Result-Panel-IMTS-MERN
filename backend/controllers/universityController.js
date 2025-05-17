const courseController=require('../controllers/courseController');

const p=require('../configuration/database');

class University
{

    static async Add(Name,Code)
    {


let a=await p.query("INSERT INTO university(name, code)VALUES ('"+Name+"','"+Code+"')");

return {Status:true};
    }


    static async getUniversityByName(name, p1, s) {
        let users = {};
     
       
        try {
            const page = parseInt(p1);
            const size = parseInt(s);
    
            const offset = (page - 1) * size;
    
            let query = '';
            let queryParams = [];
    
            if (name.length === 0) {
                query = 'SELECT * FROM university OFFSET $1 LIMIT $2';
                queryParams = [offset, size];
            } else {
                query = 'SELECT * FROM university WHERE name = $1 OFFSET $2 LIMIT $3';
                queryParams = [name, offset, size];
            }
    
            const totalQuery = 'SELECT COUNT(*) AS total FROM university';
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

    static async getUniversity1()
    {
let a=(await p.query("select * from university")).rows;

return a;

    }

    static async getUniversity(p1, s,name,allRecords) {
        try {
            if(allRecords!='true')
            {
                const page = parseInt(p1);
            const size = parseInt(s);
    
            const offset = (page - 1) * size;
    
            const totalQuery = await p.query('SELECT COUNT(*) FROM university');
            const total = parseInt(totalQuery.rows[0].count);
    
            let a= 'SELECT * FROM university WHERE 1=1';
            let b=[];
            
            if(name && name!=='')
            {
                a+=`and name like $${b.length+1}`;
                b.push(name);
            }
            if(p1 && p1!=='')
            {

                a+=`offset $${b.length+1}`;
                b.push(offset);
            }
            if(s && s!=='')
            {
                a+=`limit $${b.length+1}`;

                b.push(size);
                
            }
            let usersQuery=await p.query(a,b);
            
            
            
            const users = usersQuery.rows;
    
            return {
                records: users,
                total,
                page,
                size
            };
            }
            else
            {
                  const page = parseInt(p1);
            const size = parseInt(s);
    
            const offset = (page - 1) * size;
    
            const totalQuery = await p.query('SELECT COUNT(*) FROM university');
            const total = parseInt(totalQuery.rows[0].count);
    
            let a= 'SELECT * FROM university WHERE 1=1';
            let b=[];
            
            if(name && name!=='')
            {
                a+=`and name like $${b.length+1}`;
                b.push(name);
            }
            if(p1 && p1!=='')
            {

                a+=`offset $${b.length+1}`;
                b.push(offset);
            }
            if(s && s!=='')
            {
                a+=`limit $${b.length+1}`;

                b.push(size);
                
            }
            let usersQuery=await p.query(a,b);
            
            
            
            const users = usersQuery.rows;
    
            return {
                records: users,
                total,
                page,
                size
            };
            }
            
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    static async DeleteUniversity(id)
    {
       
        await courseController.DeleteCourseByUniversity(id);

        let a=await p.query("delete from university where id='"+id+"'");

        return {Status:true};
        

    }


    static async getParticularUniversity(id) {
        let a=await p.query("select * from university where id='"+id+"'");

        return a.rows;

      }
      static async UpdateParticlarUniversity(id,Name,Code)
      {
      let a=await p.query("update university set name='"+Name+"',code='"+Code+"' where id='"+id+"'");


      return {Status:true};
      

      }
}
module.exports=University;
