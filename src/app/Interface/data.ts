export interface SendData {
    request:any;
    token:string;
}
export interface ResponseDataView {
    status:number;
    message:string;
    data:string;
}
export interface IdNumberNameView {
    id: number;
    name: string;
}
export interface IdStringNameView {
    id: string;
    name: string;
}
export interface StudentsAppliedExam {
    studentId: number;
    studentName: string;
    score: number;
}
export interface GetControlTeachers {
    id: number;
    name: string;
    controlType: string;
}

