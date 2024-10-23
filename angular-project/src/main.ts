import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { RegistrationComponent } from './app/api-authorization/registration/registration.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LoginComponent } from './app/api-authorization/login/login.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { JwtModule } from '@auth0/angular-jwt';
import { errorHandlerInterceptor } from './app/api-authorization/error-handler.interceptor';
import { authGuard } from './app/api-authorization/auth.guard';
import { jwtInterceptor } from './app/api-authorization/jwt.interceptor';
import { TasklistComponent } from './app/tasklist/tasklist.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TaskdetailComponent } from './app/taskdetail/taskdetail.component';
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzGw9nixXFX-5yJFanAEngEyrSQHoh8lU",
  authDomain: "horizontasks-106f2.firebaseapp.com",
  projectId: "horizontasks-106f2",
  storageBucket: "horizontasks-106f2.appspot.com",
  messagingSenderId: "578129416511",
  appId: "1:578129416511:web:fe5ded569c786ea123838a",
  measurementId: "G-EV7TP7JC3M"
};

// Initialize Firebase

export function getBaseUrl() {
  return 'https://localhost:7186/api'; //horizontasks.bsite.net/api   //https://localhost:7186/api
}

export function tokenGetter() {
  return localStorage.getItem("token");
}

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
];

bootstrapApplication(AppComponent, {
    providers: [
      providers,provideAnimations(),
      importProvidersFrom(BrowserModule, JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['https://localhost:7186', 'https://horizontasks.bsite.net'],
          disallowedRoutes: [],
        },
      })),
      provideAnimations(),
      provideHttpClient(withInterceptors([errorHandlerInterceptor, jwtInterceptor])),
      provideRouter([
        { path: '', component: DashboardComponent, canActivate: [authGuard]},
        { path: 'login', component: LoginComponent},
        { path: 'register', component: RegistrationComponent },
        { path: 'tasklist', component: TasklistComponent},
        { path: 'taskdetail/:id', component: TaskdetailComponent}
      ]), provideAnimationsAsync()
    ]
})
