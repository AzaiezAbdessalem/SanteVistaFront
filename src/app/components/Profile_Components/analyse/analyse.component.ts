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
imageSrc:any
ngOnInit(): void {
  // this.regimeService.contenuAnalyse('http://example.com/myfile').subscribe(
  //   (blob) => {
  //     const objectURL = URL.createObjectURL(blob);
  //     const fileType = blob.type;  // Obtenir le type de fichier
  
  //     // Gestion des différents types de fichiers
  //     if (fileType.startsWith('image')) {
  //       // Si c'est une image, l'afficher
  //       this.imageSrc = objectURL;
  //     } else if (fileType === 'application/pdf') {
  //       // Si c'est un PDF, ouvrir dans un nouvel onglet
  //       window.open(objectURL);
  //     } else {
  //       // Pour d'autres types de fichiers, proposer le téléchargement
  //       const a = document.createElement('a');
  //       a.href = objectURL;
  //       a.download = 'downloadedFile';  // Nom du fichier à télécharger
  //       a.click();
  //     }
  //   },
  //   (error) => {
  //     console.error('Erreur lors de la récupération du fichier :', error);
  //   }
  // );
  

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
