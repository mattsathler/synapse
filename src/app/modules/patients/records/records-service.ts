import { Injectable } from '@angular/core';
import { Record as IRecord } from '../../../../@shared/types/Record';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  public groupRecordsByDay(records: IRecord[]): { date: string; records: IRecord[] }[] {
    const sorted = [...records].sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time ?? "00:00"}:00`).getTime();
      const dateB = new Date(`${b.date}T${b.time ?? "00:00"}:00`).getTime();
      return dateB - dateA;
    });

    const map = new Map<string, IRecord[]>();

    sorted.forEach(record => {
      if (!map.has(record.date)) {
        map.set(record.date, []);
      }
      map.get(record.date)!.push(record);
    });

    return Array.from(map, ([date, records]) => ({ date, records }));
  }
}
