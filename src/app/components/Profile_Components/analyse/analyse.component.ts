import { Component, OnInit } from '@angular/core';
import { Analyse } from 'src/app/class/analyse';
import { RegimeService } from 'src/app/service/regime.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-analyse',
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.css']
})
export class AnalyseComponent implements OnInit {
  selectedFile: File | null = null;

  constructor( private regimeService:RegimeService) { }

 

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
analyse=new Analyse()
userId=localStorage.getItem("userId")
analyses :Analyse[]=[]
getAllAnalysesByUserId(userId:string)
{
  if( this.userId)
    {
  this.regimeService.getAllAnalyses(userId).subscribe(data=>
    {      
     this.analyses=data
     console.log(this.analyses)
    }
   )}
}
ngOnInit(): void {

  if( this.userId)
    {
      this.getAllAnalysesByUserId(this.userId)
    
    }
}
  onSubmit(): void {
    if (this.selectedFile) {
    this.analyse.name=this.selectedFile.name
    this.analyse.userId=this.userId || ''
    
      console.log(`Uploading file`,this.analyse);
    this.regimeService.createAnalyse(this.analyse,this.selectedFile).subscribe(data=>
{
  if(data && this.userId)
  {
    Swal.fire({
      title: "Analyse ajouté avec succès !",
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    });
    this.getAllAnalysesByUserId(this.userId)
  }
}
)

      // Add your file upload logic here
    } else {
      console.log('No file selected');
    }
  }
}
