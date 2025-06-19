import mongoose from "mongoose";

export interface IProject {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  domain: string;
  user: mongoose.Types.ObjectId;
  currentStep: string;
  answers: {
    question: string;
    answer: string;
  }[];
  chapters: {
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    chapterNo?: number;
    images?: string[];
  }[];
  content?: {
    answers: { question: string; answer: string }[];
    chapters: { title: string; description: string; chapterNo?: number, content: string, images: string[] }[];
    createdAt: Date;
    description: string;
    domain: string;
    title: string;
    updatedAt: Date;
    _id: mongoose.Types.ObjectId;
  };
  fileUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new mongoose.Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  domain: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  currentStep: { type: String, required: true, default: "questions" },
  answers: [
    {
      question: { type: String, required: false },
      answer: { type: String, required: false },
    },
  ],  
  chapters: [
    {
      title: { type: String, required: false },
      description: { type: String, required: false },
      chapterNo: { type: Number, required: false }
    },
  ],
  fileUrl: { type: String, required: false },
}, {
  timestamps: true,
});


const Project = mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);

export default Project;