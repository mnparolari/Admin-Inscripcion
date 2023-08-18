import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CoursesService } from "./services/courses.service";
import { TestBed } from "@angular/core/testing";
import { Course } from "./models/course";
import { environment } from "src/environments/environment";


describe('CoursesService', () => {
    let service: CoursesService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CoursesService]
        });
        service = TestBed.inject(CoursesService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should fetch courses', () => {
        const mockCoursesLoad: Course[] = [
            {
                id: 1,
                icon: "./assets/angular.png",
                name: "Angular",
                category: "Programación y Desarrollo",
                teacher: "Martín Parolari",
                courseFrom: "4/8/2023",
                courseTo: "31/8/2023"
            }
        ]
        service.loadCourses();

        const req = httpMock.expectOne(`${environment.baseApiUrl}/courses`);
        expect(req.request.method).toBe('GET');
        req.flush(mockCoursesLoad);

        service.getCourses().subscribe(courses => {
            expect(courses).toEqual(mockCoursesLoad);
        });

        httpMock.verify();
    });

    it('should create a new course', () => {
        const mockCoursesCreated: Course = {
            id: 2,
            icon: "./assets/reactjs.png",
            name: "React JS",
            category: "Programación y Desarrollo",
            teacher: "Juan López",
            courseFrom: "1/2/2023",
            courseTo: "8/5/2023"
        }

        service.createCourses(mockCoursesCreated);

        const req = httpMock.expectOne(`${environment.baseApiUrl}/courses`);
        expect(req.request.method).toBe('POST');
        req.flush(mockCoursesCreated);

        service.getCourses().subscribe(courses => {
            expect(courses).toContain(mockCoursesCreated);
        });

        httpMock.verify();
    });

    it('should update an existing course', () => {
        const coursesIdToUpdate = 1;
        const mockUpdatedCourse: Course = {
            id: 3,
            icon: "./assets/javascript.png",
            name: "Javascript",
            category: "Programación y Desarrollo",
            teacher: "Agustina Pipino",
            courseFrom: "22/10/2023",
            courseTo: "15/12/2023"
        }

        service.updatedCourses(coursesIdToUpdate, mockUpdatedCourse);

        const updateReq = httpMock.expectOne(`${environment.baseApiUrl}/courses/${coursesIdToUpdate}`);
        expect(updateReq.request.method).toBe('PUT');

        updateReq.flush({});

        const loadCoursesReq = httpMock.expectOne(`${environment.baseApiUrl}/courses`);
        expect(loadCoursesReq.request.method).toBe('GET');

        loadCoursesReq.flush([]);

        const loadCoursesSpy = spyOn(service, 'loadCourses');
        service.loadCourses();

        expect(loadCoursesSpy).toHaveBeenCalled();

        httpMock.verify();
    });

    it('should delete a course', () => {
        const courseIdToDelete = 1;

        service.deleteCourses(courseIdToDelete);

        const req = httpMock.expectOne(`${environment.baseApiUrl}/courses/${courseIdToDelete}`);
        expect(req.request.method).toBe('DELETE');
        req.flush({});

        service.getCourses().subscribe(courses => {
            expect(courses.some(course => course.id === courseIdToDelete)).toBeFalsy();
        });

        httpMock.verify();
    });

    it('should get a course by ID', () => {
        const mockCourse: Course[] = [
            {
                id: 4,
                icon: "./assets/java.png",
                name: "Java",
                category: "Programación y Desarrollo",
                teacher: "Micaela Ruiz",
                courseFrom: "17/5/2023",
                courseTo: "11/8/2023"
            },
        ];

        service.loadCourses();

        const req = httpMock.expectOne(`${environment.baseApiUrl}/courses`);
        expect(req.request.method).toBe('GET');
        req.flush(mockCourse);

        const courseIdToFetch = 1;
        service.getCourseById(courseIdToFetch).subscribe(course => {
            const expectedCourse = mockCourse.find(u => u.id === courseIdToFetch);
            expect(course).toEqual(expectedCourse);
        });

        httpMock.verify();
    });
});