import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analyse',
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.css']
})
export class AnalyseComponent implements OnInit {
  selectedFile: File | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.selectedFile) {
      console.log(`Uploading file: ${this.selectedFile.name}`);
      // Add your file upload logic here
    } else {
      console.log('No file selected');
    }
  }
}
