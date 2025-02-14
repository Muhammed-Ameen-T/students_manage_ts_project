import { getAllStudents, studentToggler, createStudent, updateStudent, deleteStudent } from '../repositories/studentRepository';

const fetchAllStudents = async () => {
  return await getAllStudents();
};

const blockUnblock = async (id: string) => {
  return await studentToggler(id);
};

const addStudent = async (studentData: any) => {
  return await createStudent(studentData);
};

const modifyStudent = async (id: string, studentData: any) => {
  return await updateStudent(id, studentData);
};

const removeStudent = async (id: string) => {
  return await deleteStudent(id);
};

export { fetchAllStudents, blockUnblock, addStudent, modifyStudent, removeStudent };
