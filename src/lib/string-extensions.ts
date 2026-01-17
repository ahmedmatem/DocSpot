declare global {
  interface String {
    toDmy(sep?: string): string;        // "yyyy?MM?dd" -> "dd?MM?yyyy"
    toYmd(sep?: string): string;        // "dd?MM?yyyy" -> "yyyy?MM?dd"
  }
}

String.prototype.toDmy = function (sep: string = '/'): string {
  const s = String(this);
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) throw new Error(`Invalid ISO date (yyyy-MM-dd): "${s}"`);
  return `${m[3]}${sep}${m[2]}${sep}${m[1]}`;
};

String.prototype.toYmd = function (sep: string = '-'): string {
  const s = String(this);
  const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(s);
  if (!m) throw new Error(`Invalid date (dd/MM/yyyy): "${s}"`);
  return `${m[3]}${sep}${m[2]}${sep}${m[1]}`;
};

export {}; // keep file as a module