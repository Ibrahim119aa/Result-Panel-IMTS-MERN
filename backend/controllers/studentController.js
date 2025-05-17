
const p=require('../configuration/database');

class Student
{

    static async UpdateImage(id,image)
    {
        let a=`update student set image=$1 where rollno=$2`;
        let b=[image,id];
        let c=await p.query(a,b);
        let d=`select image from student where rollno=$1`;
        let e=[id];
        let f=await p.query(d,e);
        return f.rows;
    }
static async  getReissueDate(yy, exammonth) {
    const dateRanges = {
        '1997': { Jan: [17, 22], Apr: [26, 31], Jul: [25, 30], Oct: [24, 29] },
        '1998': { Jan: [23, 28], Apr: [25, 30], Jul: [24, 29], Oct: [23, 28] },
        '1999': { Jan: [22, 27], Apr: [24, 29], Jul: [23, 28], Oct: [22, 27] },
        '2000': { Jan: [21, 26], Apr: [22, 27], Jul: [21, 26], Oct: [20, 25] },
        '2001': { Jan: [19, 24], Apr: [21, 26], Jul: [20, 25], Oct: [19, 24] },
        '2002': { Jan: [18, 23], Apr: [20, 25], Jul: [26, 31], Oct: [25, 30] },
        '2003': { Jan: [17, 25], Apr: [26, 31], Jul: [25, 30], Oct: [24, 29] },
        '2004': { Jan: [23, 28], Apr: [24, 29], Jul: [23, 28], Oct: [22, 27] },
        '2005': { Jan: [21, 26], Apr: [23, 28], Jul: [22, 27], Oct: [21, 26] },
        '2006': { Jan: [20, 25], Apr: [22, 27], Jul: [21, 26], Oct: [20, 25] },
        '2007': { Jan: [19, 24], Apr: [21, 26], Jul: [20, 25], Oct: [19, 24] },
        '2008': { Jan: [18, 23], Apr: [26, 31], Jul: [25, 30], Oct: [24, 29] },
        '2009': { Jan: [23, 28], Apr: [25, 30], Jul: [24, 29], Oct: [23, 28] },
        '2010': { Jan: [22, 27], Apr: [24, 29], Jul: [23, 28], Oct: [22, 27] },
        '2011': { Jan: [21, 26], Apr: [23, 28], Jul: [22, 27], Oct: [21, 26] },
        '2012': { Jan: [20, 25], Apr: [21, 26], Jul: [23, 25], Oct: [19, 24] },
        '2013': { Jan: [18, 23], Apr: [20, 25], Jul: [19, 24], Oct: [18, 23] },
        '2014': { Jan: [17, 22], Apr: [26, 31], Jul: [25, 30], Oct: [24, 29] },
        '2015': { Jan: [17, 22], Apr: [26, 31], Jul: [25, 30], Oct: [24, 29] },
        '2016': { Jan: [17, 22], Apr: [26, 31], Jul: [25, 30], Oct: [24, 29] },
        '2017': { Jan: [20, 25], Apr: [17, 22], Jul: [21, 26], Oct: [20, 25] },
        '2018': { Jan: [19, 24], Apr: [14, 19], Jul: [20, 25], Oct: [19, 24] },
        '2019': { Jan: [18, 23], Apr: [20, 25], Jul: [19, 24], Oct: [18, 23] },
        '2020': { Jan: [17, 22], Apr: [18, 23], Jul: [17, 22], Oct: [16, 21] },
        '2021': { Jan: [15, 20], Apr: [17, 22], Jul: [16, 21], Oct: [15, 20] },
        '2022': { Jan: [14, 19], Apr: [16, 21], Jul: [22, 27], Oct: [14, 19] },
        '2023': { Jan: [13, 18], Apr: [15, 20], Jul: [19, 24], Oct: [18, 23] },
         '2024':{ Jan: [14, 18], Apr: [16, 20], Jul: [20, 24], Oct: [18, 23] }
    };

    if (dateRanges[yy] && dateRanges[yy][exammonth]) {
        const [min, max] = dateRanges[yy][exammonth];
        return `${Math.floor(Math.random() * (max - min + 1) + min)} ${exammonth === 'Jan' ? 'Feb' : exammonth === 'Apr' ? 'May' : exammonth === 'Jul' ? 'Aug' : 'Nov'}`;
    } else {
        return 'Invalid year or exam month';
    }
}
static async getStudentByRollNoa(Id)
{
    
    
    console.log("I am Deoa");
    
    console.log(Id);
    
    
    
    let a=`select * from student where rollno=$1`;
    let b=[Id];
    let c=(await p.query(a,b)).rows;  
    let isCheck=false;
    for(let i=0;i<c.length;i++)
    {
        console.log(c[i].certificate_issue);
        
        if(c[i].certificate_issue==null)
        {
            isCheck=true;
            console.log("O am Cert")
        }
    }
   
        if(isCheck)
{
    let xx='select t1.* from results t1 join student t2 on t2.rollno=t1.rollno where t2.rollno=$1';
let yy1=[Id];
let zz=(await p.query(xx,yy1)).rows;
let yy='';
let examMonth='';

console.log(zz);


for(let j=0;j<zz.length;j++)
{
   

    if(zz[j][`yr_yr1`]!=null || zz[j][`yr_yr1`]!='')
    {
    yy = zz[j][`yr_yr1`];
    examMonth = zz[j][`yr_month1`];   
    console.log("This is 234234234Year");
    
    }
    else if(zz[j][`yr_yr2`]!=null || zz[j][`yr_yr2`]!='')
    {
          yy = zz[j][`yr_yr2`];
    examMonth = zz[j][`yr_month2`];   
    }
    else if(zz[j][`yr_yr3`]!=null || zz[j][`yr_yr3`]!='')
    {
          yy = zz[j][`yr_yr3`];
    examMonth = zz[j][`yr_month3`];   
    }
    else if(zz[j][`yr_yr4`]!=null || zz[j][`yr_yr4`]!='')
    {
          yy = zz[j][`yr_yr4`];
    examMonth = zz[j][`yr_month4`];   
    }
    
    else if(zz[j][`semester_yr1`]!=null || zz[j][`semester_yr1`]!='')
    {
          yy = zz[j][`semester_yr1`];
          examMonth = zz[j][`semester_month1`];   
    }
     else if(zz[j][`semester_yr2`]!=null || zz[j][`semester_yr2`]!='')
    {
          yy = zz[j][`semester_yr2`];
          examMonth = zz[j][`semester_month2`];   
    }
     else if(zz[j][`semester_yr3`]!=null || zz[j][`semester_yr3`]!='')
    {
          yy = zz[j][`semester_yr3`];
          examMonth = zz[j][`semester_month3`];   
    }
     else if(zz[j][`semester_yr4`]!=null || zz[j][`semester_yr4`]!='')
    {
          yy = zz[j][`semester_yr4`];
          examMonth = zz[j][`semester_month4`];   
    }
     else if(zz[j][`semester_yr5`]!=null || zz[j][`semester_yr5`]!='')
    {
          yy = zz[j][`semester_yr5`];
          examMonth = zz[j][`semester_month5`];   
    }
     else if(zz[j][`semester_yr6`]!=null || zz[j][`semester_yr6`]!='')
    {
          yy = zz[j][`semester_yr6`];
          examMonth = zz[j][`semester_month6`];   
    }
     else if(zz[j][`semester_yr7`]!=null || zz[j][`semester_yr7`]!='')
    {
          yy = zz[j][`semester_yr7`];
          examMonth = zz[j][`semester_month7`];   
    }
     else if(zz[j][`semester_yr8`]!=null || zz[j][`semester_yr8`]!='')
    {
          yy = zz[j][`semester_yr8`];
          examMonth = zz[j][`semester_month8`];   
    }
    
    


}
if(yy=='' )
{
    yy='2020';
}
if(examMonth=='')
{
    examMonth='Jan';
    
}

console.log("This is Year");
console.log(yy);
console.log("This is Month");

console.log(examMonth);

let reissue=`${(await this.getReissueDate(yy,examMonth))}  ${yy}`;

let pp=`update student set certificate_issue=$1 where rollno=$2`;
let qq=[reissue,Id];
let rr=await p.query(pp,qq);


console.log(`This is Reisse ${reissue}`);
}

 let a1=`select * from student where rollno=$1`;
    let b1=[Id];
    let c1=await p.query(a1,b1);  
    

    return c1.rows;
    
   
}


static async getOldPassword(username)
{
    let a=`select pass from student where rollno=$1`;
    let b=[username];
    let c=await p.query(a,b);
    return c.rows;
    
}

static async UpdatePassword(oldpassword,newpassword,user)
{
    let a=`update student set pass=$1 where rollno=$2`;
    let b=[newpassword,user];
    let c=await p.query(a,b);
    
    return {
        Status:true
    };
    
}
    static async Add(rollno,Name,fathername,DOB,mobile,Email,course,specialization,exam,image,session)
    {



console.log("sfsdf");


     let scode='';
     let s='';
     let sn1=1;
     let intval=0;
     let j='';
     let strlen=0;
     let serial1='';
     let sequence='';
     let cod='';


      let b=(await p.query(`select * from specializations where course_id=${course}`)).rows;
       if(b.length>0)
       {
        scode=b[0].specialization_code;

       }

       let c=(await p.query(`select * from session where id=${session}`)).rows;

       if(c.length>0)
       {
        s=c[0].year.substr(-2);


       }

       let query = `SELECT * FROM student WHERE course=$1 AND specialization=$2 AND session=$3 ORDER BY id DESC LIMIT 1`;
  let values = [course, specialization, session];
  let d = await p.query(query, values);
  
       d=d.rows;

       if((d.length>0))
       {
        sn1 = parseInt(d[0].sn) + 1;

        intval = parseInt(c[0].serial) + 1;
 
}
else
{
  intval = parseInt(c[0].serial) + 1;

}


j = '';


 serial1 = c[0].serial.toString();

for (let k = 0; k < serial1.length; k++) {
  let char = serial1.charAt(k);
  if (char > 0) {
    break;
  }
  if (char === '0') {
    j += '0';
  }
 }



 sequence = j + intval;
 let e=(await p.query(`select * from subject where coursetype=${course}`)).rows;
 if(e.length>0)
 {
   cod = e[0].subjectcode + sn1;
 }





const min = 1;
    const max = 10;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

sn1=parseInt(sn1);

rollno = rollno+ scode +s+ sequence+randomNumber;
console.log(randomNumber);
console.log("Roll No");
console.log(rollno);


   try
   {
        let a=await p.query("INSERT INTO student( rollno, name, fathername, dob, mobile, email, course, specialization, exam, image, session,sn) VALUES ('"+rollno+"','"+Name+"','"+fathername+"','"+DOB+"','"+mobile+"','"+Email+"','"+course+"','"+specialization+"','"+exam+"','"+image+"','"+session+"','"+sn1+"')");
   }
   catch(error)
   {
       
   }

return {Status:true};

    }


static async getAllStudent() {
    try {
       
        const totalQuery = await p.query('SELECT COUNT(*) FROM student');
        const total = parseInt(totalQuery.rows[0].count);

        const users = await p.query('SELECT t1.id AS _id,t1.rollno,t1.name AS Name,t1.fathername,t1.dob as DOB,t1.mobile,t1.email AS Email,t2.coursename AS course,t3.specialization,t1.exam FROM student t1 JOIN course t2 ON t1.course=t2.id JOIN specializations t3 ON t1.specialization=t3.id ');
       
        return {
            records: users.rows,
            total,
            
        };
    } catch (error) {
        console.error(error);
        return error;
    }
}

    static async addExam(rollno,courename,studentname,comments)
    {
      let a=await p.query("INSERT INTO examination( rollno, coursetype, studentname, comments) VALUES ('"+rollno+"','"+courename+"','"+studentname+"','"+comments+"')");
       return {Status:true};

      
    }
    static async DeleteExamByCourse(id)
    {
      let a=await p.query("delete from examination where coursetype='"+id+"'");
      return {Status:true};

    }


    static async addfeedback(ptype,message,studentname)
    {
      let a=await p.query("INSERT INTO feedback( rollno, ftype, message) VALUES ('"+studentname+"','"+ptype+"','"+message+"')");

      return {Status:true};

      
    }
    static async getStudent1(rollno) {
      try {
          const query = `
              SELECT * 
              FROM student 
              WHERE rollno = '${rollno}'
          `;
  
          const usersQuery = await p.query(query);
  
          const users = usersQuery.rows;
  
          return users;
  
      } catch (error) {
          console.error(error);
          return error;
      }
  }
  
    static async getStudent(p1, s,
    rollno,email,dob,
          allRecord
    ) {
      try {
        if(allRecord!='true')
        {
              const page = parseInt(p1);
          const size = parseInt(s);
  
          const offset = (page - 1) * size;
  
          const totalQuery = await p.query('SELECT COUNT(*) FROM student');
          const total = parseInt(totalQuery.rows[0].count);
  
  let a=`SELECT t1.added_date, t1.id AS _id,t1.rollno,t1.name AS Name,t1.fathername,t1.dob as DOB,t1.mobile,t1.email AS Email,t2.coursename AS course,t3.specialization,t1.exam FROM student t1 JOIN course t2 ON t1.course=t2.id JOIN specializations t3 ON t1.specialization=t3.id
     where 1=1  `;
     
     
  let values=[];
  
  if(rollno && rollno!=='')
  {
      a+=`and  t1.rollno like $${values.length + 1}`;
      values.push(rollno);
  }
  if(email && email!=='')
  {
      a+=`and  t1.email like $${values.length + 1}`;
      values.push(email);
  }
  if(dob && dob!=='')
  {
      a+=`and  t1.dob like $${values.length + 1}`;
      values.push(dob);
      
  }
  if(p1 && p1!=='')
  {
      a+=`order by t1.added_date desc LIMIT $${values.length + 1} `;
      values.push(size);
  }
  if(s && s!=='')
  {
      a+=`OFFSET $${values.length + 1}`;
      values.push(offset);
  }
  
  

  let usersQuery=await p.query(a,values);
  
      
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
           
  
  let a=`SELECT t1.added_date, t1.id AS _id,t1.rollno,t1.name AS Name,t1.fathername,t1.dob as DOB,t1.mobile,t1.email AS Email,t2.coursename AS course,t3.specialization,t1.exam FROM student t1 JOIN course t2 ON t1.course=t2.id JOIN specializations t3 ON t1.specialization=t3.id
     where 1=1  `;
     
     
  let values=[];
  
  
  
  if(rollno && rollno!=='')
  {
      a+=`and  t1.rollno like $${values.length + 1}`;
      values.push(rollno);
  }
  if(email && email!=='')
  {
      a+=`and  t1.email like $${values.length + 1}`;
      values.push(email);
  }
  if(dob && dob!=='')
  {
      a+=`and  t1.dob like $${values.length + 1}`;
      values.push(dob);
      
  }
 
  let usersQuery=await p.query(a,values);
  
      
          const users = usersQuery.rows;
  
          return {
              records: users,
             
          };
        }
      } catch (error) {
          console.error(error);
          return error;
      }
  }
  
    static async DeleteStudent(id)
    {
      let a=await p.query("delete from student where id='"+id+"'");

      return {Status:true}
        

    }
    static async DeleteStudentBySpecialization(id)
    {
      let a=await p.query("delete from student where specialization='"+id+"'");

      return {Status:true};

    }
    static async DeleteStudentByCourse(id)
    {
      let a=await p.query("delete from student where course='"+id+"'");

      return {Status:true};
      
    }
    static async DeleteStudentBySession(id)
    {
      let a=await p.query("delete from student where session='"+id+"'");

      return {Status:true};
      
    }
   
    static async getParticularStudent(id) {
       let a=(await p.query("select * from student where id='"+id+"'")).rows;


       return a;

      }
      static async UpdateParticlarStudent(id,rollno,Name,fathername,DOB,mobile,Email,course,specialization,exam,session)
      {

let a=await p.query("update student set rollno='"+rollno+"',name='"+Name+"',fathername='"+fathername+"',dob='"+DOB+"',mobile='"+mobile+"',email='"+Email+"',course='"+course+"',specialization='"+specialization+"',exam='"+exam+"',session='"+session+"' where id='"+id+"'");


        return {Status:true};

      }
      static async getStudentBYRollNoLogin(username,password)
      {
          

          let a=`select rollno from student where rollno=$1 and pass=$2`;
          let b=[username,password];
          let c=await p.query(a,b);
        return c.rows;

      }

static async getStudentByRollNo7(rollno)
{
    let a=`select t1.name,t2.coursename as course,t2.id as coursetype from student t1 join course t2 on t1.course=t2.id where t1.rollno=$1` ;
    let b=[rollno];
    let c=await p.query(a,b);
    return c.rows[0];
    
    
}
      static async getStudentBYRollNo1(id)
      {



let a=(await p.query("select t1.lastname,t1.id,t1.rollno,t1.name as Name,t1.fathername,t2.coursename,t2.coursedescription,t2.duration,t2.semester,t3.specialization,t4.*,t5.* from student t1 join course t2 on t1.course=t2.id join specializations t3 on t1.specialization=t3.id join results t4 on t4.rollno=t1.rollno left join shri_issue t5 on t5.stu_id=t1.id::text where (t1.id='"+id+"'  or t5.stu_id='"+id+"') ")).rows;


        return a[0];


      }
      
      static async getStudentByRollNo7(rollno)
{
    console.log("This is ");
    console.log(rollno);
    
    let a =`SELECT t1.rollno,t1.name AS Name,t1.fathername,t2.coursename AS course,t3.specialization,t4.session FROM student t1 JOIN course t2 ON t1.course=t2.id JOIN specializations t3  ON t1.specialization=t3.id JOIN session t4 ON t4.id=t1.session  where rollno=$1`;
    
    let b=[rollno];
    let c=await p.query(a,b);
    
    console.log(c.rows[0]);
    
     
     return c.rows[0];
     
        
}

static async getStudentByRollNo5(rollno)
{
    let a = 'SELECT t1.image,t1.id AS _id,t1.rollno,t1.name AS Name,t4.session as exam,t1.fathername,t1.dob as DOB,t1.mobile,t1.email AS Email,t2.coursename AS course,t3.specialization FROM student t1 JOIN course t2 ON t1.course=t2.id JOIN specializations t3 ON t1.specialization=t3.id join session t4 on t4.id=t1.session where rollno=$1';
    let b=[rollno];
    let c=await p.query(a,b);
    
    console.log(c.rows[0]);
    
     
     return c.rows[0];
     
        
}

      static async  getStudentByRollNo4(name, p1, s) {
        let users = {};
     
       
        try {
            const page = parseInt(p1);
            const size = parseInt(s);
    
            const offset = (page - 1) * size;
    
            let query = '';
            let queryParams = [];
           let t='';
            if (name.length === 0) {
         t='0';

                query = 'SELECT t1.id AS _id,t1.rollno,t1.name AS Name,t1.fathername,t1.dob as DOB,t1.mobile,t1.email AS Email,t2.coursename AS course,t3.specialization,t1.exam FROM student t1 JOIN course t2 ON t1.course=t2.id JOIN specializations t3 ON t1.specialization=t3.id LIMIT $1 OFFSET $2';
                queryParams = [size,offset];
            } else {
              t='1';

                query = 'SELECT t1.id AS _id,t1.rollno,t1.name AS Name,t1.fathername,t1.dob as DOB,t1.mobile,t1.email AS Email,t2.coursename AS course,t3.specialization,t1.exam FROM student t1 JOIN course t2 ON t1.course=t2.id JOIN specializations t3 ON t1.specialization=t3.id WHERE rollno=$3    LIMIT $1 OFFSET $2';
                queryParams = [size, offset,name];
            }
    
            const totalQuery = 'SELECT COUNT(*) AS total FROM student';
            const { rows: totalRows } = await p.query(totalQuery);
            const total = totalRows[0].total;
    
            const { rows } = await p.query(query, queryParams);
    
            return {
                records: rows,
                total,
                page,
                size,
                t
            };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }




      
        
    static async getStudentBYEmail(email, p1, s) {
      let users = {};
  
      try {
          const page = parseInt(p1);
          const size = parseInt(s);
  
          const offset = (page - 1) * size;
  
          let query = '';
          let queryParams = [];
  
          if (email.length === 0) {
              query = 'SELECT t1.id AS _id,t1.rollno,t1.name AS Name,t1.fathername,t1.dob as DOB,t1.mobile,t1.email AS Email,t2.coursename AS course,t3.specialization,t1.exam FROM student t1 JOIN course t2 ON t1.course=t2.id JOIN specializations t3 ON t1.specialization=t3.id LIMIT $1 OFFSET $2';
              queryParams = [size, offset];
          } else {
              query = 'SELECT t1.id AS _id,t1.rollno,t1.name AS Name,t1.fathername,t1.dob as DOB,t1.mobile,t1.email AS Email,t2.coursename AS course,t3.specialization,t1.exam FROM student t1 JOIN course t2 ON t1.course=t2.id JOIN specializations t3 ON t1.specialization=t3.id  WHERE UPPER(email) = UPPER($1) OFFSET $2 LIMIT $3';
              queryParams = [email, offset, size];
          }
  
          const totalQuery = 'SELECT COUNT(*) AS total FROM student';
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
  

  static async getStudentBYDOB(D, p1, s) {
    let users = {};

    try {
        const page = parseInt(p1);
        const size = parseInt(s);

        const offset = (page - 1) * size;

        let query = '';
        let queryParams = [];

        if (D.length === 0) {
            query = 'SELECT t1.id AS _id,t1.rollno,t1.name AS Name,t1.fathername,t1.dob as DOB,t1.mobile,t1.email AS Email,t2.coursename AS course,t3.specialization,t1.exam FROM student t1 JOIN course t2 ON t1.course=t2.id JOIN specializations t3 ON t1.specialization=t3.id LIMIT $1 OFFSET $2';
            queryParams = [size, offset];
        } else {
            query = 'SELECT t1.id AS _id,t1.rollno,t1.name AS Name,t1.fathername,t1.dob as DOB,t1.mobile,t1.email AS Email,t2.coursename AS course,t3.specialization,t1.exam FROM student t1 JOIN course t2 ON t1.course=t2.id JOIN specializations t3 ON t1.specialization=t3.id  WHERE dob = $1 OFFSET $2 LIMIT $3';
            queryParams = [D, offset, size];
        }

        const totalQuery = 'SELECT COUNT(*) AS total FROM student';
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


    static async getStudentByEn(rollno)
    {
      const response=(await p.query("select t1.id,t1.rollno,t1.name,t2.duration,t2.semester from student t1 join course t2 on t1.course=t2.id where t1.rollno='"+rollno+"'")).rows;

      return response;
      
    }
    

    static async getTotalStudent() {
      try {
          const query = 'SELECT COUNT(*) AS total FROM student';
          const { rows } = await p.query(query);
          const total = rows[0].total;
  

          return total;
      } catch (error) {
          console.log(error);
          throw error;
      }
  }
  
    static async getBBAStudent()
    {
      let a=(await p.query("SELECT COUNT(*) AS total FROM student t1 JOIN course t2 ON t1.course=t2.id where t2.coursename='B.B.A'")).rows;

      

      return a[0].total;


    }

    static async getAdvanceCertificateStudent()
    {
      let a=(await p.query("SELECT COUNT(*) AS total FROM student t1 JOIN course t2 ON t1.course=t2.id where t2.coursename='Advance Certificate'")).rows;

      

      return a[0].total;


    }

    static async getDBAStudent()
    {
      let a=(await p.query("SELECT COUNT(*) AS total FROM student t1 JOIN course t2 ON t1.course=t2.id where t2.coursename='D.B.A'")).rows;

      

      return a[0].total;


    }

   
    static async getMBAStudent()
    {
      let a=(await p.query("SELECT COUNT(*) AS total FROM student t1 JOIN course t2 ON t1.course=t2.id where t2.coursename='M.B.A'")).rows;

      

      return a[0].total;


    }

    static async getDualMBAStudent()
    {
      let a=(await p.query("SELECT COUNT(*) AS total FROM student t1 JOIN course t2 ON t1.course=t2.id where t2.coursename='MBA-DUAL'")).rows;

      

      return a[0].total;


    }
    


}
module.exports=Student;
