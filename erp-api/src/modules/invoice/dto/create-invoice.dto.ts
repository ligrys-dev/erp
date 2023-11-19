export class CreateInvoiceDto {
  invoiceNumber: string;
  issueDate: Date;
  deliveryDate: Date;
  paymentDate: Date;
  isPaid: boolean;
  firmId: string;
  clientId: string;
  products: { id: string; quantity: number }[];
}
