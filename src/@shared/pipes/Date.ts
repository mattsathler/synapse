import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'CustomDate' })
export class CustomDate implements PipeTransform {
    transform(value: Date): string {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
        const dateString = value.toLocaleDateString('pt-BR', options);

        if (value.toDateString() === today.toDateString()) {
            return `Hoje, ${dateString}`;
        } else if (value.toDateString() === yesterday.toDateString()) {
            return `Ontem, ${dateString}`;
        }
        return dateString;
    }
}