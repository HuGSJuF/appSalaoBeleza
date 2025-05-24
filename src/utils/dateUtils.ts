/**
 * Recebe data no formato ISO "YYYY-MM-DD"
 * Retorna uma string com dia e mês concatenados "DDMM"
 */
export function extractDayMonth(dataISO: string): string {
  // ex.: "2025-05-24"
  const dia = dataISO.substr(8, 2);
  const mes = dataISO.substr(5, 2);
  return dia + mes;  // "2405"
}
