import express from 'express';
import { fetchAllStudents, blockUnblock, addStudent, modifyStudent, removeStudent } from '../controllers/studentService';
import Student from '../models/student';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const currentPage = parseInt(req.query.page as string) || 1
    const limit = 5;
    const totalItems = await Student.countDocuments();
    const totalPages = Math.ceil(totalItems/limit)
    const students = await Student.find()
      .skip((currentPage-1)*limit)
      .limit(limit)
    res.render('home', { 
      title: 'Student Management System', 
      students,
      currentPage,
      startIndex:((currentPage-1)*limit),
      totalPages
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students' });
  }
});

router.patch('/toggle/:id', async (req, res) => {
  await blockUnblock(req.params.id);
  res.sendStatus(204)
});

router.post('/add', async (req, res) => {
  try {    
    const newStudent = await addStudent(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Unknown error' });
    }
  }
});

router.put('/edit/:id', async (req, res) => {
  const updatedStudent = await modifyStudent(req.params.id, req.body);
  res.json(updatedStudent);
});

router.delete('/delete/:id', async (req, res) => {
  await removeStudent(req.params.id);
  res.sendStatus(204);
});

export default router;
