import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Activity } from 'src/app/class/activity';
import { ActivityServiceService } from 'src/app/service/activity.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {
  activityForm: FormGroup;
  activity =new Activity();
  submitted =false;
  isEditMode = false;
  @Input() name: any;
  @Input() duree: any;
  @Input() link: any;
  @Input() repetition: any;



  constructor(private fb: FormBuilder,@Optional() public dialogRef: MatDialogRef<AddActivityComponent>,
  @Optional() @Inject(MAT_DIALOG_DATA) public data: any,private activityService :ActivityServiceService) 
  { 
    this.activityForm = this.fb.group({
      name: ['', [this.minLengthWithoutWhitespace(2), Validators.pattern("^\\s*[a-zA-ZÀ-ÿ']+(\\s+[a-zA-ZÀ-ÿ']+)*\\s*$")]],
      duree: ['', [Validators.pattern("^[0-9]+$"), Validators.min(1),Validators.max(60)]],
      link:['',[Validators.required]],
      repetition:['',[ Validators.min(1),Validators.max(50)]]
    });

  }

  ngOnInit(): void {
    if (this.data && this.data.id) {
      this.isEditMode = true;
      this.loadActivity(this.data.id);
    }
  }
  loadActivity(id: number): void {
    this.activityService.getActivityById(id).subscribe({
      next: (activity) => {
        this.activityForm.patchValue(activity);
      },
      error: (err) => {
        console.error('Erreur lors du chargement de l\'activité', err);
      },
    });
  }
  saveActivity(){
    this.submitted=true

    if(this.activityForm.valid){
      var activityData = this.activityForm.value;
      activityData.name= activityData.name.trim()
      activityData.duree= activityData.duree

      if(this.isEditMode){
            this.activityService.updateActivity(this.data.id, activityData).subscribe({
              next: (data) => {
                console.log('Activité mise à jour avec succès!', data);
                Swal.fire({
                  title: "Activité a été mis à jour avec succès !",
                  icon: 'success',
                  timer: 1500,
                  showConfirmButton: false
                });
                this.dialogRef.close(data);
              },
              error: (err) => {
                console.error('Erreur lors de la mise à jour de l\'activité', err);
              },
            });

      }else{
            this.activityService.saveActivity(activityData).subscribe(data=>{
            console.log('activity enregistrée',data);

              Swal.fire({
                title: "Activité a été ajoutée avec succès !",
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
              });
      
            this.dialogRef.close()
        },);
  }
}
}


  minLengthWithoutWhitespace(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const trimmedValue = control.value ? control.value.trim() : '';
      if (!trimmedValue) {
        return { required: true };
      }
      if (trimmedValue.length < minLength) {
        return { minLengthWithoutWhitespace: true };
      }
      return null;
    };
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
