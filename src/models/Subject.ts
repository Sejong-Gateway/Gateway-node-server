import mongoose, { Schema } from "mongoose";

export interface SubjectModel extends mongoose.Document {
    name: string;
    major: string;
    type: string;
    semester: string;
    tag: [];
    credit: number;
    enteranceYear: string;
}
const SubjectSchema: Schema<SubjectModel> = new Schema({
    name: {type: String},
    major: {type: String},
    type: {type: String},
    semester: {type: String},
    tag: [],
    credit: {type: Number},
    enteranceYear: {type: String},

},{ timestamps: true } );

export default  mongoose.model('subject', SubjectSchema);