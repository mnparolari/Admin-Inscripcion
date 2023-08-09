import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { StudentsService } from "./services/students.service";
import { TestBed } from "@angular/core/testing";
import { Students } from "./models/students";
import { environment } from "src/environments/environment";

describe('StudentsService', () => {
    let service: StudentsService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [StudentsService]
        });
        service = TestBed.inject(StudentsService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should fetch students', () => {
        const mockStudentsLoad: Students[] = [
            {
                id: 1,
                name: "Emilia",
                surname: "López",
                phone: "1155223366",
                email: "emilia@gmail.com",
                password: "EmiliaEmilia123"
            },
        ]
        service.loadStudents();

        const req = httpMock.expectOne(`${environment.baseApiUrl}/students`);
        expect(req.request.method).toBe('GET');
        req.flush(mockStudentsLoad);

        service.getStudents().subscribe(students => {
            expect(students).toEqual(mockStudentsLoad);
        });

        httpMock.verify();
    });

    it('should create a new student', () => {
        const mockStudentsCreated: Students = {
            id: 2,
            name: "Agustin",
            surname: "Gutierrez",
            phone: "1111222233",
            email: "agustin@gmail.com",
            password: "Agustin123"
        }

        service.createStudents(mockStudentsCreated);

        const req = httpMock.expectOne(`${environment.baseApiUrl}/students`);
        expect(req.request.method).toBe('POST');
        req.flush(mockStudentsCreated);

        service.getStudents().subscribe(students => {
            expect(students).toContain(mockStudentsCreated);
        });

        httpMock.verify();
    });

    it('should update an existing student', () => {
        const studentIdToUpdate = 1;
        const mockUpdatedStudent: Students = {
            id: 3,
            name: "Joaquina",
            surname: "Pickin",
            phone: "1166987456",
            email: "joaquina@gmail.com",
            password: "Joaquina123"
        }

        service.updatedStudents(studentIdToUpdate, mockUpdatedStudent);

        const updateReq = httpMock.expectOne(`${environment.baseApiUrl}/students/${studentIdToUpdate}`);
        expect(updateReq.request.method).toBe('PUT');

        updateReq.flush({});

        const loadStudentsReq = httpMock.expectOne(`${environment.baseApiUrl}/students`);
        expect(loadStudentsReq.request.method).toBe('GET');

        loadStudentsReq.flush([]);

        const loadStudentsSpy = spyOn(service, 'loadStudents');
        service.loadStudents();

        expect(loadStudentsSpy).toHaveBeenCalled();

        httpMock.verify();
    });

    it('should delete a student', () => {
        const studentIdToDelete = 1;

        service.deleteStudents(studentIdToDelete);

        const req = httpMock.expectOne(`${environment.baseApiUrl}/students/${studentIdToDelete}`);
        expect(req.request.method).toBe('DELETE');
        req.flush({});

        service.getStudents().subscribe(students => {
            expect(students.some(student => student.id === studentIdToDelete)).toBeFalsy();
        });

        httpMock.verify();
    });

    it('should get a student by ID', () => {
        const mockStudents: Students[] = [
            {
                id: 4,
                name: "Matias",
                surname: "Juarez",
                phone: "1198899889",
                email: "matias@gmail.com",
                password: "Matias123"
            },
        ];

        service.loadStudents();

        const req = httpMock.expectOne(`${environment.baseApiUrl}/students`);
        expect(req.request.method).toBe('GET');
        req.flush(mockStudents);

        const studentIdToFetch = 1;
        service.getStudentById(studentIdToFetch).subscribe(student => {
            const expectedStudent = mockStudents.find(u => u.id === studentIdToFetch);
            expect(student).toEqual(expectedStudent);
        });

        httpMock.verify();
    });
});