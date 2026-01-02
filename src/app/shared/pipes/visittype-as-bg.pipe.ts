import { Pipe, PipeTransform } from '@angular/core';
import { VisitType } from '../../core/data-access/models/appointment.model';

@Pipe({
  name: 'visitTypeBg',
  standalone: true
})
export class VisitTypeBgPipe implements PipeTransform {
  transform(value: VisitType | string | null | undefined, mode: 'full' | 'short' = 'full'): string {
    const mapFull: Record<string, string> = {
        PAID: 'Платен преглед',
        NHI_FIRST: 'Първичен преглед',
        NHI_FOLLOWUP: 'Вторичен преглед'
    };

    const mapShort: Record<string, string> = {
        PAID: 'Платен',
        NHI_FIRST: 'Първичен',
        NHI_FOLLOWUP: 'Вторичен'
    };

    const map = mode === 'short' ? mapShort : mapFull;
    return map[value ?? ''] ?? '—';
    }

}
