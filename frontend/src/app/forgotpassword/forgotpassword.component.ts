import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { UserService } from '../services/user/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  forgotPasswordForm:any = FormGroup;
  responseMessage:any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: SnackbarService,
    private dialogRef: MatDialogRef<ForgotpasswordComponent>,
    private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]]
    })
  }

  handleSubmit() {
    this.ngxService.start();
    var formData = this.forgotPasswordForm.value;
    var data = {
      email: formData.email,
    };

    this.userService.forgotPassword(data).subscribe(
      (response:any)=> {
        this.ngxService.stop();
        this.dialogRef.close();
        this.responseMessage = response.message;
        this.snackBar.openSnackBar(this.responseMessage,"");
        this.router.navigate(['/']);
      },(error) => {
        this.ngxService.stop();
        if(error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackBar.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }

}
