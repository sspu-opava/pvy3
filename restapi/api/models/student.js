'use strict';
var db=require('../dbconnection'); //reference of dbconnection.js

var Student = {

getAll: function(callback){
    return db.query("Select id, jmeno, prijmeni, DATE_FORMAT(datum_narozeni, '%c. %e. %Y') as narozeni, absence, prospech, poznamka, obor, foto, absolvent from student", callback);
},

getById: function(id,callback){
    return db.query("Select id, jmeno, prijmeni, DATE_FORMAT(datum_narozeni, '%c. %e. %Y') as narozeni, absence, prospech, poznamka, obor, foto, absolvent from student where id=?",[id],callback);
},

create: function(Student,callback){
    console.log(Student);
    return db.query("Insert into student (prijmeni,jmeno,datum_narozeni,absence,prospech,poznamka,obor,foto,absolvent) values(?,?,?,?,?,?,?,?,?)",
    [Student.prijmeni,Student.jmeno,Student.datum_narozeni,Student.absence,Student.prospech,Student.poznamka,Student.obor,Student.foto,Student.absolvent],callback);
},

delete: function(id,callback){
    return db.query("Delete from student where id=?",[id],callback);
},

update: function(id,Student,callback){
    console.log(Student);
    return db.query("Update student set prijmeni=?, jmeno=?, datum_narozeni=?,absence=?,prospech=?,poznamka=?,obor=?,foto=?,absolvent=? where id=?",
    [Student.prijmeni,Student.jmeno,Student.datum_narozeni,Student.absence,Student.prospech,Student.poznamka,Student.obor,Student.foto,Student.absolvent,id],callback);
}

};
module.exports=Student;