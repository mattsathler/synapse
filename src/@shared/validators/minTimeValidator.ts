import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function minTimeValidator(minTime: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const inputTime = control.value as string;

        if (!inputTime || !minTime) return null;

        const [minH, minM] = minTime.split(':').map(Number);
        const [inputH, inputM] = inputTime.split(':').map(Number);

        const minMinutes = minH * 60 + minM;
        const inputMinutes = inputH * 60 + inputM;

        return inputMinutes >= minMinutes ? null : { minTime: true };
    };
}