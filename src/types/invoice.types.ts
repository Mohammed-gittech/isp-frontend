// Invoice item - matches InvoiceItemDto in Backend
export interface InvoiceItem {
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
  description?: string;
}

// Full invoice - matches InvoiceDto in Backend
export interface InvoiceResponse {
  id: number;
  tenantId: number;
  subscriberId: number;
  subscriberName: string;
  subscriberPhone: string;
  subscriberAddress: string | null;
  invoiceNumber: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  currency: string;
  status: string;
  dueDate: string | null;
  issuedDate: string;
  paidDate: string | null;
  paymentId: number | null;
  paymentMethod: string | null;
  printedAt: string | null;
  printCount: number;
  notes: string | null;
  createdAt: string;
}

// Simplified invoice for lists - matches InvoiceListDto in Backend
export interface InvoiceListResponse {
  id: number;
  invoiceNumber: string;
  subscriberName: string;
  total: number;
  currency: string;
  status: string;
  issuedDate: string;
  paidDate: string | null;
}

// Invoice print data - matches InvoicePrintDto in Backend
export interface InvoicePrintResponse {
  companyName: string;
  companyAddress: string | null;
  companyPhone: string | null;
  companyEmail: string | null;
  companyLogo: string | null;
  invoice: InvoiceResponse;
  qrCodeData: string;
  barcodeData: string;
  printedBy: string;
  printedAt: string;
}
