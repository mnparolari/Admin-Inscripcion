import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from 'src/app/dashboard/pages/users/models/user';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { LoginPayload } from './models/auth';
import { StoreModule } from '@ngrx/store';

describe('AuthService', () => {
    let service: AuthService;
    let httpMock: HttpTestingController;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule, StoreModule.forRoot({})],
            providers: [AuthService]
        });

        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
        router = TestBed.inject(Router);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should authenticate user and set token in local storage', () => {
        const mockLoginPayload: LoginPayload = {
            email: 'test@gmail.com',
            password: '123456789'
        };

        const mockResponse: User[] = [
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
            }
        ];

        spyOn(router, 'navigate');

        service.login(mockLoginPayload);

        const req = httpMock.expectOne(`${environment.baseApiUrl}/users?email=test@gmail.com&password=123456789`);
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);

        expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
        expect(localStorage.getItem('token')).toBe(mockResponse[0].token);
    });

    it('should handle invalid user login', () => {
        const mockLoginPayload: LoginPayload = {
            email: 'invalid@example.com',
            password: 'invalid123'
        };

        service.login(mockLoginPayload);

        const req = httpMock.expectOne(`${environment.baseApiUrl}/users?email=invalid@example.com&password=invalid123`);
        expect(req.request.method).toBe('GET');
        req.flush([]);
    });

    it('should handle HTTP errors during login', () => {
        const mockLoginPayload: LoginPayload = {
            email: 'test@gmail.com',
            password: '987654321'
        };

        service.login(mockLoginPayload);

        const req = httpMock.expectOne(`${environment.baseApiUrl}/users?email=test@gmail.com&password=987654321`);
        expect(req.request.method).toBe('GET');

        req.flush([], { status: 500, statusText: 'Internal Server Error' });
    });
});