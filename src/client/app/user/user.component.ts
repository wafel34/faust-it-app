import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    routeUrl: string;
    userDeleted = false;
    user;
    constructor(private route: ActivatedRoute,
                private api: ApiService,
                private title: Title) {
        // get shortname form url
        this.routeUrl = route.snapshot.params.user;
    }

    ngOnInit() {
        this.api.get(`users/${this.routeUrl}`)
        .subscribe((result) => {
            this.user = result[0];
            this.title.setTitle(`${this.user.name} - Faust IT App`);
        });
    }

    deleteUser (deletedUser) {
        this.api.delete(`users/${deletedUser.name}`)
        .subscribe((result) => {
            if (result.ok === 1) {
                this.userDeleted = true;
            }
        });
    }
}
