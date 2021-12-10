import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.css']
})
export class UpdateContactComponent implements OnInit {

  id?: any;
  contact?: Contact;
  activeSw?:any;
  contactName? :any;
  contactEmail? :any;
  contactNumber? :any;
  contactUpdateForm = this.formBuilder.group({
    contactName: new FormControl('',[Validators.required]),
    contactEmail: new FormControl(''),
    contactNumber: new FormControl('')
  });
  submitt?: boolean = false;
  constructor(private route: ActivatedRoute,private router: Router,
    private contactService: ContactService,private formBuilder: FormBuilder) { 
      this.id= Number;
    }

  ngOnInit() {
//    this.contact = new Contact();
    this.contactUpdateForm = this.formBuilder.group({
      contactName: ['', [Validators.required,Validators.pattern("^[A-Za-z\\s]*$"),Validators.minLength(6),
      Validators.maxLength(20)]],
      contactEmail: ['',[Validators.required,Validators.email]],
      contactNumber: ['', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]]
    });
    this.id = this.route.snapshot.params['id']; 
    this.activeSw = this.route.snapshot.params['flag']; 
    this.contactService.getContact(this.id)
      .subscribe(data => {
        console.log(data)
        this.contact = data;
        this.contactName=data.contactName;
        this.contactEmail=data.contactEmail;
        this.contactNumber=data.contactNumber;
        //this.contact.contactName= data.contactName;
      }, error => console.log(error));
  }

  updateContact() {
    let contactN = new Contact();
    contactN.contactId = this.id; 
    contactN.contactName = this.contactName;
    contactN.contactEmail = this.contactEmail
    contactN.contactNumber = this.contactNumber;
    contactN.activeSw = this.activeSw;
    this.contact = contactN;
    this.contactService.createContact(this.contact).subscribe(data => {
        alert("data updated successfully");
        this.contact = new Contact();
        this.gotoList();
      }, error => console.log(error));
  }

  onSubmit() {
    this.submitt = true;
    if(this.contactUpdateForm.invalid){
      return;
    }
    this.updateContact();    
  }

  gotoList() {
    this.router.navigate(['/contacts']);
  }
}
