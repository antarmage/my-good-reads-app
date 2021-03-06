import { GoodReadStore } from './../../core/store/reads.store';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { GoodRead } from '../../core/models/good-read.model';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-read-form',
  templateUrl: './read-form.component.html',
  styleUrls: ['./read-form.component.css']
})
export class ReadFormComponent implements OnInit {

  myForm: FormGroup;
  subscription: Subscription;
  itemToBeEdited: GoodRead;
  constructor(private formBuilder: FormBuilder, private store: GoodReadStore,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.subscription = this.activatedRoute.paramMap
      .subscribe((params) => {
        const selectedReadItemId = +params.get('id');
        if (selectedReadItemId) {
          this.itemToBeEdited = this.store.getItemWithId(selectedReadItemId);
          this.myForm = this.formBuilder.group({
            'title': [this.itemToBeEdited.title, Validators.required],
            'description': [this.itemToBeEdited.description, Validators.required],
            'url': [this.itemToBeEdited.url, Validators.required],
            'category': [this.itemToBeEdited.category, Validators.required]
          })
        } else {
          this.myForm = this.formBuilder.group({
            'title': ['', Validators.required],
            'description': ['', Validators.required],
            'url': ['', Validators.required],
            'category': ['Blog', Validators.required]
          })
        }
      });
  }

  addGoodRead(formValue) {
    let subs: Subscription;
    if (this.itemToBeEdited) {
      const newRead = new GoodRead(formValue.title, formValue.description, formValue.category,
        formValue.url, this.itemToBeEdited.isRead, this.itemToBeEdited.id);
        this.store.updateRead(newRead);
      // subs = this.store.updateRead(newRead)
      //   .subscribe(() => {
      //     console.log('Data edited successfully');
      //     // Navigate to home page
      //     this.router.navigate(['/home']);
      //   });
    } else {
      const newRead = new GoodRead(formValue.title, formValue.description, formValue.category,
        formValue.url, false);
      this.store.addNewGoodRead(newRead);
      // subs = this.store.addNewGoodRead(newRead)
      //   .subscribe(() => {
      //     console.log('Data added successfully');
      //     // Navigate to home page
      //     this.router.navigate(['/home']);
      //   });
    }
    this.subscription.add(subs);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
