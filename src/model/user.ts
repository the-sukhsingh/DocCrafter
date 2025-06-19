import mongoose from "mongoose";

export interface IUser {
    _id: mongoose.Types.ObjectId;
    username: string;
    email: string;
    projects: mongoose.Types.ObjectId[];
    remainingProjects: number;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    projects: [{ type: mongoose.Types.ObjectId, ref: 'Project' }],
    remainingProjects: { type: Number, default: 3 }, // Default to 0 projects
}, {
    timestamps: true,
});

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;