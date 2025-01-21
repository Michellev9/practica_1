import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  email: string = "";
  password: string = "";

  constructor(private navController: NavController, private toastController: ToastController) {}

  // Validación básica del correo: debe contener "@"
  validateEmail(email: string): boolean {
    return email.includes('@');
  }

  // Validación básica de la contraseña: al menos 6 caracteres
  validatePassword(password: string): boolean {
    return password.length >= 6;
  }

  async login() {
    // Validar si ambos campos están llenos
    if (!this.email || !this.password) {
      this.presentToast('top', 'Por favor ingresa ambos campos (correo y contraseña).');
    } else if (!this.validateEmail(this.email)) {
      this.presentToast('top', 'Por favor ingresa un correo electrónico válido.');
    } else if (!this.validatePassword(this.password)) {
      this.presentToast('top', 'La contraseña debe tener al menos 6 caracteres.');
    } else {
      console.log("Correo y contraseña válidos, redirigiendo...");
      this.navController.navigateRoot('/menu');
    }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }
}