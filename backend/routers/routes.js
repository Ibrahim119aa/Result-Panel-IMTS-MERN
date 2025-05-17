const express = require('express');
const multer = require('multer');
const path = require('path');
require('dotenv').config();
const fs = require('fs');
const router = express.Router();
const studentController = require('../controllers/studentController');
const universitycontroller = require('../controllers/universityController');
const coursecontroller = require('../controllers/courseController');
const specializationcontroller = require('../controllers/specializationController');
const sessioncontroller = require('../controllers/sessionController');
const bookscontroller = require('../controllers/bookscontroller');
const resultcontroller = require('../controllers/resultcontroller');
const subjectcontroller = require('../controllers/subjectcontroller');

const certificateController = require('../controllers/certificateController');



const requireLogin = (req, res, next) => {
  if (!req.session.username) {
    return res.json({
      Status: false
    });
  }
  next();
};


const p = require('../configuration/database');


router.get("/get-Index", async (req, res) => {
  let a = (await p.query("select id from student ")).rows;

  res.send(a);

})

router.get("/get-Certificates", async (req, res) => {
  let a = await certificateController.getCertificate();
  res.send(a);

})


router.get("/delete-Certificates", async (req, res) => {
  let a = await certificateController.deleteCertificate(req.query.Id);
  res.send(a);

})


router.post("/Add-Certificate", async (req, res) => {
  const { lastyear,
    year,
    serial
  } = req.body;

  let a = await certificateController.addCertificate(lastyear,
    year,
    serial);
  res.send(a);

})

router.get("/get-Old-Password", async (req, res) => {
  console.log("I am Old");
  let user = req.session.username;

  let b = await studentController.getOldPassword(user);


  console.log(b);

  res.send(b);

})

router.post("/Update-Password", async (req, res) => {
  console.log(req.body);

  const user = req.session.username;
  let { oldpassword,
    newpassword } = req.body;

  let b = await studentController.UpdatePassword(oldpassword, newpassword, user);

  res.send(b);
})

router.get('/dashboard', (req, res) => {
  res.json(
    {
      Status: true,
      username: req.session.username
    }
  );
});


router.get("/get-Admin-Username", (req, res) => {
  res.json(
    {
      username: req.session.username
    }

  )
});


router.post('/Admin-Login', express.json(), (req, res) => {
  const { username, password } = req.body;


  req.session.username = username;


  res.json(
    {
      Status: true
    }
  )
});

router.get("/get-BBA-Student", async (req, res) => {
  const r = await studentController.getBBAStudent();


  res.json(
    {
      "Total": r
    }
  );


});


router.get("/get-Advance-Certificate-Student", async (req, res) => {
  const r = await studentController.getAdvanceCertificateStudent();



  res.json(
    {
      "Total": r
    }
  );


});




router.get("/get-DBA-Student", async (req, res) => {
  const r = await studentController.getDBAStudent();



  res.json(
    {
      "Total": r
    }
  );


});



router.get("/get-MBA-Student", async (req, res) => {
  const r = await studentController.getMBAStudent();



  res.json(
    {
      "Total": r
    }
  );


});


router.get("/get-Dual-MBA-Student", async (req, res) => {
  const r = await studentController.getDualMBAStudent();



  res.json(
    {
      "Total": r
    }
  );


});

router.get("/get-Total-Course", async (req, res) => {
  const t = await coursecontroller.getTotalCourse();


  res.json(
    {
      "total": t
    }
  );

})



router.post('/get-Result-By-Roll-No', async (req, res) => {
  const { Id, duration, s } = req.body;

  console.log(req.body)
    ;
  const result = await resultcontroller.getResultByRollNo(Id, duration, s);
  const std = await studentController.getStudentBYRollNo1(Id);


  res.json(
    [
      {
        "Student": std,
        "Result": result
      }
    ]
  )
    ;



})


router.post('/User-Login', express.json(), (req, res) => {
  const { username, password } = req.body;




  // req.session.username = username;

  const u = studentController.getStudentBYRollNoLogin(username);

  res.json(
    {
      Status: u
    }
  );

});


router.post('/logout', (req, res) => {

  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send('Your Successfully Logout');
    }
  });
});



router.get('/Check-Admin-Login', requireLogin, (req, res) => {

});




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Students');

  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);


  }
});



const upload = multer({ storage: storage });

router.post("/Save-Images", upload.array("image", 10), async (req, res) => {
  console.log("Memion");

  res.json(
    {
      Status: true
    }
  );

})
router.get("/Add-Student12", async (req, res) => {


  console.log(req.query);

  const { rollno, Name, fathername, DOB, mobile, Email, course, specialization, exam, session, image } = req.query;

  const r = await studentController.Add(rollno, Name, fathername, DOB, mobile, Email, course, specialization, exam, image, session.toString());



  res.json({
    Status: true
  });
});
router.post("/Add-Student", async (req, res) => {


  console.log(req.body);

  //   const { rollno,Name,fathername,DOB,mobile,Email,course,specialization,exam,session,image} = req.body;

  //   const r=await studentController.Add(rollno,Name,fathername,DOB,mobile,Email,course,specialization,exam,image,session.toString());



  res.json({
    Status: true
  });
});

router.post("/get-Course-Name", async (req, res) => {
  const { university } = req.body;

  const r = await coursecontroller.getCourseName(university);


  res.send(r)
    ;
})

router.post("/get-Specialization-Name", async (req, res) => {
  const { course } = req.body;
  console.log("This is COurse Id");
  console.log(course);

  const r = await specializationcontroller.getSpecializationByCourse(course);


  res.send(r)
    ;
});

router.post("/get-Course-Detail", async (req, res) => {
  const { course } = req.body;

  const r = await coursecontroller.getCourseDetail(course);

  res.send(r);
})



router.get("/get-Just", async (req, res) => {
  res.send("This is Just");

})


router.post("/Add-Result", async (req, res) => {


  const { id,
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
    semester } = req.body;



  const r = await resultcontroller.Add(id,
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
    semester);




  res.json({
    Status: true
  });
});



router.post("/Update-Particular-Student-Result", async (req, res) => {


  // const { id,Name,rollno,course,percentagefirstyear,sessionfirstyear,yearfirstyear,percentagesecondyear,sessionsecondyear,yearsecondyear} = req.body;



  // const r=await resultcontroller.UpdateParticlarResult(id,Name,rollno,course,percentagefirstyear,sessionfirstyear,yearfirstyear,percentagesecondyear,sessionsecondyear,yearsecondyear);


  const { id,
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
    semester } = req.body;


  const r = await resultcontroller.UpdateParticlarResult(id,
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
    semester);

  res.json({
    Status: true
  });
});



router.post("/Add-Subject", async (req, res) => {


  const { coursename, coursetype, specialization, duration, semester, subject, subjectcode } = req.body;

  const r = await subjectcontroller.Add(coursename, coursetype, specialization, duration, semester, subject, subjectcode);



  res.json({
    Status: true
  });
});

router.get("/get-Particular-Student", async (req, res) => {
  const { Id } = req.query;

  const r = await studentController.getParticularStudent(Id);




  res.send(r);

});



router.get("/get-Particular-Subject", async (req, res) => {
  const { Id } = req.query;

  const r = await subjectcontroller.getParticularSubject(Id);




  res.send(r);

});


router.post("/Update-Particular-Subject", async (req, res) => {


  const { id, coursename, coursetype, specialization, duration, semester, subject, subjectcode } = req.body;



  const r = await subjectcontroller.UpdateParticlarSubject(id, coursename, coursetype, specialization, duration, semester, subject, subjectcode);



  res.json({
    Status: true
  });
});


router.post("/Add-Examination", async (req, res) => {
  const { rollno, coursetype, studentname, title } = req.body;


  const r = await studentController.addExam(rollno, coursetype, studentname, title);


  res.send(
    {
      Status: true
    }
  );
});

router.post("/Add-Feedback", async (req, res) => {
  const { ftype, username, message } = req.body;


  const r = await studentController.addfeedback(ftype, username, message);


  res.send(
    {
      Status: true
    }
  );
});



router.get("/get-Particular-Result", async (req, res) => {
  const { Id } = req.query;

  const r = await resultcontroller.getParticularResult(Id);




  res.send(r);

});


router.get("/get-Total-Student", async (req, res) => {
  let t = await studentController.getTotalStudent();


  res.json(
    {
      total: t
    }
  )

})

router.get("/Student-Login", async (req, res) => {
  const { username, password } = req.query;

  console.log(req.query);


  const student = await studentController.getStudentBYRollNoLogin(username, password);

  console.log(student.length);


  if (student.length > 0) {
    console.log("I am")
    req.session.username = student[0].rollno;
    res.send({
      Status: true
    });
  }
  // if (student && typeof student === 'object' && Object.keys(student).length > 0) {
  //     req.session.username = rollno;
  //     res.send({
  //         Status: true
  //     });
  // } else {
  //     res.send({
  //         Status: false
  //     });
  // }











})


router.post("/Update-Image", async (req, res) => {
  console.log(req.body);

  let a = await studentController.UpdateImage(req.body.id, req.body.image);

  console.log(a);

  res.send(a);

})
router.get("/get-Subject", async (req, res) => {
  const r = await subjectcontroller.getSubject(req.query.page, req.query.size);



  res.send(r);

});


router.get("/get-All-Subject", async (req, res) => {
  const r = await subjectcontroller.getAllSubject(req.query.page, req.query.size);



  res.send(r);

});

router.get("/Get-Subject-By-Name", async (req, res) => {

  console.log(req.query);


  const r = await subjectcontroller.getSubjectbyName(req.query.name, req.query.page, req.query.limit);

  res.send(r);






})




router.get("/get-Subject1", async (req, res) => {
  const r = await subjectcontroller.getSubject1();


  res.send(r);

})
router.post("/Get-Student-By-Roll-No2", async (req, res) => {

  let roll = req.session.username;
  console.log(req.session.username);



  r = await studentController.getStudentByRollNo7(roll);






  res.send(r);


})

router.post("/Get-Student-By-Roll-No1", async (req, res) => {
  console.log("THis is ROllno1");
  console.log("THis is Roo");

  console.log(req.body);

  const { rollno } = req.body;
  let roll = req.session.username;
  console.log(req.session.username);
  console.log(rollno);


  r = await studentController.getStudentByRollNo5(rollno);



  // {
  //     
  // }


  console.log(r);

  res.send(r);


})

router.get("/Get-Student-By-Roll-Noa", async (req, res) => {
  console.log("THis is ROllno1");
  const { rollno } = req.query;

  console.log(rollno);


  r = await studentController.getStudentByRollNoa(rollno);



  // {
  //     
  // }


  res.send(r);


})


router.get("/Get-Student-By-Roll-No7", async (req, res) => {

  const rollno = req.session.username;

  const r = await studentController.getStudentByRollNo7(rollno);

  res.send(r);


})

router.get("/Get-Student-By-Roll-No", async (req, res) => {


  const r = await studentController.getStudentByRollNo4(req.query.rollno, req.query.page, req.query.limit);

  res.send(r);


})


router.get("/Get-Student-By-Roll-No2", async (req, res) => {


  const r = await studentController.getStudent1(req.query.rollno);

  res.send(r);


})


router.get("/Get-University-By-Name", async (req, res) => {


  const r = await universitycontroller.getUniversityByName(req.query.name, req.query.page, req.query.limit);

  res.send(r);






})



router.get("/Get-Book-By-Name", async (req, res) => {


  const r = await bookscontroller.getBooksbyTitle(req.query.name, req.query.page, req.query.limit);

  res.send(r);
  // res.json(
  //   {
  //     name:req.query.name,
  //     page:req.query.page,
  //     limit:req.query.limit
  //   }
  // );







})

router.get("/Get-Session-By-Name", async (req, res) => {


  const r = await sessioncontroller.getSessionbyTitle(req.query.name, req.query.page, req.query.limit);

  res.send(r);






})
router.get("/Get-Student-By-Email", async (req, res) => {


  const r = await studentController.getStudentBYEmail(req.query.email, parseInt(req.query.page), parseInt(req.query.limit));


  res.send(r);


})

router.get("/Get-Student-By-DOB", async (req, res) => {


  const r = await studentController.getStudentBYDOB(req.query.DOB, parseInt(req.query.page), parseInt(req.query.limit));



  res.send(r);


})

router.get("/Get-Student-By-Enrollment-No", async (req, res) => {
  const { rollno } = req.query;

  const r = await studentController.getStudentByEn(rollno);

  res.json(r);


})

router.post("/Update-Particular-Student", async (req, res) => {
  const { id, rollno, Name, fathername, DOB, mobile, Email, course, specialization, session, exam } = req.body;


  const r = await studentController.UpdateParticlarStudent(id, rollno, Name, fathername, DOB, mobile, Email, course, specialization, exam, session);


  res.json({
    Status: true
  });




});


router.post("/Update-Particular-Subject", async (req, res) => {
  const { id, coursename, coursetype, duration, semester, specialization, subject, subjectcode } = req.body;



  const u = {
    coursename: coursename,
    coursetype: coursetype,
    duration: duration,
    semester: semester,
    specialization: specialization,
    subject: subject,
    subjectcode: subjectcode
  };
  const r = await subjectcontroller.UpdateParticlarSubject(id, u);


  res.json({
    Status: true
  });




});


router.get("/get-Particular-University", async (req, res) => {
  const { Id } = req.query;

  const r = await universitycontroller.getParticularUniversity(Id);




  res.send(r);

});


router.post("/Update-Particular-University", async (req, res) => {



  const { id, Name, Code } = req.body;

  const r = await universitycontroller.UpdateParticlarUniversity(id, Name, Code)

  res.json({
    Status: true
  });
});



router.get("/get-Particular-Course", async (req, res) => {
  const { Id } = req.query;

  const r = await coursecontroller.getParticularCourse(Id);




  res.send(r);

});
router.get("/get-Particular-Specialization", async (req, res) => {
  const { Id } = req.query;

  const r = await specializationcontroller.getParticularSpecialization(Id)




  res.send(r);

});



router.get("/get-Particular-Session", async (req, res) => {
  const { Id } = req.query;

  const r = await sessioncontroller.getParticularSession(Id)




  res.send(r);

});



router.get("/get-Particular-Book", async (req, res) => {
  const { Id } = req.query;

  const r = await bookscontroller.getParticularBook(Id);





  res.send(r);

});

router.post("/Update-Particular-Book", async (req, res) => {
  const { id, coursetype, specialization, title, url } = req.body;


  const r = await bookscontroller.UpdateParticlarBook(id, coursetype, specialization, title, url);




  res.json({
    Status: true
  });
});
router.post("/Update-Particular-Course", async (req, res) => {



  const { id, university, coursetype, coursename, coursedescription, coursecode, sequence, duration, semester } = req.body;


  const r = await coursecontroller.UpdateParticlarCourse(id, university, coursetype, coursename, coursedescription, coursecode, sequence, duration, semester);



  res.json({
    Status: true
  });


});



router.post("/Update-Particular-Session", async (req, res) => {
  const { id, session, year, serial } = req.body;




  const r = await sessioncontroller.UpdateParticlarSession(id, session, year, serial)


  res.json({
    Status: true
  });
});


router.post("/Update-Particular-Specialization", async (req, res) => {



  const { id, university, coursetype, specialization, specializationcode, coursefee, registrationfee, examfee } = req.body;



  const r = await specializationcontroller.UpdateParticlarSpecialization(id, university, coursetype, specialization, specializationcode, coursefee, registrationfee, examfee);



  res.json({
    Status: true
  });


});



router.get("/Delete-Student", async (req, res) => {
  const { Id } = req.query;

  const r = await studentController.DeleteStudent(Id);




  res.json({
    Status: true
  });
});


router.get("/Delete-Subject", async (req, res) => {
  const { Id } = req.query;

  const r = await subjectcontroller.DeleteSubject(Id)




  res.json({
    Status: true
  });
});


router.get("/Delete-Result", async (req, res) => {
  const { Id } = req.query;

  const r = await resultcontroller.DeleteResult(Id);





  res.json({
    Status: true
  });
});

router.get("/Delete-University", async (req, res) => {
  const { Id } = req.query;

  const r = await universitycontroller.DeleteUniversity(Id);





  res.json({
    Status: true
  });
});


router.get("/Delete-Course", async (req, res) => {
  const { Id } = req.query;

  const r = await coursecontroller.DeleteCourse(Id);




  res.json({
    Status: true
  });



});



router.get("/Delete-Specialization", async (req, res) => {
  const { Id } = req.query;

  const r = await specializationcontroller.DeleteSpecialization(Id);

  res.json({
    Status: true
  });






});


router.get("/Delete-Session", async (req, res) => {
  const { Id } = req.query;

  const r = await sessioncontroller.DeleteSession(Id);


  res.json({
    Status: true
  });





});

router.get("/Delete-Book", async (req, res) => {
  const { Id } = req.query;

  const r = await bookscontroller.DeleteBook(Id);







  res.json({
    Status: true
  });
});


router.get("/get-University", async (req, res) => {


  console.log(req.query);
  const r = await universitycontroller.getUniversity(req.query.page, req.query.limit, req.query.name, req.query.tocChecked);


  res.send(r);






});


router.get("/get-University1", async (req, res) => {


  const r = await universitycontroller.getUniversity1();


  return res.send(r);






});




router.get("/get-Result1", async (req, res) => {


  const r = await resultcontroller.getResult1();



  return res.send(r);






});



router.get("/get-Courses", async (req, res) => {


  const r = await coursecontroller.getCourses(req.query.page, req.query.size);





  return res.send(r);






});


router.get("/get-Result", async (req, res) => {


  const r = await resultcontroller.getResult(req.query.page, req.query.size, req.query.name);








  res.send(r);






});
router.get("/Get-Result-By-RollNo", async (req, res) => {


  const r = await resultcontroller.getResultbyRollNo1(req.query.name, req.query.page, req.query.limit);

  res.send(r);






})

router.get("/get-All-Course", async (req, res) => {
  let a = await coursecontroller.getAllCourses();

  res.send(a);

})
router.get("/get-Courses1", async (req, res) => {


  const r = await coursecontroller.getCourses1();





  return res.send(r);






});


router.get("/Get-Course-By-Name", async (req, res) => {


  const r = await coursecontroller.getCoursebyName(req.query.name, req.query.page, req.query.limit);

  res.send(r);






})




router.get("/get-Course1", async (req, res) => {
  const r = await coursecontroller.getCourses1();



  res.send(r);

})



router.get("/get-Specialization1", async (req, res) => {


  const r = await specializationcontroller.getSpecialization1();



  return res.send(r);






});

router.get("/get-All-Specialization", async (req, res) => {
  const r = await specializationcontroller.getAllSpecialization();



  res.send(r);

})

router.get("/get-Specialization", async (req, res) => {
  const r = await specializationcontroller.getSpecialization(req.query.page, req.query.size);



  res.send(r);

})



router.get("/Get-Specialization-By-Name", async (req, res) => {


  const r = await specializationcontroller.getSpecializationbyName(req.query.name, req.query.page, req.query.limit);

  res.send(r);






})




router.get("/get-Session1", async (req, res) => {


  const r = await sessioncontroller.getSession1();




  return res.send(r);






});


router.get("/get-Session", async (req, res) => {


  const r = await sessioncontroller.getSession(req.query.page, req.query.size);




  return res.send(r);






});


router.get("/get-Books", async (req, res) => {


  const r = await bookscontroller.getBooks(req.query.page, req.query.size);
  res.send(r);

});

router.get("/get-Books1", async (req, res) => {


  const rollno = req.session.username;
  const r = await bookscontroller.getBooks1(rollno);
  res.send(r);

});

router.get("/get-All-Books", async (req, res) => {


  const r = await bookscontroller.getAllBooks();





  return res.send(r);






});

router.get("/get-Student", async (req, res) => {


  const { page, size, rollno, email, dob,
    allRecords } = req.query;


  console.log("This is Student Panel");


  const r = await studentController.getStudent(
    page, size, rollno, email, dob,
    allRecords);

  res.send(r);

});

router.get("/fetch-All-Result", async (req, res) => {
  let a = await resultcontroller.fetchAllResult();


  console.log(a.records);

  res.send(a);
  console.log("<M");


})


router.get("/get-All-Result", async (req, res) => {
  let a = await resultcontroller.fetchAllResult();
  // l

  console.log(a.records);

  res.send(a);
  console.log("<M");


})
router.get("/get-All-Student", async (req, res) => {



  const r = await studentController.getAllStudent();


  return res.json(r);






});


router.post("/Add-Specialization", async (req, res) => {
  const { university, coursetype, specialization, specializationcode, coursefee, registrationfee, examfee } = req.body;

  const r = await specializationcontroller.Add(university, coursetype, specialization, specializationcode, coursefee, registrationfee, examfee);




  res.json({
    Status: true
  });
});



router.post("/Add-Books", async (req, res) => {
  const { coursetype, specialization, title, url } = req.body;

  const r = await bookscontroller.Add(coursetype, specialization, title, url);




  res.json({
    Status: true
  });
});


router.post("/Add-Session", async (req, res) => {
  const { session, year, serial } = req.body;

  const r = await sessioncontroller.Add(session, year, serial);





  res.json({
    Status: true
  });
});

router.post("/Add-Course", async (req, res) => {
  const { university, coursetype, coursename, coursedescription, coursecode, sequence, duration, semester } = req.body;

  const r = await coursecontroller.Add(university, coursetype, coursename, coursedescription, coursecode, sequence, duration, semester);



  res.json({
    Status: true
  });
});



router.post("/Add-University", async (req, res) => {
  const { Name, Code } = req.body;

  const r = await universitycontroller.Add(Name, Code);



  res.json({
    Status: true
  });
});

router.post('/Get-Images', async (req, res) => {

  const { rollno } = req.body;


  const imageFolder = path.join(__dirname, 'Students');
  try {
    const student = await studentController.getStudentBYRollNoLogin(rollno);

    if (student && student.image) {
      const Imgurl = `/Students/${student.image}`;
      res.send(Imgurl);
    } else {
      res.send("Image not found");
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).send("Internal Server Error");
  }


});

// router.get('/Get-Images',async (req, res) => {




//   const {rollno}=req.query;

//   const student = await studentController.getStudentBYRollNoLogin(rollno);

// const imageFolder = path.join(__dirname, 'Students');
//   const imageFileNames = fs.readdirSync(imageFolder);

//   const imagePaths = imageFileNames.map((filename) => `/Students/${filename}`);

//   res.send(imagePaths);


// });



module.exports = router;
