import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phone',
    standalone: true
})
export class PhonePipe implements PipeTransform {

    transform(value: string | number | null | undefined): string {
        if (!value) return '';

        // Remove tudo que não for número
        const digits = value.toString().replace(/\D/g, '');

        // Remove 55 (DDI) se existir
        const clean = digits.startsWith('55') && digits.length > 11
            ? digits.slice(2)
            : digits;

        // Telefones de 11 dígitos (celular)
        if (clean.length === 11) {
            return clean.replace(/(\d{2})(\d)(\d{4})(\d{4})/, '($1) $2 $3-$4');
        }

        // Telefones de 10 dígitos (fixo)
        if (clean.length === 10) {
            return clean.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }

        // Telefones menores (atendimento incompleto)
        if (clean.length <= 9) {
            return clean;
        }

        // Se nada bater, retorna cru
        return clean;
    }
}
