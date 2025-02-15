import Student, { IStudent } from '../models/student'; // Ensure correct import path

export class StudentService {
  // Method to get all students with pagination
  public async getAllStudents(page: number, limit: number): Promise<{ students: IStudent[], totalItems: number, totalPages: number, currentPage: number, startIndex: number }> {
    const totalItems = await Student.countDocuments();
    const totalPages = Math.ceil(totalItems / limit);
    const students = await Student.find()
      .skip((page - 1) * limit)
      .limit(limit);
    return { students, totalItems, totalPages, currentPage: page, startIndex: (page - 1) * limit };
  }

  // Method to toggle student status
  public async toggleStudentStatus(id: string): Promise<IStudent | null> {
    const student = await Student.findById(id);
    if (student) {
      const newStatus = student.status === 'Active' ? 'Blocked' : 'Active';
      return await Student.findByIdAndUpdate(id, { status: newStatus }, { new: true });
    }
    return null;
  }

  // Method to create a new student
  public async createStudent(studentData: Partial<IStudent>): Promise<IStudent> {
    const existingStudent = await Student.findOne({ email: studentData.email });
    if (existingStudent) {
      throw new Error('Student with this email already exists');
    }

    const newStudent = new Student(studentData);
    return await newStudent.save();
  }

  // Method to update an existing student
  public async updateStudent(id: string, studentData: Partial<IStudent>): Promise<IStudent | null> {
    return await Student.findByIdAndUpdate(id, studentData, { new: true });
  }

  // Method to delete a student
  public async deleteStudent(id: string): Promise<IStudent | null> {
    return await Student.findByIdAndDelete(id);
  }

}
