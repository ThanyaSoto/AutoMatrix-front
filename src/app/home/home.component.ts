import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  mostrarAlerta: boolean = false;
  showSuccessAlert() {
    this.mostrarAlerta = true;
    console.log(this.mostrarAlerta)
  }
}
