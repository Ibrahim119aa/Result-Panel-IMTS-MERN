require("dotenv").config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const cookieParser = require("cookie-parser");
const p = require('./configuration/database.js');

const cluster = require('cluster');
const os = require('os');
const numCPUs = os.cpus().length;
const expressesion = require('express-session');
const session = require("express-session");
const cron = require('node-cron');

// const studentController=require('./controllers/studentController');

const { exec } = require('child_process');


const app = express();
app.use(express.urlencoded({
  extended: false
}));




app.use(express.json());

app.use('/backend/Students', express.static(path.join(__dirname, 'Students')));






console.log(process.env.user_name);
app.use(express.json());

app.use(cookieParser());
const corsOptions = {
  origin: ['http://localhost:3000','http://localhost:3001'],

  credentials: true,
};

app.use(cors(corsOptions));


// const allowOnlyImtsonline = (req, res, next) => {
//     const allowedDomain = 'imtsonline.in';
//     const origin = req.headers.origin || req.headers.referer;

//     if (origin) {
//         const domain = new URL(origin).hostname;
//         if (domain.endsWith(allowedDomain)) {
//             return next(); 
//         }
//     }
//      res.redirect('https://student.imtsonline.in/');
// };
app.use('/backend/Backup', express.static(path.join(__dirname, 'Backup')))
const backupDir = path.join(__dirname, 'Backup');


app.use('/backend/images', express.static(path.join(__dirname, 'Students')))
const backupDir1 = path.join(__dirname, 'Student');
app.get("/backend/", async (req, res) => {
  res.send("ewerer");

})

app.set('view-engine', 'ejs');


app.get('/backend/get-Database', async (req, res) => {

  let a = await p.query("select * from backup order by added_date desc ");


  res.send(a.rows);

}
);

app.post('/backend/Recover-Database1', async (req, res) => {


  const { Id } = req.body;



  const dbName = 'imtsonline_api';
  const dbPass = 'Website119$';
  const dbHost = 'localhost';
  const dbUser = 'imtsonline_ibrahimmemon';
  const dbPort = '5432';


  const a = await p.query("select * from backup where id='" + Id + "'");
  let b = await a.rows[0].filepath;








  const backupDir1 = path.join(__dirname, `Backup/${b}`);
  if (!fs.existsSync(backupDir1)) {
    return res.status(404).send('SQL file not found');
  }





  const restoreCommand = `/bin/psql -h ${dbHost} -U ${dbUser} -d ${dbName} -f ${backupDir1}`;


  exec(restoreCommand, { env: { PGPASSWORD: dbPass } }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error restoring database: ${error.message}`);
      return res.status(500).send('Error restoring database');
    }
    if (stderr) {
      console.error(`psql stderr: ${stderr}`);
    }
    console.log('Database restored successfully');



  });

  res.send("Database restored successfully");
});
const backupDatabase = async () => {


  const dbName = 'imtsonline_api';
  const dbPass = 'Website119$';
  const dbHost = 'localhost';
  const dbUser = 'imtsonline_ibrahimmemon';
  const dbPort = '5432';


  const date = new Date();
  const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const backupFilePath = path.join(__dirname, 'Backup', `${dbName}-${currentDate}.sql`);



  exec(`pg_dump -h ${dbHost} -U ${dbUser} -p ${dbPort} -F p -b -v -f  ${backupFilePath} ${dbName}`, { env: { PGPASSWORD: dbPass } }, (error, stdout, stderr) => {

    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`Created a backup of ${dbName} at ${date.toLocaleString()} successfully: ${stdout}`);
  });


  const fpath = `${dbName}-${currentDate}.sql`;


  const a = `insert into backup(filepath,mode) values($1,$2)`;
  const b = [fpath, 'Auto'];
  const c = await p.query(a, b);



};


app.get("/backend/delete-Old", async (req, res) => {
  await backupDatabase();


  await deleteOldBackups();


})


cron.schedule('0 0 * * *', async () => {

  await backupDatabase();


  await deleteOldBackups();
  console.log('Scheduled backup and cleanup completed');
});


const deleteOldBackups = () => {
  fs.readdir(backupDir, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
      const filePath = path.join(__dirname, 'Backup', file);
      fs.stat(filePath, (err, stat) => {
        if (err) throw err;

        const now = new Date().getTime();
        const endTime = new Date(stat.mtime).getTime() + 7 * 24 * 60 * 60 * 1000;

        if (now > endTime) {
          fs.unlink(filePath, err => {
            if (err) throw err;
            console.log(`Deleted old backup: ${file}`);
          });
        }
      });
    });
  });
};

const RestoreOldBackups = () => {
  fs.readdir(backupDir, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
      const filePath = path.join(__dirname, 'Backup', file);
      fs.stat(filePath, (err, stat) => {
        if (err) throw err;


        fs.unlink(filePath, err => {
          if (err) throw err;
          console.log(`Deleted old backup: ${file}`);
        });

      });
    });
  });
};



const deleteAllData = async () => {
  try {

    const tablesRes = await p.query(
      `SELECT table_name 
       FROM information_schema.tables 
       WHERE table_schema='public'`
    );
    const tableNames = tablesRes.rows.map(row => row.table_name);

    for (const tableName of tableNames) {
      await p.query(`TRUNCATE TABLE ${tableName} CASCADE`);
    }


  } catch (error) {
    console.error('Error deleting data:', error);
  }
};
app.get("/backend/Mannual-Backup", async (req, res) => {
  backupDatabase();
  res.json({
    Status: true
  });
})


app.use(session({


  secret: '&@#$%^&*()_+',
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: 60 * 60 * 24 * 30,
    secure: false
  },

}));

app.use(cookieParser());

app.use("/backend/", require('./routers/routes'));

const PORT = 3003;


app.get("/testes", async (req, res) => {
  res.send("fgsdfsdf");

})
app.listen(PORT, () => {
  const greet = require('nodetesting1234');
  console.log(greet('Ibrahim Library'));
  console.log(numCPUs);

  console.log("fsdfsdf");

});


