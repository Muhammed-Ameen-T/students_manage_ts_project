import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  age: number;
  email: string;
  status: 'Active' | 'Blocked';
  major: string;
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
    required: true,
    unique:true
  },
  status:{
    type: String,
    required:true,
    enum:['Active','Blocked'],
    default:'Active',
  },
  major: {
    type: String, 
    required: true 
  },
},{timestamps:true});

const Student = mongoose.model<IStudent>('Student', StudentSchema);
export default Student;
