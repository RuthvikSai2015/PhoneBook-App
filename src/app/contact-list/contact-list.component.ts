import { Observable } from "rxjs";
import { ContactService } from "../contact.service";
import { Contact } from "../contact";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.css"]
})
export class ContactListComponent implements OnInit {
  contacts!: Array<Contact>;
  contactName : any;
  messageText: any;
  condition:boolean =false;
  page  = 1;
  pageSize = 10;
  size =  0;

  constructor(private contactService: ContactService,
    private router: Router,private modalService: NgbModal) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.contactService.getContactsList().subscribe(contacts => {
      this.contacts = contacts;
      if(this.contacts.length == 0){         
        this.condition = true;
      }
      this.size = this.contacts.length;
      console.log(this.contacts);
    });
  }

  deleteContact(content:any,id:any,activeS:any,flag: any) {
    this.messageText = flag;
     this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        if(result === 'yes'){
            this.contactService.deleteContact(id,activeS).subscribe(data =>{
              alert("made record " + flag + " successfully");
              this.reloadData();
            }, 
            error => console.log(error));
        }
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  contactDetails(id: number){
    this.router.navigate(['details', id]);
  }

  updateContact(id: any,flag:any){
    this.router.navigate(['update', id,flag]);
  }
}
