import mongoose, { Schema } from "mongoose";

export interface UserModel extends mongoose.Document {
  studentId: string;
    user_pw: string;
    admin : boolean;
    semester : string; // 학기
    major: string; // 전공
    currentSubjects : [];
    completeSubjects: [];
    uncompletedSubjects: [];
    abeek : boolean;
    westernBook : number;
    easternBook: number;
    literatureBook: number;
    scienceBook: number;
    volunteerTime: number;
    toeic: number;
    ibt: number;
    teps: number;
    opic: number;
    toeicSpeaking: number;
}
const UserSchema: Schema<UserModel> = new Schema({
    studentId: {type : String},
    user_pw : {type : String},
    admin : {type : Boolean, default : false},
    semester: {type : String},
    major: {type : String},
    currentSubjects : [{ type: mongoose.Schema.Types.ObjectId, ref: 'subject' }],
    completeSubjects : [{ type: mongoose.Schema.Types.ObjectId, ref: 'subject' }],
    uncompletedSubjects : [{ type: mongoose.Schema.Types.ObjectId, ref: 'subject' }],
    abeek: {type : Boolean},
    westernBook : {type : Number},
    easternBook: {type : Number},
    literatureBook: {type : Number},
    scienceBook: {type : Number},
    volunteerTime: {type : Number},
    toeic: {type : Number},
    ibt: {type : Number},
    teps: {type : Number},
    opic: {type : Number},
    toeicSpeaking: {type : Number},
},{ timestamps: true } );

export default  mongoose.model('user', UserSchema);