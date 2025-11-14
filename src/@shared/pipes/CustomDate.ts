import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'CustomDate' })
export class CustomDate implements PipeTransform {
    transform(value: string | null | undefined): string {
        if (!value) return '';

        // Converte a string YYYY-MM-DD para Date corretamente
        const date = new Date(value + 'T00:00:00');

        if (isNaN(date.getTime())) return '';

        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        };

        const dateString = date.toLocaleDateString('pt-BR', options);

        if (date.toDateString() === today.toDateString()) {
            return `Hoje, ${dateString}`;
        } else if (date.toDateString() === yesterday.toDateString()) {
            return `Ontem, ${dateString}`;
        }

        return dateString;
    }

}