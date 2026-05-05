export interface User {
    id: number;
    name: string;
    role: string;
    token: string;
    schoolId: number;
    controlType: string;
}
export interface UserClaims {
    id: string;
    role: string;
}
export interface Users {
    id: number;
    name: string;
    role: string;
}
export interface LogIn {
    id: string;
    password: string;
}
