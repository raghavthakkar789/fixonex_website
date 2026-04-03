/**
 * Frontend-only form handling. Replace `mockSubmitForm` with a server action
 * or API route that reads process.env (e.g. email provider, CRM webhook).
 */

export type FormStatus = "idle" | "submitting" | "success" | "error";

export async function mockSubmitForm<T extends Record<string, unknown>>(
  payload: T,
  options?: { delayMs?: number; fail?: boolean },
): Promise<{ ok: boolean }> {
  await new Promise((r) => setTimeout(r, options?.delayMs ?? 800));
  if (options?.fail) return { ok: false };
  // Payload available for future wiring: console in dev only would be noisy in production
  void payload;
  return { ok: true };
}
