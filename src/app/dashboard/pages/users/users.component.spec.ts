import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { UserServiceService } from './services/users.service';
import { User } from './models/user';

describe('UserServiceService', () => {
    let service: UserServiceService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserServiceService]
        });
        service = TestBed.inject(UserServiceService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should fetch users', () => {
        const mockUserLoad: User[] = [
            {
                id: 1,
                name: "Martin",
                surname: "Parolari",
                phone: "1134629639",
                email: "mnparolari@gmail.com",
                password: "123456789",
                userType: "Administrador",
                token: "psjwjeufnFSHFRjJkL8523",
                img: "https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg"
            },
        ]
        service.loadUsers();

        const req = httpMock.expectOne(`${environment.baseApiUrl}/users`);
        expect(req.request.method).toBe('GET');
        req.flush(mockUserLoad);

        service.getUsers().subscribe(users => {
            expect(users).toEqual(mockUserLoad);
        });

        httpMock.verify();
    });

    it('should create a new user', () => {
        const mockUserCreated: User = {
            id: 2,
            name: "Nicolas",
            surname: "Scarinci",
            phone: "01155446688",
            email: "nico@gmail.com",
            password: "123456789",
            userType: "Usuario",
            token: "JSFRPDKEerj556898742jF",
            img: "https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg"
        }

        service.createdUser(mockUserCreated);

        const req = httpMock.expectOne(`${environment.baseApiUrl}/users`);
        expect(req.request.method).toBe('POST');
        req.flush(mockUserCreated);

        service.getUsers().subscribe(users => {
            expect(users).toContain(mockUserCreated);
        });

        httpMock.verify();
    });

    it('should update an existing user', () => {
        const userIdToUpdate = 1;
        const mockUpdatedUser: User = {
            id: 3,
            name: "Juan",
            surname: "Perez",
            phone: "01155228899",
            email: "juan@gmail.com",
            password: "987654321",
            userType: "Administrador",
            token: "JSFdsdasdsad1561568rty",
            img: "https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg"
        }

        service.updatedUser(userIdToUpdate, mockUpdatedUser);

        const updateReq = httpMock.expectOne(`${environment.baseApiUrl}/users/${userIdToUpdate}`);
        expect(updateReq.request.method).toBe('PUT');

        updateReq.flush({});

        const loadUsersReq = httpMock.expectOne(`${environment.baseApiUrl}/users`);
        expect(loadUsersReq.request.method).toBe('GET');

        loadUsersReq.flush([]);

        const loadUsersSpy = spyOn(service, 'loadUsers');
        service.loadUsers();

        expect(loadUsersSpy).toHaveBeenCalled();

        httpMock.verify();
    });

    it('should delete a user', () => {
        const userIdToDelete = 1;

        service.deleteUser(userIdToDelete);

        const req = httpMock.expectOne(`${environment.baseApiUrl}/users/${userIdToDelete}`);
        expect(req.request.method).toBe('DELETE');
        req.flush({});

        service.getUsers().subscribe(users => {
            expect(users.some(user => user.id === userIdToDelete)).toBeFalsy();
        });

        httpMock.verify();
    });

    it('should get a user by ID', () => {
        const mockUsers: User[] = [
            {
                id: 4,
                name: "Laura",
                surname: "Gonzalez",
                phone: "11553333326",
                email: "laura@gmail.com",
                password: "159753159",
                userType: "Usuario",
                token: "p5651dsdsds15hghg872jj",
                img: "https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg"
            },
        ];

        service.loadUsers();

        const req = httpMock.expectOne(`${environment.baseApiUrl}/users`);
        expect(req.request.method).toBe('GET');
        req.flush(mockUsers);

        const userIdToFetch = 1;
        service.getUserById(userIdToFetch).subscribe(user => {
            const expectedUser = mockUsers.find(u => u.id === userIdToFetch);
            expect(user).toEqual(expectedUser);
        });

        httpMock.verify();
    });
});