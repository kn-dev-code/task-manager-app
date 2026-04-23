import mongoose, {Schema, Document, Types} from "mongoose";



export interface TaskDocument extends Document {
  title: string;
  description?: string;
  status: 'complete' | 'in-progress' | 'to-do';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  tags: string[];
  createdAt: Date;
  userId: Types.ObjectId;
  updatedAt: Date;
};

const taskSchema = new Schema<TaskDocument>(
  {
    title: {
      type: String, required: true, trim: true,
    },
    description: {
      type: String, trim: true,
    },
    status: {
      type: String, enum: ['to-do', 'complete', 'in-progress'], default: 'to-do',
    },
    priority: {
      type: String, enum: ['low', 'medium', 'high'], default: 'medium',
    },
    dueDate: {
      type: Date
    },
     userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
  }, {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret: any) => {
        delete ret._id;
        delete ret.__v; 
        return ret;
      }
    }
  }
)

export const TaskModel = mongoose.model<TaskDocument>('Task', taskSchema);