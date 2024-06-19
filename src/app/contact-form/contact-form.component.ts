import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Contact } from './contact.module';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit{

  contactForm!:FormGroup;
  contactId:number | null = null;

  constructor(
    private fb:FormBuilder,
    private contactService:ContactService,
    private toastr:ToastrService,
    private route:ActivatedRoute,
    private router:Router
  ){
    this.contactForm= this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.contactId = +id; // Convert id to number
        this.loadContact(this.contactId);
      }
    });
  }
  loadContact(id: number): void {
    this.contactService.getContact(id).subscribe(contact => {
      this.contactForm.patchValue(contact); // Populate form with contact data
    });
  }
  onSubmit(){
    if(this.contactForm.valid){
      if(this.contactId){
        const updatedContact ={...this.contactForm.value,id:this.contactId};
        this.contactService.updateContact(updatedContact).subscribe(()=>{
          this.toastr.success('Contact Updated Successfully','Success!');
          this.router.navigate(['/contacts'])
        });
      }else{
        this.contactService.addContact(this.contactForm.value).subscribe(()=>{
          this.toastr.success('Contact Added Successfully','Success!');
          this.router.navigate(['/contacts']);
        });
      }
    }else{
      this.toastr.error('Please fill out form correctly !');
    }
  }
}
