import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../../service/notification.service";
import {UserService} from "../../../service/user.service";
import {User} from "../../../models/User";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  public profileEditForm!: FormGroup;

  constructor(private dialogRef: MatDialogRef<EditUserComponent>,
              private fb: FormBuilder,
              private notificationService: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private userService: UserService
              ) { }

  ngOnInit(): void {
    this.profileEditForm = this.createProfileForm();
  }

  createProfileForm(): FormGroup{
    return this.fb.group({
      email: [this.data.user.email, Validators.compose([Validators.required, Validators.email])],
      phoneNumber: [this.data.user.phoneNumber],
      userName: [this.data.user.username, Validators.compose([Validators.required])],
    })
  }

  submit(): void{
    this.userService.updateUser(this.updateUser())
    .subscribe(() => {
      this.notificationService.showSnackBar(`User updated succesfully`);
      this.dialogRef.close();
    });
  }

  updateUser(): User{
    this.data.user.email = this.profileEditForm.value.email;
    this.data.user.phoneNumber = this.profileEditForm.value.phoneNumber;
    this.data.user.username = this.profileEditForm.value.userName;

    return this.data.user;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
