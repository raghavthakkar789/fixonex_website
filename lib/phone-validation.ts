/**
 * Validates the national number from `PhoneInput` values (`+91 98765 43210` style).
 * Non-digits in the number field are stripped; country code is not counted.
 */
export const PHONE_EXACTLY_TEN_DIGITS_MESSAGE =
  "Enter exactly 10 digits for your mobile number, then try again.";

export function getNationalDigits(phoneInputValue: string): string {
  const t = phoneInputValue.trim();
  if (!t) return "";
  if (t.startsWith("+")) {
    const m = t.match(/^\+\d{1,4}\s*(.*)$/);
    return (m?.[1] ?? "").replace(/\D/g, "");
  }
  return t.replace(/\D/g, "");
}

export function isTenDigitNationalNumber(phoneInputValue: string): boolean {
  return getNationalDigits(phoneInputValue).length === 10;
}
