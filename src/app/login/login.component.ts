import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user = {
        email: '',
        password: ''
    };

    constructor(private router: Router, private auth: AuthService) {}

    ngOnInit() {}

    onSubmit() {
        this.auth.login(this.user).subscribe(res => {
            console.log('Logged In');
            this.router.navigate(['/home']);
        });
    }
}
