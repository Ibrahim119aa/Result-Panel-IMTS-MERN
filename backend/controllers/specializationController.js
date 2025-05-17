

const p=require('../configuration/database');
const studentController=require('../controllers/studentController');
const subjectController=require('../controllers/subjectcontroller');

class Specialization
{

    static async Add(university,course,specialization,specializationcode,coursefee,registrationfee,examfee)
    {
let a=await p.query("INSERT INTO specializations( university_id, course_id, specialization, specialization_code, course_fee, registration_fee, exam_fee)VALUES('"+university+"','"+course+"','"+specialization+"','"+specializationcode+"','"+coursefee+"','"+registrationfee+"','"+examfee+"')");

return {Status:true};


    }


static async getAllSpecialization() {
        try {
            
            const totalQuery = await p.query('SELECT COUNT(*) FROM specializations');
            const total = parseInt(totalQuery.rows[0].count);
    
            const usersQuery = await p.query('SELECT t1.id AS _id, t1.specialization, t1.specialization_code AS specializationcode,t1.course_fee AS coursefee,t1.registration_fee AS registrationfee,t1.exam_fee AS examfee,t2.coursename AS course, t3.name AS university FROM specializations t1 JOIN course t2 ON t1.course_id = t2.id JOIN university t3 ON t1.university_id = t3.id');

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




    static async getSpecialization(p1, s) {
        try {
            const page = parseInt(p1);
            const size = parseInt(s);
    
            const offset = (page - 1) * size;
    
            const totalQuery = await p.query('SELECT COUNT(*) FROM specializations');
            const total = parseInt(totalQuery.rows[0].count);
    
            const usersQuery = await p.query('SELECT t1.id AS _id, t1.specialization, t1.specialization_code AS specializationcode,t1.course_fee AS coursefee,t1.registration_fee AS registrationfee,t1.exam_fee AS examfee,t2.coursename AS course, t3.name AS university FROM specializations t1 JOIN course t2 ON t1.course_id = t2.id JOIN university t3 ON t1.university_id = t3.id LIMIT $1 OFFSET $2', [size, offset]);
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



    static async getSpecializationbyName(name, p1, s) {
        let users = {};
     
       
        try {
            const page = parseInt(p1);
            const size = parseInt(s);
    
            const offset = (page - 1) * size;
    
            let query = '';
            let queryParams = [];
    
            if (name.length === 0) {
                query = 'SELECT t1.id AS _id, t1.specialization, t1.specialization_code AS specializationcode,t1.course_fee AS coursefee,t1.registration_fee AS registrationfee,t1.exam_fee AS examfee,t2.coursename AS course, t3.name AS university FROM specializations t1 JOIN course t2 ON t1.course_id = t2.id JOIN university t3 ON t1.university_id = t3.id OFFSET $1 LIMIT $2';
                queryParams = [offset, size];
            } else {
                query = 'SELECT t1.id AS _id, t1.specialization, t1.specialization_code AS specializationcode,t1.course_fee AS coursefee,t1.registration_fee AS registrationfee,t1.exam_fee AS examfee,t2.coursename AS course, t3.name AS university FROM specializations t1 JOIN course t2 ON t1.course_id = t2.id JOIN university t3 ON t1.university_id = t3.id  WHERE specialization=$3  LIMIT $1 OFFSET $2';
                queryParams = [size, offset,name];
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


    static async getSpecialization1()
    {
        const r=await p.query("SELECT t1.id AS _id, t1.specialization, t1.specialization_code AS specializationcode,t1.course_fee AS coursefee,t1.registration_fee AS registrationfee,t1.exam_fee AS examfee,t2.coursename AS course, t3.name AS university FROM specializations t1 JOIN course t2 ON t1.course_id = t2.id JOIN university t3 ON t1.university_id = t3.id")

        return r.rows;

    }

    static async DeleteSpecialization(id)
    {
        
        await studentController.DeleteStudentBySpecialization(id);
        await subjectController.DeleteSubjectBySpeciliazation(id);   
        let a=await p.query("delete from specializations where id='"+id+"'");

        return {Status:true};


    }


    static async DeleteSpecializationbyCourse(id)
    {
        
        await studentController.DeleteStudentBySpecialization(id);
        
        let a=await p.query("delete from specializations where course_id='"+id+"'");

        return {Status:true};


    }



    static async getParticularSpecialization(id) {
       
      let a=(await p.query("select * from specializations where id='"+id+"'")).rows;


      return a;

      }
      static async UpdateParticlarSpecialization(id,university,coursetype,specialization,specializationcode,coursefee,registrationfee,examfee)
      {
      let a=await p.query("update specializations set university_id='"+university+"',course_id='"+coursetype+"',specialization='"+specialization+"',specialization_code='"+specializationcode+"',course_fee='"+coursefee+"',registration_fee='"+registrationfee+"',exam_fee='"+examfee+"' where id='"+id+"'");

      return a;



      }


      static async getSpecializationByCourse(course)
      {

let a=(await p.query("select * from specializations where course_id='"+course+"'")).rows;


        return a;

        
      }
}
module.exports=Specialization;
