export function toIsoDate(d: Date): string {
  // local date -> ISO yyyy-MM-dd
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function todayYmd(sep: string = '-'): string {
    const d = new Date();
    const y = d.getFullYear(), m = (d.getMonth()+1).toString().padStart(2,'0'), day = d.getDate().toString().padStart(2,'0');
    return `${y}${sep}${m}${sep}${day}`;
  }