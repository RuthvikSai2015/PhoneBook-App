import { ContactService } from '../contact.service';
import { Contact } from '../contact';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {

  contact: Contact = new Contact();
  submitted = false;
  errorMessage: any;
  contactForm = this.formBuilder.group({
  
  });
  submitt?: boolean;
  errorCondition?: boolean = false;
  constructor(private contactService: ContactService,
    private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      contactName: ['', [Validators.required,Validators.pattern("^[A-Za-z\\s]*$"),Validators.minLength(6),
      Validators.maxLength(20)]],
      contactEmail: ['',[Validators.required,Validators.email]],
      contactNumber: ['', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]]
    });
  }

  newContact(): void {
    this.submitted = false;
    this.contact = new Contact();
    this.contact = this.contactForm.value;
  }
  get f(): { [key: string]: AbstractControl } {
    return this.contactForm.controls;
  }
  save() {
    this.contact = new Contact();
    this.contact=this.contactForm.value;
    this.contactService.createContact(this.contact).subscribe(data => {
      console.log("data---------"+data);
      alert("data added successfully");
      this.reset();
      this.gotoList();
    }, 
    error => console.log(error));
  }
  private reset(){
    this.contactForm.value.contactEmail='';
    this.contactForm.value.contactName='';
    this.contactForm.value.contactNumber='';
  }
  onSubmit() {
     this.submitt = true;
    /*  if(this.contactForm.value.contactName == '' || this.contactForm.value.contactEmail == '' || this.contactForm.value.contactNumber == ''){
       this.errorCondition=true;
        this.errorMessage = "Please enter all the fields";
     }
     if(this.contactForm.value.contactName.length > 25){
      this.errorCondition=true;
      this.errorMessage = "contact name length cannot exceed 25 characters";
     }
     if(this.contactForm.value.contactNumber.length > 10){
      this.errorCondition=true;
      this.errorMessage = "contact number cannot contain more than 10 numbers";
     } */
    if (this.contactForm.invalid) {
      return;
    }
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/contacts']);
  }
}
