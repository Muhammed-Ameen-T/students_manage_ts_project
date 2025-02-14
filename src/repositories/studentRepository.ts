import Student from '../models/student';

const getAllStudents = async () => {
  return await Student.find();
};

const studentToggler = async (id: string) => {
  try {
    const student = await Student.findById(id);
    if (student) {
      let newStatus = student.status == 'Active' ? 'Blocked' : 'Active'
      return await Student.findByIdAndUpdate(id,{status:newStatus},{new:true})
    }
  } catch (error) {
    console.error('Error toggling student:', error); 
    throw new Error('Error toggling student');  
  }
};

const createStudent = async (studentData: any) => {
  try {    
    const existing = await Student.findOne({email:studentData.email});
    if (existing) {
      throw new Error('Student with this email already exists');
    }
    const newStudent = new Student({
      name:studentData.name,
      email:studentData.email,
      age:studentData.age,
      major:studentData.major
    });
    return await newStudent.save()
  } catch (error) {
    throw error
  }
};

const updateStudent = async (id: string, studentData: any) => {
  try {
    return await Student.findByIdAndUpdate(id, studentData, { new: true });
  } catch (error) {
    console.log('Error Updatind Student:',error);
    throw new Error('Error while Editing Student')
  }
};

const deleteStudent = async (id: string) => {
  try {
    return await Student.findByIdAndDelete(id);
  } catch (error) {
    console.log('Error Deleting Student:',error);
    throw new Error('Error while Deleing Student')
  }
};

export { getAllStudents, studentToggler, createStudent, updateStudent, deleteStudent };
