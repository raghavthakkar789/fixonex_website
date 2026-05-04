/**
 * Operational company information displayed across the site.
 * This module is the single source of truth for the registered address,
 * phone, email, and Google Maps links — update here and every consumer
 * (Footer, Contact page, About page) updates automatically.
 */

export const companyInfo = {
  legalName: "FIXONEX",

  /** Brand display name shown on the About / Contact pages */
  displayName: "Simero Ceramics",

  /** Trading / registered location */
  registeredAddress: {
    line1: "Simero Ceramics, 1487, Sarkhej - Gandhinagar Hwy",
    line2: "Gota",
    city: "Ahmedabad",
    state: "Gujarat",
    postalCode: "382481",
    country: "India",
  },

  /** Single-line, comma-separated address suitable for footer / inline usage */
  formattedAddress:
    "Simero Ceramics, 1487, Sarkhej - Gandhinagar Hwy, Gota, Ahmedabad, Gujarat 382481",

  phone: "+91 73838 38632",

  email: "info@fixonex.com",

  supportEmail: "info@fixonex.com",

  businessHours: "Monday–Saturday, 9:00–18:00 (IST)",

  /** Google Maps embed (search-based) — preserves the new address */
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Simero+Ceramics+1487+Sarkhej+Gandhinagar+Hwy+Gota+Ahmedabad+Gujarat+382481&output=embed",

  /**
   * Google Maps directions link with destination pre-filled.
   * Opens the Google Maps directions UI so the user just supplies their origin.
   */
  mapsLink:
    "https://www.google.com/maps/dir/?api=1&destination=Simero+Ceramics%2C+1487%2C+Sarkhej+-+Gandhinagar+Hwy%2C+Gota%2C+Ahmedabad%2C+Gujarat+382481",

  /** WhatsApp — international format without + */
  whatsappNumber: "917383838632",

  yearEstablished: "2010",

  certificationsNote:
    "FIXONEX products reference EN 12004 and IS 15477:2019 where those standards appear on the SKU data sheet. Always use the current sheet for the exact bag or kit on site.",
} as const;
