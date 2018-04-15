import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    users;
    constructor(private api: ApiService) { }

    ngOnInit() {
        this.api.get('users')
            .subscribe((result) => {
                this.users = result;
            });
    }

    deleteUser (deletedUser) {
        this.api.delete(`users/${deletedUser.name}`)
        .subscribe((result) => {
            if (result.ok === 1) {
                this.users = this.users.filter((item) => {
                    return item.name !== deletedUser.name;
                });
            }
        });
    }

}
