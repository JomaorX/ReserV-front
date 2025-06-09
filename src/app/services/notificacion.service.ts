import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  showSuccess(message: string, duration: number = 3000) {
    this.showNotification(message, '✅ Éxito', duration);
  }

  showWarning(message: string, duration: number = 3000) {
    this.showNotification(message, '⚠️ Advertencia', duration);
  }

  showError(message: string, duration: number = 3000) {
    this.showNotification(message, '❌ Error', duration);
  }

  showConfirmation(message: string): Promise<boolean> {
    return new Promise((resolve) => {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: { message },
        width: '350px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        resolve(result); // Retorna `true` si el usuario acepta, `false` si cancela
      });
    });
  }

  private showNotification(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration,
      panelClass: this.getPanelClass(action),
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }

  private getPanelClass(action: string): string {
    switch (action) {
      case '✅ Éxito':
        return 'success-snackbar';
      case '⚠️ Advertencia':
        return 'warning-snackbar';
      case '❌ Error':
        return 'error-snackbar';
      case '❓ Confirmar':
        return 'confirmation-snackbar';
      default:
        return '';
    }
  }
}
