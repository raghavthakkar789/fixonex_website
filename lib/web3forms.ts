const WEB3FORMS_SUBMIT_URL = "https://api.web3forms.com/submit";

export type Web3FormsSubmitResult =
  | { ok: true }
  | { ok: false; message: string };

export type ContactWeb3Payload = {
  fullName: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
};

export type CatalogRequestWeb3Payload = {
  name: string;
  phone: string;
  email: string;
};

export type PartnershipInquiryWeb3Payload = {
  businessName: string;
  contactPerson: string;
  phone: string;
  email: string;
  cityState: string;
  businessType: string;
  message: string;
};

const MAIL_RULE_DOUBLE = "════════════════════════════════════";
const MAIL_RULE_SINGLE = "────────────────────────────────────";

/**
 * Web3Forms does not render HTML in Gmail — use structured plain text for the
 * `message` slot so it reads cleanly next to labeled fields above.
 */
function formatPlainMailBody(sectionTitle: string, bodyLines: string[], footerLine: string): string {
  const padded = bodyLines.length > 0 ? bodyLines.map((line) => `  ${line}`) : ["  —"];
  return [
    MAIL_RULE_DOUBLE,
    `  ${sectionTitle}`,
    MAIL_RULE_DOUBLE,
    "",
    ...padded,
    "",
    MAIL_RULE_SINGLE,
    `  ${footerLine}`,
  ].join("\n");
}

async function postWeb3Forms(access_key: string, body: Record<string, string>): Promise<Web3FormsSubmitResult> {
  try {
    const res = await fetch(WEB3FORMS_SUBMIT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ access_key, ...body }),
    });

    const data = (await res.json()) as {
      success?: boolean;
      message?: string;
      body?: { success?: boolean; message?: string };
    };
    const succeeded = data.success === true || data.body?.success === true;
    const apiMessage = data.message ?? data.body?.message;
    if (!res.ok || !succeeded) {
      return {
        ok: false,
        message:
          typeof apiMessage === "string" && apiMessage.trim()
            ? apiMessage
            : "Something went wrong. Please try again.",
      };
    }
    return { ok: true };
  } catch {
    return { ok: false, message: "Network error. Please check your connection and try again." };
  }
}

function web3ContactMessage(p: ContactWeb3Payload): string {
  const msg = p.message.trim();
  const lines =
    msg.length > 0
      ? msg.split(/\r\n|\r|\n/)
      : ["(No message text provided.)"];
  return formatPlainMailBody("Visitor message • Contact form", lines, `FIXONEX · fixonex.com/contact`);
}

/**
 * Contact page. Set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in `.env.local`.
 */
export async function submitContactWeb3Form(payload: ContactWeb3Payload): Promise<Web3FormsSubmitResult> {
  const access_key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();
  if (!access_key) {
    return { ok: false, message: "Form is not configured. Add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to your environment." };
  }

  return postWeb3Forms(access_key, {
    name: payload.fullName,
    email: payload.email,
    subject: `[FIXONEX] ${payload.inquiryType} — ${payload.fullName.trim()}`,
    message: web3ContactMessage(payload),
    phone: payload.phone,
    inquiry_type: payload.inquiryType,
  });
}

/**
 * Navbar catalog gate. Set `NEXT_PUBLIC_WEB3FORMS_CATALOG_ACCESS_KEY` in `.env.local`.
 */
export async function submitCatalogRequestWeb3Form(payload: CatalogRequestWeb3Payload): Promise<Web3FormsSubmitResult> {
  const access_key = process.env.NEXT_PUBLIC_WEB3FORMS_CATALOG_ACCESS_KEY?.trim();
  if (!access_key) {
    return {
      ok: false,
      message: "Catalog form is not configured. Add NEXT_PUBLIC_WEB3FORMS_CATALOG_ACCESS_KEY to your environment.",
    };
  }

  const name = payload.name.trim();
  const phone = payload.phone.trim();
  const email = payload.email.trim();

  const fields: Record<string, string> = {
    name,
    phone,
    subject: `[FIXONEX Catalog] ${name}`,
    message: formatPlainMailBody(
      "E-catalog request",
      [`${name} opened the FIXONEX e-catalog PDF from the site.`],
      "FIXONEX · Catalog button (navbar)",
    ),
  };

  if (email) fields.email = email;

  return postWeb3Forms(access_key, fields);
}

/**
 * Partner (/partner) dealer inquiry form. Set `NEXT_PUBLIC_WEB3FORMS_PARTNER_ACCESS_KEY` in `.env.local`.
 */
export async function submitPartnershipWeb3Form(payload: PartnershipInquiryWeb3Payload): Promise<Web3FormsSubmitResult> {
  const access_key = process.env.NEXT_PUBLIC_WEB3FORMS_PARTNER_ACCESS_KEY?.trim();
  if (!access_key) {
    return {
      ok: false,
      message: "Partnership form is not configured. Add NEXT_PUBLIC_WEB3FORMS_PARTNER_ACCESS_KEY to your environment.",
    };
  }

  const businessName = payload.businessName.trim();
  const contactPerson = payload.contactPerson.trim();
  const msg = payload.message.trim();
  const em = payload.email.trim();
  if (!em) {
    return { ok: false, message: "Email is required." };
  }

  const fields: Record<string, string> = {
    name: contactPerson,
    email: em,
    phone: payload.phone.trim(),
    firm_name: businessName,
    subject: `[FIXONEX Partnership] ${businessName} — ${contactPerson}`,
    message: formatPlainMailBody(
      "Partnership enquiry — notes",
      msg.length > 0 ? msg.split(/\r\n|\r|\n/) : ["(No additional message provided.)"],
      "FIXONEX · fixonex.com/partner",
    ),
  };

  const cityState = payload.cityState.trim();
  const businessType = payload.businessType.trim();
  if (cityState) fields.city_state = cityState;
  if (businessType) fields.business_type = businessType;

  return postWeb3Forms(access_key, fields);
}
