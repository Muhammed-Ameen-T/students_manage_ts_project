import { Request, Response } from 'express';
import { StudentService } from '../services/studentService'; // Ensure correct import path

export class StudentController {
  private studentService: StudentService;

  constructor() {
    this.studentService = new StudentService();
  }

  public fetchAllStudents = async (req: Request, res: Response): Promise<void> => {
    try {
      const currentPage = parseInt(req.query.page as string) || 1;
      const limit = 5;
      const { students, totalPages, startIndex } = await this.studentService.getAllStudents(currentPage, limit);
      res.render('home', {
        title: 'Student Management System',
        students,
        currentPage,
        startIndex,
        totalPages
      });
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  public blockUnblock = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.studentService.toggleStudentStatus(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  public addStudent = async (req: Request, res: Response): Promise<void> => {
    try {
      const newStudent = await this.studentService.createStudent(req.body);
      res.status(201).json(newStudent);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  public modifyStudent = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedStudent = await this.studentService.updateStudent(req.params.id, req.body);
      res.json(updatedStudent);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  public removeStudent = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.studentService.deleteStudent(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

}
