import { Directive, ElementRef, forwardRef, Input, OnInit } from '@angular/core';
import flatpickr from 'flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Directive({
  standalone: true, // <--- esto es CLAVE
  selector: '[flatpickr]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FlatpickrDirective),
      multi: true,
    },
  ],
})

export class FlatpickrDirective implements OnInit, ControlValueAccessor {
  private onChange = (_: any) => {};
  private onTouched = () => {};

  @Input() options: any = {};

  constructor(private el: ElementRef) {}

  ngOnInit() {
   flatpickr(this.el.nativeElement, {
  ...this.options,
  locale: Spanish,
  dateFormat: 'Y-m-d H:i',
  enableTime: true,
  time_24hr: true,
  minDate: 'today',
  onChange: ([date]) => {
    this.onChange(date);
  },
});


  }

  writeValue(value: any): void {
    this.el.nativeElement.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
