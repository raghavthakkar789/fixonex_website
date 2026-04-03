/**
 * Operational company information displayed across the site.
 */
export const companyInfo = {
  legalName: "FIXONEX",
  /** Trading / registered location (Swastik Enterprises) */
  registeredAddress: {
    line1: "SWASTIK ENTERPRISES, FF, Block - D, Shop No. 102, Narayan Exotica",
    city: "Ahmedabad",
    state: "Gujarat",
    postalCode: "380052",
    country: "India",
  },
  phone: "+91 73838 38632",
  email: "info@fixonex.com",
  supportEmail: "info@fixonex.com",
  businessHours: "Monday–Saturday, 9:00–18:00 (IST)",
  /** Google Maps embed (search-based; replace with your verified Place embed if preferred) */
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=FF+Block+D+Shop+102+Narayan+Exotica+Ahmedabad+380052+Gujarat&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=FF%2C+Block+-+D%2C+Shop+No.+102%2C+Narayan+Exotica%2C+Ahmedabad+380052",
  /** WhatsApp — international format without + */
  whatsappNumber: "917383838632",
  yearEstablished: "2010",
  certificationsNote:
    "FIXONEX tile adhesive and system grades are formulated for alignment with EN 12004 and IS 15477:2019 where cited on product data. Always refer to the current technical data sheet for the specific SKU.",
} as const;
