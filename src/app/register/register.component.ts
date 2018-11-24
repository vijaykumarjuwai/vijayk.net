import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    user = {
        email: '',
        password: ''
    };

    constructor(private router: Router, private auth: AuthService) {}

    ngOnInit() {}

    onSubmit() {
        this.auth.register(this.user).subscribe(res => {
            console.log('Registered');
            this.router.navigate(['/home']);
        });
    }
}
