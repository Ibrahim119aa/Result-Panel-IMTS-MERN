
const p=require('../configuration/database');

class Result
{
    
    static async UpdateCertificateIssueDate(id)
    {
        console.log("This issue Id");
        
        console.log(id);
        
  let x='select t2.session from student t1 join session t2 on t2.id=t1.session';
        let y=await p.query(x);
        
        let certificateno='';
        if(y.rows.length>0)
        {
            let sess=y.rows[0].session;
            
           
             console.log(sess);
             
            let lastyear=sess.split(" - ")[1];
            console.log(lastyear);
            
            
           
            
            
            let xx='select year,serial from certificate where sess_name=$1';
            let yy=[lastyear];
            let zz=await p.query(xx,yy);
            
            if(zz.rows.length>0)
            {
                certificateno=`${zz.rows[0].year}${zz.rows[0].serial}`;
                
            }

            
        }
        
        
        let a=`select * from shri_issue where stu_id=$1`;
        let b=[id];
        let c=await p.query(a,b);
        
        
        console.log("This is Shri Issue");
        console.log(c.rows);
        
         let issuedt = null;
         let resissue_date='';
         
         
         if(c.rows.length>0)
         {
             resissue_date = c.rows[0];
             
              if (resissue_date.yr1) issuedt = resissue_date.yr1;
  if (resissue_date.yr2) issuedt = resissue_date.yr2;
  if (resissue_date.yr3) issuedt = resissue_date.yr3;
  if (resissue_date.yr4) issuedt = resissue_date.yr4;
  if (resissue_date.sem2) issuedt = resissue_date.sem2;
  if (resissue_date.sem4) issuedt = resissue_date.sem4;
  if (resissue_date.sem6) issuedt = resissue_date.sem6;
  if (resissue_date.sem8) issuedt = resissue_date.sem8;
         }
  


 
 

   
   console.log(issuedt);     
       
const dt = new Date(issuedt);
dt.setMonth(dt.getMonth() + 3);

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const exammonth = monthNames[dt.getMonth()];
const year = dt.getFullYear().toString();

let issuedate;
const dateRanges = {
  "1997": { Feb: [17, 22], May: [26, 31], Aug: [25, 30], Nov: [24, 29] },
  "1998": { Feb: [23, 28], May: [25, 30], Aug: [24, 29], Nov: [23, 28] },
  "1999": { Feb: [22, 27], May: [24, 29], Aug: [23, 28], Nov: [22, 27] },
  "2000": { Feb: [21, 26], May: [22, 27], Aug: [21, 26], Nov: [20, 25] },
  "2001": { Feb: [19, 24], May: [21, 26], Aug: [20, 25], Nov: [19, 24] },
  "2002": { Feb: [18, 23], May: [20, 25], Aug: [26, 31], Nov: [25, 30] },
  "2003": { Feb: [17, 25], May: [26, 31], Aug: [25, 30], Nov: [24, 29] },
  "2004": { Feb: [23, 28], May: [24, 29], Aug: [23, 28], Nov: [22, 27] },
  "2005": { Feb: [21, 26], May: [23, 28], Aug: [22, 27], Nov: [21, 26] },
  "2006": { Feb: [20, 25], May: [22, 27], Aug: [21, 26], Nov: [20, 25] },
  "2007": { Feb: [19, 24], May: [21, 26], Aug: [20, 25], Nov: [19, 24] },
  "2008": { Feb: [18, 23], May: [26, 31], Aug: [25, 30], Nov: [24, 29] },
  "2009": { Feb: [23, 28], May: [25, 30], Aug: [24, 29], Nov: [23, 28] },
  "2010": { Feb: [22, 27], May: [24, 29], Aug: [23, 28], Nov: [22, 27] },
  "2011": { Feb: [21, 26], May: [23, 28], Aug: [22, 27], Nov: [21, 26] },
  "2012": { Feb: [20, 25], May: [21, 26], Aug: [20, 25], Nov: [19, 24] },
  "2013": { Feb: [18, 23], May: [20, 25], Aug: [19, 24], Nov: [18, 23] },
  "2014": { Feb: [17, 22], May: [26, 31], Aug: [25, 30], Nov: [24, 29] },
  "2015": { Feb: [16, 21], May: [18, 23], Aug: [17, 22], Nov: [16, 21] },
  "2016": { Feb: [15, 21], May: [16, 21], Aug: [15, 20], Nov: [21, 26] },
  "2017": { Feb: [20, 25], May: [17, 22], Aug: [21, 26], Nov: [20, 25] },
  "2018": { Feb: [19, 24], May: [14, 19], Aug: [20, 25], Nov: [19, 24] },
  "2019": { Feb: [18, 23], May: [20, 25], Aug: [19, 24], Nov: [18, 23] },
  "2020": { Feb: [17, 22], May: [18, 23], Aug: [17, 22], Nov: [16, 21] },
  "2021": { Feb: [15, 20], May: [17, 22], Aug: [16, 21], Nov: [15, 20] },
  "2022": { Feb: [14, 19], May: [16, 21], Aug: [22, 27], Nov: [14, 19] },
  "2023": { Feb: [13, 18], May: [15, 20], Aug: [21, 26], Nov: [13, 18] },
  "2024": { Feb: [19, 24], May: [20, 25], Aug: [19, 24], Nov: [18, 23] },
  "2025": { Feb: [17, 22], May: [19, 24], Aug: [18, 23], Nov: [17, 22] },
};


const range = dateRanges[year] && dateRanges[year][exammonth];
if (range) {
  issuedate = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
} else {
  throw new Error("Date range not defined for this year and month combination");
}

const finalissuedt = `${issuedate} ${exammonth} ${year}`;

console.log(finalissuedt);


let a1='update student set certificate_issue=$1,certificate=$2 where id=$3';
let b1=[finalissuedt,certificateno,id];
let c1=await p.query(a1,b1);





    }

  static async  updateMarks( rollno, course, YearFirstPer, duration,semester) {
    try {
        
        console.log("O am Result Wala");
        
      const stusqlResult = await p.query(`SELECT id, specialization FROM student WHERE rollno='${rollno}'`);
      const sturows = stusqlResult.rows[0];
  
      


      const crsesqlResult1 = await p.query(`SELECT id FROM subject WHERE coursetype='${course}' AND specialization='${sturows.specialization}' AND duration='${duration}' AND semester='${semester}'`);
      const crsesql1 = crsesqlResult1.rows;
      const crenum1 = crsesql1.length;
     

      console.log(crsesql1.length);



      const tot1 = (crenum1 * 100 * YearFirstPer) / 100;
     


      let b1 = 0;
      for (let i = 0; i < crenum1; i++) {
      
  

        const crserow = crsesql1[i];
        const upsqlResult = await p.query(`SELECT * FROM shri_marksheet WHERE stu_id='${sturows.id}' AND no_of_sem_yr='${duration}' AND subject_id='${crserow.id}'`);
        const upsql = upsqlResult.rows;
        const upnum = upsql.length;
  
        let a;
        if (upnum > 0) {
          if (i !== crenum1 - 1) {
            a = Math.floor(Math.random() * (YearFirstPer - (YearFirstPer-5) + 1)) + (YearFirstPer-5);

            // a = Math.floor(Math.random() * ((YearFirstPer + 11) - (YearFirstPer - 10) )) + (YearFirstPer - 10);
            await p.query(`UPDATE shri_marksheet SET subject_no='${a}' WHERE stu_id='${sturows.id}' AND no_of_sem_yr='${duration}' AND subject_id='${crserow.id}'`);
            b1 += a;
          } else {
            const c = tot1 - b1;
            await p.query(`UPDATE shri_marksheet SET subject_no='${c}' WHERE stu_id='${sturows.id}' AND no_of_sem_yr='${duration}' AND subject_id='${crserow.id}'`);
          }
        } else {
          if (i !== crenum1 - 1) {
            a = Math.floor(Math.random() * (YearFirstPer - (YearFirstPer-5) + 1)) + (YearFirstPer-5);

            // a = Math.floor(Math.random() * ((YearFirstPer + 11) - (YearFirstPer - 10))) + (YearFirstPer - 10);
            await p.query(`INSERT INTO shri_marksheet (stu_id, no_of_sem_yr, subject_id, subject_no) VALUES ('${sturows.id}', '${duration}', '${crserow.id}', '${a}')`);
            b1 += a;
          } else {
            const c = tot1 - b1;
            await p.query(`INSERT INTO shri_marksheet (stu_id, no_of_sem_yr, subject_id, subject_no) VALUES ('${sturows.id}', '${duration}', '${crserow.id}', '${c}')`);
          }
        }
      }
  
      
    } catch (err) {
      console.error('Error:', err);
    }
  }
  
static async updateIssueDate(yy, examMonth,no,stuId) {
        let issueDate;

console.log("This is Update Issue");
        const dateRanges = {
            '1997': { Jan: [17, 22, 'Feb'], Apr: [26, 31, 'May'], Jul: [25, 30, 'Aug'], Oct: [24, 29, 'Nov'] },
            '1998': { Jan: [23, 28, 'Feb'], Apr: [25, 30, 'May'], Jul: [24, 29, 'Aug'], Oct: [23, 28, 'Nov'] },
            '1999': { Jan: [22, 27, 'Feb'], Apr: [24, 29, 'May'], Jul: [23, 28, 'Aug'], Oct: [22, 27, 'Nov'] },
            '2000': { Jan: [21, 26, 'Feb'], Apr: [22, 27, 'May'], Jul: [21, 26, 'Aug'], Oct: [20, 25, 'Nov'] },
            '2001': { Jan: [19, 24, 'Feb'], Apr: [21, 26, 'May'], Jul: [20, 25, 'Aug'], Oct: [19, 24, 'Nov'] },
            '2002': { Jan: [18, 23, 'Feb'], Apr: [20, 25, 'May'], Jul: [26, 31, 'Aug'], Oct: [25, 30, 'Nov'] },
            '2003': { Jan: [17, 25, 'Feb'], Apr: [26, 31, 'May'], Jul: [25, 30, 'Aug'], Oct: [24, 29, 'Nov'] },
            '2004': { Jan: [23, 28, 'Feb'], Apr: [24, 29, 'May'], Jul: [23, 28, 'Aug'], Oct: [22, 27, 'Nov'] },
            '2005': { Jan: [21, 26, 'Feb'], Apr: [23, 28, 'May'], Jul: [22, 27, 'Aug'], Oct: [21, 26, 'Nov'] },
            '2006': { Jan: [20, 25, 'Feb'], Apr: [22, 27, 'May'], Jul: [21, 26, 'Aug'], Oct: [20, 25, 'Nov'] },
            '2007': { Jan: [19, 24, 'Feb'], Apr: [21, 26, 'May'], Jul: [20, 25, 'Aug'], Oct: [19, 24, 'Nov'] },
            '2008': { Jan: [18, 23, 'Feb'], Apr: [26, 31, 'May'], Jul: [25, 30, 'Aug'], Oct: [24, 29, 'Nov'] },
            '2009': { Jan: [23, 28, 'Feb'], Apr: [25, 30, 'May'], Jul: [24, 29, 'Aug'], Oct: [23, 28, 'Nov'] },
            '2010': { Jan: [22, 27, 'Feb'], Apr: [24, 29, 'May'], Jul: [23, 28, 'Aug'], Oct: [22, 27, 'Nov'] },
            '2011': { Jan: [21, 26, 'Feb'], Apr: [23, 28, 'May'], Jul: [22, 27, 'Aug'], Oct: [21, 26, 'Nov'] },
            '2012': { Jan: [20, 25, 'Feb'], Apr: [21, 26, 'May'], Jul: [20, 25, 'Aug'], Oct: [19, 24, 'Nov'] },
            '2013': { Jan: [18, 23, 'Feb'], Apr: [20, 25, 'May'], Jul: [19, 24, 'Aug'], Oct: [18, 23, 'Nov'] },
            '2014': { Jan: [17, 22, 'Feb'], Apr: [26, 31, 'May'], Jul: [25, 30, 'Aug'], Oct: [24, 29, 'Nov'] },
            '2015': { Jan: [17, 22, 'Feb'], Apr: [26, 31, 'May'], Jul: [25, 30, 'Aug'], Oct: [24, 29, 'Nov'] },
            '2016': { Jan: [17, 22, 'Feb'], Apr: [26, 31, 'May'], Jul: [25, 30, 'Aug'], Oct: [24, 29, 'Nov'] },
            '2017': { Jan: [20, 25, 'Feb'], Apr: [17, 22, 'May'], Jul: [21, 26, 'Aug'], Oct: [20, 25, 'Nov'] },
            '2018': { Jan: [19, 24, 'Feb'], Apr: [14, 19, 'May'], Jul: [20, 25, 'Aug'], Oct: [19, 24, 'Nov'] },
            '2019': { Jan: [18, 23, 'Feb'], Apr: [20, 25, 'May'], Jul: [19, 24, 'Aug'], Oct: [18, 23, 'Nov'] },
            '2020': { Jan: [17, 22, 'Feb'], Apr: [18, 23, 'May'], Jul: [17, 22, 'Aug'], Oct: [16, 21, 'Nov'] },
            '2021': { Jan: [15, 20, 'Feb'], Apr: [17, 22, 'May'], Jul: [16, 21, 'Aug'], Oct: [15, 20, 'Nov'] },
            '2022': { Jan: [14, 19, 'Feb'], Apr: [16, 21, 'May'], Jul: [22, 27, 'Aug'], Oct: [14, 19, 'Nov'] },
            '2023': { Jan: [13, 18, 'Feb'], Apr: [15, 20, 'May'], Jul: [21, 26, 'Aug'], Oct: [13, 18, 'Nov'] },
            '2024': { Jan: [19, 24, 'Feb'], Apr: [20, 25, 'May'], Jul: [19, 24, 'Aug'], Oct: [18, 23, 'Nov'] },
            '2025': { Jan: [17, 22, 'Feb'], Apr: [19, 24, 'May'], Jul: [18, 23, 'Aug'], Oct: [17, 22, 'Nov'] }
        };
console.log(" I am For testing here");

console.log(no);
console.log(yy);



        if (dateRanges[yy] && dateRanges[yy][examMonth]) {
            const [startDay, endDay, month] = dateRanges[yy][examMonth];
            const day = Math.floor(Math.random() * (endDay - startDay + 1)) + startDay;
            issueDate = `${day} ${month} ${yy}`;
        } else {
            issueDate = 'Invalid year or month';
        }
        console.log(issueDate);
        
      
        
        let a=`update shri_issue set ${no}=$1  where stu_id=$2`;
    
        let b=[issueDate,stuId];
        let c=await p.query(a,b);
        
        

       
    }

  static async Add(id,
    rollno,
    Name,
    course,

    YearFirstPer,
    SessionFirstYear,
    YearFirstYear,

    YearSecondPer,
    SessionSecondYear,
    YearSecondYear,

    YearThirdPer,
    SessionThirdYear,
    YearThirdYear,

    YearFourthPer,
    SessionFourthYear,
    YearFourthYear,

    FirstSemesterPer,
    FirstSemesterSession,
    FirstSemesterMonth,

    SecondSemesterPer,
    SecondSemesterSession,
    SecondSemesterMonth,


    ThirdSemesterPer,
    ThirdSemesterSession,
    ThirdSemesterMonth,


    FourthSemesterPer,
    FourthSemesterSession,
    FourthSemesterMonth,


    FivethSemesterPer,
    FivethSemesterSession,
    FivethSemesterMonth,


    SixSemesterPer,
    SixSemesterSession,
    SixSemesterMonth,



    SeventhSemesterPer,
    SeventhSemesterSession,
    SeventhSemesterMonth,


    EightSemesterPer,
    EightSemesterSession,
    EightSemesterMonth,
    duration,
    semester)
    
    {
    try {
console.log("This is Year 1");
console.log(FirstSemesterMonth);

console.log("This is Year 2");
console.log(SecondSemesterMonth);


console.log("This is Year 3");
console.log(ThirdSemesterMonth);


console.log("This is Year 4");
console.log(FourthSemesterMonth);

if(semester=="Semester")
{
    if (duration == 1) {
 await   this.updateMarks(rollno, course, FirstSemesterPer, "1", semester);
} else if (duration == 2) {
 await   this.updateMarks(rollno, course, FirstSemesterPer, "1g", semester);
  await  this.updateMarks(rollno, course, SecondSemesterPer, "2", semester);
} else if (duration == 3) {
await    this.updateMarks(rollno, course, FirstSemesterPer, "1", semester);
await    this.updateMarks(rollno, course, SecondSemesterPer, "2", semester);
await    this.updateMarks(rollno, course, ThirdSemesterPer, "3", semester);
} else if (duration == 4) {
await    this.updateMarks(rollno, course, FirstSemesterPer, "1", semester);
await    this.updateMarks(rollno, course, SecondSemesterPer, "2", semester);
await    this.updateMarks(rollno, course, ThirdSemesterPer, "3", semester);
await    this.updateMarks(rollno, course, FourthSemesterPer, "4", semester);
} else if (duration == 5) {
await    this.updateMarks(rollno, course, FirstSemesterPer, "1", semester);
await    this.updateMarks(rollno, course, SecondSemesterPer, "2", semester);
await    this.updateMarks(rollno, course, ThirdSemesterPer, "3", semester);
await    this.updateMarks(rollno, course, FourthSemesterPer, "4", semester);
await    this.updateMarks(rollno, course, FifthSemesterPer, "5", semester);
} else if (duration == 6) {
await    this.updateMarks(rollno, course, FirstSemesterPer, "1", semester);
await    this.updateMarks(rollno, course, SecondSemesterPer, "2", semester);
await    this.updateMarks(rollno, course, ThirdSemesterPer, "3", semester);
await    this.updateMarks(rollno, course, FourthSemesterPer, "4", semester);
await    this.updateMarks(rollno, course, FifthSemesterPer, "5", semester);
await    this.updateMarks(rollno, course, SixthSemesterPer, "6", semester);
} else if (duration == 7) {
   await this.updateMarks(rollno, course, FirstSemesterPer, "1", semester);
await    this.updateMarks(rollno, course, SecondSemesterPer, "2", semester);
await    this.updateMarks(rollno, course, ThirdSemesterPer, "3", semester);
await    this.updateMarks(rollno, course, FourthSemesterPer, "4", semester);
await    this.updateMarks(rollno, course, FifthSemesterPer, "5", semester);
await    this.updateMarks(rollno, course, SixthSemesterPer, "6", semester);
await    this.updateMarks(rollno, course, SeventhSemesterPer, "7", semester);
} else if (duration == 8) {
await    this.updateMarks(rollno, course, FirstSemesterPer, "1", semester);
await    this.updateMarks(rollno, course, SecondSemesterPer, "2", semester);
    await this.updateMarks(rollno, course, ThirdSemesterPer, "3", semester);
await    this.updateMarks(rollno, course, FourthSemesterPer, "4", semester);
await    this.updateMarks(rollno, course, FifthSemesterPer, "5", semester);
await    this.updateMarks(rollno, course, SixthSemesterPer, "6", semester);
await    this.updateMarks(rollno, course, SeventhSemesterPer, "7", semester);
await    this.updateMarks(rollno, course, EighthSemesterPer, "8", semester);
}

}
else if(semester=="Year")
{
    if (duration == 1) {
await    this.updateMarks(rollno, course, YearFirstPer, "1", semester);
} else if (duration == 2) {
  await  this.updateMarks(rollno, course, YearFirstPer, "1", semester);
await    this.updateMarks(rollno, course, YearSecondPer, "2", semester);
} else if (duration == 3) {
await    this.updateMarks(rollno, course, YearFirstPer, "1", semester);
await    this.updateMarks(rollno, course, YearSecondPer, "2", semester);
await    this.updateMarks(rollno, course, YearThirdPer, "3", semester);
} else if (duration == 4) {
await    this.updateMarks(rollno, course, YearFirstPer, "1", semester);
await    this.updateMarks(rollno, course, YearSecondPer, "2", semester);
await    this.updateMarks(rollno, course, YearThirdPer, "3", semester);
await    this.updateMarks(rollno, course, YearFourthPer, "4", semester);
}

}




   const stusqlResult = await p.query(`SELECT id FROM student WHERE rollno='${rollno}'`);
      const stuId = stusqlResult.rows[0].id;
 
   
   
   
let a1=`insert into shri_issue(stu_id) values($1)`;
            let b1=[stuId];
        let c1=await p.query(a1,b1);
        
 
    
      if (YearFirstPer != '0') {
    this.updateIssueDate(YearFirstYear, SessionFirstYear, "yr1", stuId);
    console.log("First");
}

if (YearSecondPer!='0') {
    this.updateIssueDate(YearSecondYear, SessionSecondYear, "yr2", stuId);
    console.log("Second");
}

if (YearThirdPer !='0') {
    this.updateIssueDate(YearThirdYear, SessionThirdYear, "yr3", stuId);
    console.log("Third");
}

if (YearFourthPer != '0') {
    this.updateIssueDate(YearFourthYear, SessionFourthYear, "yr4", stuId);
    console.log("Fourth");
}

if (FirstSemesterPer != '0') {
    this.updateIssueDate(FirstSemesterMonth, FirstSemesterSession, "sem1", stuId);
    console.log("First Semester");
}

if (SecondSemesterPer != '0') {
    this.updateIssueDate(SecondSemesterMonth, SecondSemesterSession, "sem2", stuId);
    console.log("Second Semester");
}

if (ThirdSemesterPer != '0') {
    this.updateIssueDate(ThirdSemesterMonth, ThirdSemesterSession, "sem3", stuId);
    console.log("Third Semester");
}

if (FourthSemesterPer != '0') {
    this.updateIssueDate(FourthSemesterMonth, FourthSemesterSession, "sem4", stuId);
    console.log("Fourth Semester");
}

if (FivethSemesterPer != '0') {
    this.updateIssueDate(FivethSemesterMonth, FivethSemesterSession, "sem5", stuId);
    console.log("Fivth Semester");
}

if (SixSemesterPer != '0') {
    this.updateIssueDate(SixSemesterMonth, SixSemesterSession, "sem6", stuId);
    console.log("Sixth Semester");
}

if (SeventhSemesterPer != '0') {
    this.updateIssueDate(SeventhSemesterMonth, SeventhSemesterSession, "sem7", stuId);
    console.log("Seventh Semester");
}

if (EightSemesterPer != '0') {
    this.updateIssueDate(EightSemesterMonth, EightSemesterSession, "sem8", stuId);
    console.log("Eight Semester");
}

await  this.UpdateCertificateIssueDate(stuId);
  await p.query(
          "INSERT INTO public.results( rollno, course_id, yr1, yr2, yr3, yr4, sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8, yr_month1, yr_month2, yr_month3, yr_month4, yr_yr1, yr_yr2, yr_yr3, yr_yr4, semester_month1, semester_month2, semester_month3, semester_month4, semester_month5, semester_month6, semester_month7, semester_month8, semester_yr1, semester_yr2, semester_yr3, semester_yr4, semester_yr5, semester_yr6, semester_yr7, semester_yr8)VALUES ($1,$2,$3,$6,$9,$12,$15,$18,$21,$24,$27,$30,$33,$36,$4,$7,$10,$13,$5,$8,$11,$14,$16,$19,$22,$25,$28,$31,$34,$37,$17,$20,$23,$26,$29,$32,$35,$38)",
          [
            rollno,

            course,

            YearFirstPer,
            SessionFirstYear,
            YearFirstYear,

            YearSecondPer,
            SessionSecondYear,
            YearSecondYear,

            YearThirdPer,
            SessionThirdYear,
            YearThirdYear,

            YearFourthPer,
            SessionFourthYear,
            YearFourthYear,

            FirstSemesterPer,
            FirstSemesterSession,
            FirstSemesterMonth,

            SecondSemesterPer,
            SecondSemesterSession,
            SecondSemesterMonth,


            ThirdSemesterPer,
            ThirdSemesterSession,
            ThirdSemesterMonth,


            FourthSemesterPer,
            FourthSemesterSession,
            FourthSemesterMonth,


            FivethSemesterPer,
            FivethSemesterSession,
            FivethSemesterMonth,


            SixSemesterPer,
            SixSemesterSession,
            SixSemesterMonth,



            SeventhSemesterPer,
            SeventhSemesterSession,
            SeventhSemesterMonth,


            EightSemesterPer,
            EightSemesterSession,
            EightSemesterMonth,
            ]
      );
      
      return { Status: true };

      


    } catch (error) {
      console.log(error);
      throw error;
    }
  }




static async getResult1() {
    let a=await p.query("SELECT t1.rollno,t3.name AS Name,t3.lastname,t2.coursename AS course,t2.duration as duration,t2.semester as semester,t1.id FROM results t1 JOIN course t2 ON t1.course_id=t2.id JOIN student t3 ON t3.rollno=t1.rollno");

    return a.rows;

}


static async getResult(p1, s,name) {
  try {
      const page = parseInt(p1);
      const size = parseInt(s);

      const offset = (page - 1) * size;

      const totalQuery = await p.query('SELECT COUNT(*) FROM results');
      const total = parseInt(totalQuery.rows[0].count);

      let a = `SELECT t1.added_date,t3.id as ids,1.id, t1.rollno,t3.name AS Name,t3.lastname,t2.coursename AS course,t2.duration as duration,t2.semester as semester,t1.id FROM results t1 JOIN course t2 ON t1.course_id=t2.id JOIN student t3 ON t3.rollno=t1.rollno WHERE 1=1`;
      let b=[];
      
      if(name && name!=='')
      {
          a+=`and t1.rollno like $${b.length+1}`;
          b.push(name);
      }
      if(s && s!=='')
      {
          
          a+=`order by t1.added_date desc limit $${b.length+1}`;
          b.push(size);
      }
      if(p1 && p1!=='')
      {
          a+=`offset $${b.length+1}`;
          b.push(offset);
      }
     
      
      let usersQuery=await p.query(a,b);
      
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

static async fetchAllResult() {
  try {
     

      const totalQuery = await p.query('SELECT COUNT(*) FROM results');
      const total = parseInt(totalQuery.rows[0].count);

      const usersQuery = await p.query('SELECT t3.id as ids, t1.rollno,t3.name AS Name,t2.coursename AS course,t2.duration as duration,t2.semester as semester,t1.id FROM results t1 JOIN course t2 ON t1.course_id=t2.id JOIN student t3 ON t3.rollno=t1.rollno');
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
static async getResultbyRollNo1(name, p1, s) {
let users = {};


try {
    const page = parseInt(p1);
    const size = parseInt(s);

    const offset = (page - 1) * size;

    let query = '';
    let queryParams = [];

    if (name.length === 0) {
        query = 'SELECT t3.id as ids, t1.id,t1.rollno,t3.name AS Name,t2.coursename AS course,t2.duration as duration,t2.semester as semester,t1.id FROM results t1 JOIN course t2 ON t1.course_id=t2.id JOIN student t3 ON t3.rollno=t1.rollno order by t1.id ASC OFFSET $1 LIMIT $2';
        queryParams = [offset, size];
    } else {
        query = 'SELECT t3.id as ids,t1.id,t1.rollno,t3.name AS Name,t2.coursename AS course,t2.duration as duration,t2.semester as semester,t1.id FROM results t1 JOIN course t2 ON t1.course_id=t2.id JOIN student t3 ON t3.rollno=t1.rollno   WHERE t1.rollno=$3 order by t1.id ASC  LIMIT $1 OFFSET $2';
        queryParams = [size, offset,name];
    }

    const totalQuery = 'SELECT COUNT(*) AS total FROM results';
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


static async DeleteResultByCourse(id)
{
  let a=await p.query("delete from results where course_id='"+id+"'");

  return {Status:true};
  
}

    static async DeleteResult(id)
    {
       let a=await p.query("delete from results where id='"+id+"'");


        return {Status:true};

        

    }
    static async getStudentBYRollNo(rollno)
    {
      const response=table.findOne(
        {
          rollno:rollno
        }
      );
      return response;
      
    }
    static async getParticularResult(id) {
      
      let a=(await p.query("select * from results where id='"+id+"'")).rows;

      return a;


      }
      static async UpdateParticlarResult(id,
        rollno,
        Name,
        course,
      
        YearFirstPer,
        SessionFirstYear,
        YearFirstYear,
      
        YearSecondPer,
        SessionSecondYear,
        YearSecondYear,
      
        YearThirdPer,
        SessionThirdYear,
        YearThirdYear,
      
        YearFourthPer,
        SessionFourthYear,
        YearFourthYear,
      
        FirstSemesterPer,
        FirstSemesterSession,
        FirstSemesterMonth,
      
        SecondSemesterPer,
        SecondSemesterSession,
        SecondSemesterMonth,
      
      
        ThirdSemesterPer,
        ThirdSemesterSession,
        ThirdSemesterMonth,
      
      
        FourthSemesterPer,
        FourthSemesterSession,
        FourthSemesterMonth,
      
      
        FivethSemesterPer,
        FivethSemesterSession,
        FivethSemesterMonth,
      
      
        SixSemesterPer,
        SixSemesterSession,
        SixSemesterMonth,
      
      
      
        SeventhSemesterPer,
        SeventhSemesterSession,
        SeventhSemesterMonth,
      
      
        EightSemesterPer,
        EightSemesterSession,
        EightSemesterMonth,
        duration,
        semester)
      {
      
       
       console.log("This is Year 1");
console.log(FirstSemesterMonth);

console.log("This is Year 2");
console.log(SecondSemesterMonth);


console.log("This is Year 3");
console.log(ThirdSemesterMonth);


console.log("This is Year 4");
console.log(FourthSemesterMonth);

if(semester=="Semester")
{
    if (duration == 1) {
 await   this.updateMarks(rollno, course, FirstSemesterPer, "1", semester);
} else if (duration == 2) {
 await   this.updateMarks(rollno, course, FirstSemesterPer, "1", semester);
  await  this.updateMarks(rollno, course, SecondSemesterPer, "2", semester);
} else if (duration == 3) {
await    this.updateMarks(rollno, course, FirstSemesterPer, "1", semester);
await    this.updateMarks(rollno, course, SecondSemesterPer, "2", semester);
await    this.updateMarks(rollno, course, ThirdSemesterPer, "3", semester);
} else if (duration == 4) {
await    this.updateMarks(rollno, course, FirstSemesterPer, "1", semester);
await    this.updateMarks(rollno, course, SecondSemesterPer, "2", semester);
await    this.updateMarks(rollno, course, ThirdSemesterPer, "3", semester);
await    this.updateMarks(rollno, course, FourthSemesterPer, "4", semester);
} else if (duration == 5) {
await    this.updateMarks(rollno, course, FirstSemesterPer, "1", semester);
await    this.updateMarks(rollno, course, SecondSemesterPer, "2", semester);
await    this.updateMarks(rollno, course, ThirdSemesterPer, "3", semester);
await    this.updateMarks(rollno, course, FourthSemesterPer, "4", semester);
await    this.updateMarks(rollno, course, FifthSemesterPer, "5", semester);
} else if (duration == 6) {
await    this.updateMarks(rollno, course, FirstSemesterPer, "1", semester);
await    this.updateMarks(rollno, course, SecondSemesterPer, "2", semester);
await    this.updateMarks(rollno, course, ThirdSemesterPer, "3", semester);
await    this.updateMarks(rollno, course, FourthSemesterPer, "4", semester);
await    this.updateMarks(rollno, course, FifthSemesterPer, "5", semester);
await    this.updateMarks(rollno, course, SixthSemesterPer, "6", semester);
} else if (duration == 7) {
   await this.updateMarks(rollno, course, FirstSemesterPer, "1", semester);
await    this.updateMarks(rollno, course, SecondSemesterPer, "2", semester);
await    this.updateMarks(rollno, course, ThirdSemesterPer, "3", semester);
await    this.updateMarks(rollno, course, FourthSemesterPer, "4", semester);
await    this.updateMarks(rollno, course, FifthSemesterPer, "5", semester);
await    this.updateMarks(rollno, course, SixthSemesterPer, "6", semester);
await    this.updateMarks(rollno, course, SeventhSemesterPer, "7", semester);
} else if (duration == 8) {
await    this.updateMarks(rollno, course, FirstSemesterPer, "1", semester);
await    this.updateMarks(rollno, course, SecondSemesterPer, "2", semester);
    await this.updateMarks(rollno, course, ThirdSemesterPer, "3", semester);
await    this.updateMarks(rollno, course, FourthSemesterPer, "4", semester);
await    this.updateMarks(rollno, course, FifthSemesterPer, "5", semester);
await    this.updateMarks(rollno, course, SixthSemesterPer, "6", semester);
await    this.updateMarks(rollno, course, SeventhSemesterPer, "7", semester);
await    this.updateMarks(rollno, course, EighthSemesterPer, "8", semester);
}

}
else if(semester=="Year")
{
    if (duration == 1) {
await    this.updateMarks(rollno, course, YearFirstPer, "1", semester);
} else if (duration == 2) {
  await  this.updateMarks(rollno, course, YearFirstPer, "1", semester);
await    this.updateMarks(rollno, course, YearSecondPer, "2", semester);
} else if (duration == 3) {
await    this.updateMarks(rollno, course, YearFirstPer, "1", semester);
await    this.updateMarks(rollno, course, YearSecondPer, "2", semester);
await    this.updateMarks(rollno, course, YearThirdPer, "3", semester);
} else if (duration == 4) {
await    this.updateMarks(rollno, course, YearFirstPer, "1", semester);
await    this.updateMarks(rollno, course, YearSecondPer, "2", semester);
await    this.updateMarks(rollno, course, YearThirdPer, "3", semester);
await    this.updateMarks(rollno, course, YearFourthPer, "4", semester);
}

}




   const stusqlResult = await p.query(`SELECT id FROM student WHERE rollno='${rollno}'`);
      const stuId = stusqlResult.rows[0].id;
 
   
   
   
   let xx=`delete from shri_issue where stu_id=$1`;
   let yy=[stuId];
   let zz=await p.query(xx,yy);
   
   
let a1=`insert into shri_issue(stu_id) values($1)`;
            let b1=[stuId];
        let c1=await p.query(a1,b1);
        
 
    
      if (YearFirstPer != '0') {
    this.updateIssueDate(YearFirstYear, SessionFirstYear, "yr1", stuId);
    console.log("First");
}

if (YearSecondPer!='0') {
    this.updateIssueDate(YearSecondYear, SessionSecondYear, "yr2", stuId);
    console.log("Second");
}

if (YearThirdPer !='0') {
    this.updateIssueDate(YearThirdYear, SessionThirdYear, "yr3", stuId);
    console.log("Third");
}

if (YearFourthPer != '0') {
    this.updateIssueDate(YearFourthYear, SessionFourthYear, "yr4", stuId);
    console.log("Fourth");
}

if (FirstSemesterPer != '0') {
    this.updateIssueDate(FirstSemesterMonth, FirstSemesterSession, "sem1", stuId);
    console.log("First Semester");
}

if (SecondSemesterPer != '0') {
    this.updateIssueDate(SecondSemesterMonth, SecondSemesterSession, "sem2", stuId);
    console.log("Second Semester");
}

if (ThirdSemesterPer != '0') {
    this.updateIssueDate(ThirdSemesterMonth, ThirdSemesterSession, "sem3", stuId);
    console.log("Third Semester");
}

if (FourthSemesterPer != '0') {
    this.updateIssueDate(FourthSemesterMonth, FourthSemesterSession, "sem4", stuId);
    console.log("Fourth Semester");
}

if (FivethSemesterPer != '0') {
    this.updateIssueDate(FivethSemesterMonth, FivethSemesterSession, "sem5", stuId);
    console.log("Fivth Semester");
}

if (SixSemesterPer != '0') {
    this.updateIssueDate(SixSemesterMonth, SixSemesterSession, "sem6", stuId);
    console.log("Sixth Semester");
}

if (SeventhSemesterPer != '0') {
    this.updateIssueDate(SeventhSemesterMonth, SeventhSemesterSession, "sem7", stuId);
    console.log("Seventh Semester");
}

if (EightSemesterPer != '0') {
    this.updateIssueDate(EightSemesterMonth, EightSemesterSession, "sem8", stuId);
    console.log("Eight Semester");
}

await  this.UpdateCertificateIssueDate(stuId);
       
        let a=await p.query("UPDATE public.results SET  yr1="+YearFirstPer+"  , yr2="+YearSecondPer+", yr3="+YearThirdPer+", yr4="+YearFourthPer+" , sem1="+FirstSemesterPer+", sem2="+SecondSemesterPer+", sem3="+ThirdSemesterPer+", sem4="+FourthSemesterPer+", sem5="+FivethSemesterPer+", sem6="+SixSemesterPer+", sem7="+SeventhSemesterPer+", sem8="+EightSemesterPer+" , yr_month1="+SessionFirstYear+", yr_month2="+SessionSecondYear+", yr_month3="+SessionThirdYear+", yr_month4="+SessionFourthYear+" , yr_yr1="+YearFirstYear+", yr_yr2="+YearSecondYear+", yr_yr3="+YearThirdYear+", yr_yr4="+YearFourthYear+" , semester_month1='"+FirstSemesterSession+"'  , semester_month2='"+SecondSemesterSession+"', semester_month3='"+ThirdSemesterSession+"', semester_month4='"+FourthSemesterSession+"', semester_month5='"+FivethSemesterSession+"', semester_month6='"+SixSemesterSession+"', semester_month7='"+SeventhSemesterSession+"', semester_month8='"+EightSemesterSession+"' , semester_yr1='"+FirstSemesterMonth+"', semester_yr2='"+SecondSemesterMonth+"', semester_yr3='"+ThirdSemesterMonth+"', semester_yr4='"+FourthSemesterMonth+"', semester_yr5='"+FivethSemesterMonth+"', semester_yr6='"+SixSemesterMonth+"', semester_yr7='"+SeventhSemesterMonth+"', semester_yr8='"+EightSemesterMonth+"'  WHERE id="+id+"");

        return {Status:true};
        


    


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



       static async getResultByRollNo(Id,a,type) {
        try {
   
   console.log("This is Id");
console.log(Id);

console.log(`This is Type ${type}`);
console.log(`This is Duration ${a}`);


let query = "SELECT * FROM shri_issue WHERE stu_id = $1";
let values = [Id];  // `Id` will be properly handled as a parameter

let c = (await p.query(query, values)).rows;
       
//   console.log("This is Id");
//   console.log(Id);

// let a="select * from shri_issue where stu_id='"+Id+"'";
// let b=[Id];
// let c=(await p.query(a,b)).rows;
// let c=(await p.query("select * from shri_issue where stu_id='"+Id+"'")).rows;


let isCheck=false;
for(let i=0;i<c.length;i++)
{
if( (c[i].yr1=='') &&  (c[i].yr2=='') && (c[i].yr3=='') && (c[i].yr4=='') && (c[i].sem1=='') && (c[i].sem2=='') && (c[i].sem3=='') && (c[i].sem4=='') && (c[i].sem5=='') && (c[i].sem6=='') && (c[i].sem7=='') && (c[i].sem8==''))
{
    isCheck=true;
}
}

if(isCheck)
{
    let xx='select t1.* from results t1 join student t2 on t2.rollno=t1.rollno where t2.id=$1';
let yy1=[Id];
let zz=(await p.query(xx,yy1)).rows;
let yy='';
let examMonth='';

console.log(zz);


for(let j=0;j<zz.length;j++)
{
    let a = 1;

if (type === "Year") {
    console.log("This is Year");

   
    yy = zz[j][`yr_yr${a}`];
    console.log(yy);

    examMonth = zz[j][`yr_month${a}`];
    console.log(examMonth);
}

if (type === "Semester") {
    yy = zz[j][`semester_yr${a}`];
    examMonth = zz[j][`semester_month${a}`];
}

}

let reissue=`${(await this.getReissueDate(yy,examMonth))}  ${yy}`;



if (type === "Year") {
 

let pp=`update shri_issue set yr${a}=$1 where stu_id=$2`;
let qq=[reissue,Id];
let rr=await p.query(pp,qq);

   

}

if (type === "Semester") {
  let pp=`update shri_issue set sem${a}=$1 where stu_id=$2`;
let qq=[reissue,Id];
let rr=await p.query(pp,qq);
}
console.log(`This is Reisse ${reissue}`);
}


let result=await p.query("select t2.subject,t1.subject_no from shri_marksheet t1 join subject t2 on t2.id=t1.subject_id  where t1.stu_id='"+Id+"' and t1.no_of_sem_yr='"+a+"'");


return result.rows;



        } catch (err) {
          console.error('Error executing query', err);
          throw err;
        }
      }




    
       

}
module.exports=Result;
