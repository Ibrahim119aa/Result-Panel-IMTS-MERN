

const p=require('../configuration/database');

const studentController=require('../controllers/studentController');
const specializationController=require('../controllers/specializationController');
const subjectController=require('../controllers/subjectcontroller');
const bookscontroller=require('../controllers/bookscontroller');
const result=require('../controllers/resultcontroller');




class Course
{

    static async Add(university,coursetype,coursename,coursedescription,coursecode,sequence,duration,semester)
    {


      let a=await p.query("INSERT INTO course(university, coursetype, coursename, coursedescription, coursecode, sequence, duration, semester)VALUES ('"+university+"','"+coursetype+"','"+coursename+"','"+coursedescription+"','"+coursecode+"','"+sequence+"','"+duration+"','"+semester+"')");
      return {Status:true};

    }

    static async getCourses1()
    {
const r=(await p.query("select * from course")).rows;

return r;
    }



static async getAllCourses() {
    try {
       
        const totalQuery = await p.query('SELECT COUNT(*) FROM course');
        const total = parseInt(totalQuery.rows[0].count);

        const usersQuery = await p.query('select t2.name as university, t1.coursename,t1.coursedescription,t1.coursecode,t1.sequence,t1.duration,t1.semester from course t1 join university t2 on t1.university=t2.id');
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


        static async getCourses(p1, s) {
      try {
          const page = parseInt(p1);
          const size = parseInt(s);
  
          const offset = (page - 1) * size;
  
          const totalQuery = await p.query('SELECT COUNT(*) FROM course');
          const total = parseInt(totalQuery.rows[0].count);
  
          const usersQuery = await p.query('select t1.id,t2.name as university,t1.coursetype,t1.coursename,t1.coursedescription,t1.coursecode,t1.sequence,t1.duration,t1.semester from course t1 join university t2 on t1.university=t2.id LIMIT $1 OFFSET $2', [size, offset]);
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



  static async getCoursebyName(name, p1, s) {
      let users = {};
   
     
      try {
          const page = parseInt(p1);
          const size = parseInt(s);
  
          const offset = (page - 1) * size;
  
          let query = '';
          let queryParams = [];
  
          if (name.length === 0) {
              query = 'select t2.name as university,t1.id,t1.coursetype,t1.coursename,t1.coursedescription,t1.coursecode,t1.sequence,t1.duration,t1.semester from course t1 join university t2 on t1.university=t2.id OFFSET $1 LIMIT $2';
              queryParams = [offset, size];
          } else {
              query = 'select t2.name as university,t1.id,t1.coursetype,t1.coursename,t1.coursedescription,t1.coursecode,t1.sequence,t1.duration from course t1 join university t2 on t1.university=t2.id WHERE t1.coursename=$3  LIMIT $1 OFFSET $2';
              queryParams = [size, offset,name];
          }
  
          const totalQuery = 'SELECT COUNT(*) AS total FROM course';
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






    static async DeleteCourse(id)
    {
      await studentController.DeleteExamByCourse(id);
      
      await result.DeleteResultByCourse(id);

      await bookscontroller.DeleteBookByCourseId(id);

        await studentController.DeleteStudentByCourse(id);
        await subjectController.DeleteSubjectByCourse(id);
        await specializationController.DeleteSpecializationbyCourse(id);


        let a=await p.query("delete from course where id='"+id+"'");

        return {Status:true};

        

    }
    static async DeleteCourseByUniversity(ID)
    {
      let a1=(await p.query("select * from course where university='"+ID+"'")).rows;
        if(a1.length>0)
        {
          let I=a1[0].id;
      await studentController.DeleteStudentByCourse(I);
        await specializationController.DeleteSpecializationbyCourse(I);
await subjectController.DeleteSubjectByCourse(I);
        let a=await p.query("delete from course where university='"+ID+"'");
        }

        return {Status:true};
        
        

    }
    static async getParticularCourse(id) {
        let a=await p.query("select * from course where id='"+id+"'");

        return a.rows;

      }
      static async UpdateParticlarCourse(id,university,coursetype,coursename,coursedescription,coursecode,sequence,duration,semester)
      {
    let a=await p.query("update course set university='"+university+"',coursetype='"+coursetype+"',coursename='"+coursename+"',coursedescription='"+coursedescription+"',coursecode='"+coursecode+"',sequence='"+sequence+"',duration='"+duration+"',semester='"+semester+"'");

    return {Status:true};



      }
      static async getCourseName(university)
      {
        

        let d=await p.query("select * from course where university='"+university+"'")
        return d.rows;

      }
      static async getCourseDetail(type)
      {
        let r=(await p.query("select t1.id as _id , t1.coursetype ,t2.name as university from course t1 join university t2 on t1.university=t2.id")).rows

         return r;

         
      }
      static async getTotalCourse()
      {
        let t=(await p.query("select count(*) as total from course")).rows

        return t[0].total;
        
      }
}
module.exports=Course;
