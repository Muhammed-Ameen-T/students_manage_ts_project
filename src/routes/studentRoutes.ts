import express from 'express';
import { StudentController } from '../controllers/studentController'; // Ensure correct import path

const router = express.Router();
const studentController = new StudentController();

router.get('/', studentController.fetchAllStudents);
router.patch('/toggle/:id', studentController.blockUnblock);
router.post('/add', studentController.addStudent);
router.put('/edit/:id', studentController.modifyStudent);
router.delete('/delete/:id', studentController.removeStudent);

export default router;

