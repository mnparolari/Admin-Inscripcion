import { Course } from "../../courses/models/course";
import { Student } from "../../students/models/student"

export interface Inscription {
    id: number, 
    courseId: number,
    studentId: number
}

export interface DataInscription extends Inscription {
    student: Student;
    course: Course;
}

export interface InscriptionPayload {
    courseId: number | null,
    studentId: number | null
}