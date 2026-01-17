export type WeekModel = Record<string, string[]>; // {mon: [...], tue: [...], ...}

export type ExclusionType = 'day' | 'time';

export interface ScheduleExclusion {
    type: ExclusionType;
    date: string;           // yyyy-MM-dd
    startTime?: string;      // HH:mm
    endTime?: string;
    reason?: string;
}

export interface ExclusionBatchDto {
    // Bulk creation: multiple days/slots to exclude
    exclusions: ScheduleExclusion[];
}