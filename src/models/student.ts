import mongoose, { Schema, Document } from 'mongoose';

interface IStudent extends Document {
  name: string;
  age: number;
  email: string;
  status: string;
  grade: string;
}

const StudentSchema: Schema = new Schema({
  name: {
    type: String, 
    required: true 
  },
  age: { 
    type: Number, 
    required: true 
  },
  email: {
    type: String, 
    required: true 
  },
  status:{
    type: String,
    required:true,
    default:'Active',
  },
  major: {
    type: String, 
    required: true 
  },
},{timestamps:true});

const Student = mongoose.model<IStudent>('Student', StudentSchema);
export default Student;
