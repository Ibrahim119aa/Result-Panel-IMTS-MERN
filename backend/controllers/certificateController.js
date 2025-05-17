const p=require('../configuration/database');

class Certificate 
{
    static async getCertificate()
    {
        let a=await p.query("select * from certificate order by added_date desc");
        return a.rows;
        
    }
     static async deleteCertificate(id)
    {
        let a=("delete from certificate where id=$1");
        let b=[id];
        let c=await p.query(a,b);
        
        return c.rows;
        
        
    }
    static async addCertificate(name,year,serial)
    {
        let a=`insert into certificate(sess_name,year,serial) values($1,$2,$3)`;
        let b=[name,year,serial];
        let c=await p.query(a,b);
        return {
            Status:true
        }
    }
}
module.exports=Certificate;