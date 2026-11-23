/**
 * Site-wide configuration flags and constants.
 */

/**
 * Toggle for Autopsy PDF availability.
 * When false: The gate success state reveals the Telegram community link and provides a scroll-to-report action, with no download button.
 * When true: Reveals a download button pointing at /downloads/autopsy.pdf.
 *
 * File path to place the PDF:
 * -> public/downloads/autopsy.pdf
 */
export const AUTOPSEY_PDF_READY = false;

// Alias with standard spelling for convenience
export const AUTOPSY_PDF_READY = AUTOPSEY_PDF_READY;
