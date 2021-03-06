const express = require("express");

const Question = require("../controllers/questionController");

const Teacher = require("../controllers/teacherController");

const authMiddleware = require("../../middleware/auth");

const router = express.Router();

router.use(authMiddleware, Teacher.isTeacher);

router.get("/forum/report", Question.forum_report);

router.get("/discipline/:idDiscipline/class/:idClass", Teacher.show_students);

router.post("/discipline", Teacher.insert_grades);

router.get("/allDisciplines", Teacher.showAllDisciplines);

module.exports = router;
