'use strict';
var Student = require('../models/student'); //reference of dbconnection.js


exports.list_students = function(req, res) {
  Student.getAll(function(err, student) {
    if (err)
      res.send(err);
    res.json(student);
  });
};


exports.create_student = function(req, res) {
  Student.create(req.body, function(err, student) {
    if (err)
      res.send(err);
    res.json(student);
  });
};


exports.read_student = function(req, res) {
  Student.getById(req.params.id, function(err, student) {
    if (err)
      res.send(err);
    res.json(student);
  });
};


exports.update_student = function(req, res) {
  Student.update(req.params.id, req.body, function(err, student) {
    if (err)
      res.send(err);
    res.json(student);
  });
};


exports.delete_student = function(req, res) {
  Student.delete(req.params.id, function(err, student) {
    if (err)
      res.send(err);
    res.json({ message: 'Student successfully deleted' });
  });
};