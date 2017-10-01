'use strict';
module.exports = function(app) {
  var controller = require('../controllers/studentController');

  // todoList Routes
  app.route('/students')
    .get(controller.list_students)
    .post(controller.create_student);


  app.route('/students/:id')
    .get(controller.read_student)
    .put(controller.update_student)
    .delete(controller.delete_student);
};
