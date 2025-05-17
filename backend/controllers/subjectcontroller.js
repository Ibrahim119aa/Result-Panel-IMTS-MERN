
const p=require('../configuration/database');

class Subject
{

    static async Add(coursename,coursetype,specialization,duration,semester,subject,subjectcode)
    {

      
let a=await p.query("INSERT INTO subject(coursename, coursetype, specialization, duration, semester, subject, subjectcode) VALUES ('"+coursename+"','"+coursetype+"','"+specialization+"','"+duration+"','"+semester+"','"+subject+"','"+subjectcode+"')"); 


return {Status:true};

    }
    
    
    static async getAllSubject() {
        try {
           
    
            const totalQuery = await p.query('SELECT COUNT(*) FROM subject');
            const total = parseInt(totalQuery.rows[0].count);
    
            const usersQuery = await p.query('SELECT t1.id AS _id, t1.subject, t2.coursename   AS coursetype,t3.specialization ,t1.duration ,t1.semester ,t1.subjectcode  FROM subject t1 JOIN course t2 ON t1.coursetype = t2.id JOIN specializations t3 ON t1.specialization= t3.id ');
            const users = usersQuery.rows;
    
            return {
                records: users,
                total,
                
            };
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    static async getSubject(p1, s) {
        try {
            const page = parseInt(p1);
            const size = parseInt(s);
    
            const offset = (page - 1) * size;
    
            const totalQuery = await p.query('SELECT COUNT(*) FROM subject');
            const total = parseInt(totalQuery.rows[0].count);
    
            const usersQuery = await p.query('SELECT t1.id AS _id, t1.subject, t2.coursename   AS coursetype,t3.specialization ,t1.duration ,t1.semester ,t1.subjectcode  FROM subject t1 JOIN course t2 ON t1.coursetype = t2.id JOIN specializations t3 ON t1.specialization= t3.id LIMIT $1 OFFSET $2', [size, offset]);
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



    static async getSubjectbyName(name, p1, s) {
        let users = {};
     
       
        try {
            const page = parseInt(p1);
            const size = parseInt(s);
    
            const offset = (page - 1) * size;
    
            let query = `SELECT t1.id AS _id, t1.subject, t2.coursename   AS coursetype,t3.specialization ,t1.duration ,t1.semester ,t1.subjectcode  FROM subject t1 JOIN course t2 ON t1.coursetype = t2.id JOIN specializations t3 ON t1.specialization= t3.id WHERE 1=1`;
            let queryParams = [];
            if(name && name!=='')
            {
                query+=`and subject like $${queryParams.length+1}`;
                queryParams.push(name);
            }
            if(s && s!=='')
            {
                
                query+=`limit  $${queryParams.length+1}`;
                queryParams.push(size);
            }
            if(p1 && p1!=='')
            {
                query+=`offset  $${queryParams.length+1}`;
                queryParams.push(offset);
            }
    
          
    
            const totalQuery = 'SELECT COUNT(*) AS total FROM subject';
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


    static async getSubject1()
    {
   

      const r=await p.query("SELECT t1.id AS _id, t1.subject, t2.coursename   AS coursetype,t3.specialization ,t1.duration ,t1.semester ,t1.subjectcode  FROM subject t1 JOIN course t2 ON t1.coursetype = t2.id JOIN specializations t3 ON t1.specialization= t3.id")

      return r.rows;


    }
    static async DeleteSubject(id)
    {
       let a=await p.query("delete from subject where id='"+id+"'");
        return {Status:true};
        

    }

    static async DeleteSubjectByCourse(id)
    {
       let a=await p.query("delete from subject where coursetype='"+id+"'");
        return {Status:true};
        

    }
    
    static async DeleteSubjectBySpeciliazation(id)
    {
       let a=await p.query("delete from subject where specialization='"+id+"'");
        return {Status:true};
        

    }

    static async DeleteSubjectByUniversity(id)
    {
       let a=await p.query("delete from subject where coursename='"+id+"'");
        return {Status:true};
        

    }


    static async getParticularSubject(id) {
       let a=(await p.query("select * from subject where id='"+id+"'")).rows;

       return a;

      }
      static async UpdateParticlarSubject(id,coursename,coursetype,specialization,duration,semester,subject,subjectcode)
      {
       let a=await p.query("update subject set coursename='"+coursename+"',coursetype='"+coursetype+"',specialization='"+specialization+"',duration='"+duration+"',semester='"+semester+"',subject='"+subject+"',subjectcode='"+subjectcode+"' where id='"+id+"'");

      return {Status:true};
      
      }

      
}
module.exports=Subject;
