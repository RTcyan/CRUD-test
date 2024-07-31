import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { User } from '../../models/user';
import {  mergeMap, Subscription } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserUpdateComponent } from "../user-update/user-update.component";

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [CommonModule, RouterModule, UserUpdateComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent implements OnInit, OnDestroy {
[x: string]: any;
  private routeSub!: Subscription;
  user: User | null = null;

  constructor(private userService:UserService, private route:ActivatedRoute, private router: Router){
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.pipe(
      mergeMap(({ userId }) => this.userService.get(userId)),
    ).subscribe((user) => {
      this.user=user;
      console.log(this.user)
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  deleteUser() {
    this.userService.delete(this.user!._id).subscribe(() => { 
      this.router.navigate(['users','list'])
    })
  }
}