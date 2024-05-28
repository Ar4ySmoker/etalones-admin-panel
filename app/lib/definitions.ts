// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.

import { ReactNode } from "react";

// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};
export type Comment = {
  commentText: string;
  date?: Date;
};
export type Candidate = {
  commentMngNames: any;
  age: ReactNode;
  professionDescription: ReactNode;
  drivePermis: ReactNode;
  leaving: any;
  commentCand: ReactNode;
  _id: any;
  id: string;
  name: string;
  phone: string;
  locationName?: string;
  professionName?: string;
  documentName?: string;
  managerName?: string;
  statusName?: string;
  langueName?: string;
  createdAt?: Date | string;
  comments?: Comment[];
};

// export type Candidate = {
//   [x: string]: ReactNode;
//   managerName: ReactNode;
//   comment: ReactNode;
//   commentMng: Comment[];
//   statusName: ReactNode;
//   langueName: ReactNode;
//   documentName: ReactNode;
//   createdAt: any;
//   professionName: ReactNode;
//   id: string;
//   name: string;
//   phone: string;
//   location: string;
// };

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type LocationField = {
  _id: string;
  name: string;
};
export type ProfessionField = {
  _id: string;
  name: string;
  description: String;
};
export type DocumentField = {
  _id: string;
  name: string;
  dateExp:string;
  numberDoc: string;
}
export type LangueField = {
  _id: string;
  name: string;
}
export type ManagerField = {
  _id: string;
  name: string;
  phone: string;
}
export type CandidateForm = {
  _id: string;
  name: string;
  phone: number;
  location: string;
};
export type StatusField = {
_id: string;
name: string;
}
export type PartnersField = {
  _id: string;
  name: string;
  companyName: string;
}