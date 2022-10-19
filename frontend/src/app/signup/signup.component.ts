import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: any  = FormGroup;
  responseMessage: any;

  constructor(private formBuilder: FormBuilder,
    private router:Router,
    private userServices:UserService,
    private snackBar: SnackbarService,
    private dialogReference: MatDialogRef<SignupComponent>,
    private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber:[null,[Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex)]],
      password:[null,[Validators.required]]
    })
  }

  handleSubmit() {
    this.ngxService.start()
    var formData = this.signUpForm.value;
    var data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      password: formData.password
    }

    this.userServices.signup(data).subscribe((response:any) => {
      this.ngxService.stop();
      this.dialogReference.close();
      this.responseMessage = response.message;
      this.snackBar.openSnackBar(this.responseMessage,"");
      this.router.navigate(['/'])
    },(error) => {
      this.ngxService.stop();
      if(error.error.message) {
        this.responseMessage = error.error.message
      } else {
        this.responseMessage = GlobalConstants.genericError
      }
      this.snackBar.openSnackBar(this.responseMessage,GlobalConstants.error);
    });
  }

}
