import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Directive({
  selector: '[hasRoles]',
})
export class HasRolesDirective {
  @Input() hasRoles: string | undefined;

  constructor(private _authService: AuthService,
              private elRef: ElementRef,
              private renderer: Renderer2
  ) {
    this.validateAccess();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.validateAccess();
  }

  private validateAccess(): void {
    const requiredRoles = this.hasRoles?.split(',') || undefined;
    if (requiredRoles && !this._authService.hasRoles(requiredRoles)) {
      this.renderer.setStyle(this.elRef.nativeElement, 'display', 'none');
    }
  }
}
