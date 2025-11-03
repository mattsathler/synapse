import { FormGroup } from '@angular/forms';

export function hasFormChanged(form: FormGroup, initialValue: any): boolean {
    if (!form || !initialValue) return false;

    console.log(form.value, initialValue)
    return JSON.stringify(form.value) !== JSON.stringify(initialValue);
}
