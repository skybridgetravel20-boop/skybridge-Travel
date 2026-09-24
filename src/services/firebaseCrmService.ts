import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
  getDocFromServer,
  Unsubscribe
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import {
  Lead,
  Customer,
  Booking,
  TravelCase,
  Payment,
  FollowUp,
  Task,
  Supplier,
  Invoice,
  ServiceItem
} from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const currentUser = auth.currentUser;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentUser?.uid,
      email: currentUser?.email,
      emailVerified: currentUser?.emailVerified,
      isAnonymous: currentUser?.isAnonymous,
      tenantId: currentUser?.tenantId,
      providerInfo: currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const CRM_COLLECTIONS = {
  LEADS: 'leads',
  CUSTOMERS: 'customers',
  SERVICES: 'services',
  BOOKINGS: 'bookings',
  CASES: 'cases',
  PAYMENTS: 'payments',
  FOLLOW_UPS: 'follow_ups',
  TASKS: 'tasks',
  SUPPLIERS: 'suppliers',
  INVOICES: 'invoices',
  TEST: 'test'
} as const;

/**
 * Validates connection to Firestore on boot as required by Firestore integration
 */
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, CRM_COLLECTIONS.TEST, 'connection'));
    return true;
  } catch (error: any) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
      return false;
    }
    // Connected if reaches server even with non-existent doc
    return true;
  }
}

// Strip undefined values which Firestore does not allow
function cleanData<T extends Record<string, any>>(obj: T): T {
  const cleaned: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      cleaned[key] = value;
    }
  }
  return cleaned as T;
}

// -------------------------------------------------------------
// LEADS
// -------------------------------------------------------------
export async function getLeadsFromFirebase(): Promise<Lead[]> {
  try {
    const snap = await getDocs(collection(db, CRM_COLLECTIONS.LEADS));
    return snap.docs.map(d => ({ ...d.data(), id: d.id } as Lead));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, CRM_COLLECTIONS.LEADS);
  }
}

export async function saveLeadToFirebase(lead: Lead): Promise<void> {
  const path = `${CRM_COLLECTIONS.LEADS}/${lead.id}`;
  try {
    await setDoc(doc(db, CRM_COLLECTIONS.LEADS, lead.id), cleanData(lead));
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function deleteLeadFromFirebase(leadId: string): Promise<void> {
  const path = `${CRM_COLLECTIONS.LEADS}/${leadId}`;
  try {
    await deleteDoc(doc(db, CRM_COLLECTIONS.LEADS, leadId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

export function subscribeToLeads(onData: (leads: Lead[]) => void): Unsubscribe {
  return onSnapshot(
    collection(db, CRM_COLLECTIONS.LEADS),
    (snap) => {
      const items = snap.docs.map(d => ({ ...d.data(), id: d.id } as Lead));
      onData(items);
    },
    (err) => {
      handleFirestoreError(err, OperationType.GET, CRM_COLLECTIONS.LEADS);
    }
  );
}

// -------------------------------------------------------------
// CUSTOMERS
// -------------------------------------------------------------
export async function getCustomersFromFirebase(): Promise<Customer[]> {
  try {
    const snap = await getDocs(collection(db, CRM_COLLECTIONS.CUSTOMERS));
    return snap.docs.map(d => ({ ...d.data(), id: d.id } as Customer));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, CRM_COLLECTIONS.CUSTOMERS);
  }
}

export async function saveCustomerToFirebase(customer: Customer): Promise<void> {
  const path = `${CRM_COLLECTIONS.CUSTOMERS}/${customer.id}`;
  try {
    await setDoc(doc(db, CRM_COLLECTIONS.CUSTOMERS, customer.id), cleanData(customer));
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function deleteCustomerFromFirebase(customerId: string): Promise<void> {
  const path = `${CRM_COLLECTIONS.CUSTOMERS}/${customerId}`;
  try {
    await deleteDoc(doc(db, CRM_COLLECTIONS.CUSTOMERS, customerId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

export function subscribeToCustomers(onData: (customers: Customer[]) => void): Unsubscribe {
  return onSnapshot(
    collection(db, CRM_COLLECTIONS.CUSTOMERS),
    (snap) => {
      const items = snap.docs.map(d => ({ ...d.data(), id: d.id } as Customer));
      onData(items);
    },
    (err) => {
      handleFirestoreError(err, OperationType.GET, CRM_COLLECTIONS.CUSTOMERS);
    }
  );
}

// -------------------------------------------------------------
// BOOKINGS
// -------------------------------------------------------------
export async function getBookingsFromFirebase(): Promise<Booking[]> {
  try {
    const snap = await getDocs(collection(db, CRM_COLLECTIONS.BOOKINGS));
    return snap.docs.map(d => ({ ...d.data(), id: d.id } as Booking));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, CRM_COLLECTIONS.BOOKINGS);
  }
}

export async function saveBookingToFirebase(booking: Booking): Promise<void> {
  const path = `${CRM_COLLECTIONS.BOOKINGS}/${booking.id}`;
  try {
    await setDoc(doc(db, CRM_COLLECTIONS.BOOKINGS, booking.id), cleanData(booking));
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function deleteBookingFromFirebase(bookingId: string): Promise<void> {
  const path = `${CRM_COLLECTIONS.BOOKINGS}/${bookingId}`;
  try {
    await deleteDoc(doc(db, CRM_COLLECTIONS.BOOKINGS, bookingId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

export function subscribeToBookings(onData: (bookings: Booking[]) => void): Unsubscribe {
  return onSnapshot(
    collection(db, CRM_COLLECTIONS.BOOKINGS),
    (snap) => {
      const items = snap.docs.map(d => ({ ...d.data(), id: d.id } as Booking));
      onData(items);
    },
    (err) => {
      handleFirestoreError(err, OperationType.GET, CRM_COLLECTIONS.BOOKINGS);
    }
  );
}

// -------------------------------------------------------------
// SERVICES
// -------------------------------------------------------------
export async function getServicesFromFirebase(): Promise<ServiceItem[]> {
  try {
    const snap = await getDocs(collection(db, CRM_COLLECTIONS.SERVICES));
    return snap.docs.map(d => ({ ...d.data(), id: d.id } as ServiceItem));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, CRM_COLLECTIONS.SERVICES);
  }
}

export async function saveServiceToFirebase(service: ServiceItem): Promise<void> {
  const path = `${CRM_COLLECTIONS.SERVICES}/${service.id}`;
  try {
    await setDoc(doc(db, CRM_COLLECTIONS.SERVICES, service.id), cleanData(service));
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// -------------------------------------------------------------
// CASES
// -------------------------------------------------------------
export async function getCasesFromFirebase(): Promise<TravelCase[]> {
  try {
    const snap = await getDocs(collection(db, CRM_COLLECTIONS.CASES));
    return snap.docs.map(d => ({ ...d.data(), id: d.id } as TravelCase));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, CRM_COLLECTIONS.CASES);
  }
}

export async function saveCaseToFirebase(travelCase: TravelCase): Promise<void> {
  const path = `${CRM_COLLECTIONS.CASES}/${travelCase.id}`;
  try {
    await setDoc(doc(db, CRM_COLLECTIONS.CASES, travelCase.id), cleanData(travelCase));
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// -------------------------------------------------------------
// PAYMENTS
// -------------------------------------------------------------
export async function getPaymentsFromFirebase(): Promise<Payment[]> {
  try {
    const snap = await getDocs(collection(db, CRM_COLLECTIONS.PAYMENTS));
    return snap.docs.map(d => ({ ...d.data(), id: d.id } as Payment));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, CRM_COLLECTIONS.PAYMENTS);
  }
}

export async function savePaymentToFirebase(payment: Payment): Promise<void> {
  const path = `${CRM_COLLECTIONS.PAYMENTS}/${payment.id}`;
  try {
    await setDoc(doc(db, CRM_COLLECTIONS.PAYMENTS, payment.id), cleanData(payment));
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// -------------------------------------------------------------
// FOLLOW-UPS
// -------------------------------------------------------------
export async function getFollowUpsFromFirebase(): Promise<FollowUp[]> {
  try {
    const snap = await getDocs(collection(db, CRM_COLLECTIONS.FOLLOW_UPS));
    return snap.docs.map(d => ({ ...d.data(), id: d.id } as FollowUp));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, CRM_COLLECTIONS.FOLLOW_UPS);
  }
}

export async function saveFollowUpToFirebase(followUp: FollowUp): Promise<void> {
  const path = `${CRM_COLLECTIONS.FOLLOW_UPS}/${followUp.id}`;
  try {
    await setDoc(doc(db, CRM_COLLECTIONS.FOLLOW_UPS, followUp.id), cleanData(followUp));
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// -------------------------------------------------------------
// TASKS
// -------------------------------------------------------------
export async function getTasksFromFirebase(): Promise<Task[]> {
  try {
    const snap = await getDocs(collection(db, CRM_COLLECTIONS.TASKS));
    return snap.docs.map(d => ({ ...d.data(), id: d.id } as Task));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, CRM_COLLECTIONS.TASKS);
  }
}

export async function saveTaskToFirebase(task: Task): Promise<void> {
  const path = `${CRM_COLLECTIONS.TASKS}/${task.id}`;
  try {
    await setDoc(doc(db, CRM_COLLECTIONS.TASKS, task.id), cleanData(task));
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// -------------------------------------------------------------
// SUPPLIERS
// -------------------------------------------------------------
export async function getSuppliersFromFirebase(): Promise<Supplier[]> {
  try {
    const snap = await getDocs(collection(db, CRM_COLLECTIONS.SUPPLIERS));
    return snap.docs.map(d => ({ ...d.data(), id: d.id } as Supplier));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, CRM_COLLECTIONS.SUPPLIERS);
  }
}

export async function saveSupplierToFirebase(supplier: Supplier): Promise<void> {
  const path = `${CRM_COLLECTIONS.SUPPLIERS}/${supplier.id}`;
  try {
    await setDoc(doc(db, CRM_COLLECTIONS.SUPPLIERS, supplier.id), cleanData(supplier));
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// -------------------------------------------------------------
// INVOICES
// -------------------------------------------------------------
export async function getInvoicesFromFirebase(): Promise<Invoice[]> {
  try {
    const snap = await getDocs(collection(db, CRM_COLLECTIONS.INVOICES));
    return snap.docs.map(d => ({ ...d.data(), id: d.id } as Invoice));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, CRM_COLLECTIONS.INVOICES);
  }
}

export async function saveInvoiceToFirebase(invoice: Invoice): Promise<void> {
  const path = `${CRM_COLLECTIONS.INVOICES}/${invoice.id}`;
  try {
    await setDoc(doc(db, CRM_COLLECTIONS.INVOICES, invoice.id), cleanData(invoice));
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// -------------------------------------------------------------
// BULK SEEDING HELPER
// -------------------------------------------------------------
export async function seedInitialCrmDataToFirebase(initialData: {
  leads: Lead[];
  customers: Customer[];
  services: ServiceItem[];
  bookings: Booking[];
  cases: TravelCase[];
  payments: Payment[];
  suppliers: Supplier[];
  invoices: Invoice[];
}): Promise<{ success: boolean; count: number }> {
  let count = 0;
  try {
    for (const lead of initialData.leads) {
      await saveLeadToFirebase(lead);
      count++;
    }
    for (const customer of initialData.customers) {
      await saveCustomerToFirebase(customer);
      count++;
    }
    for (const service of initialData.services) {
      await saveServiceToFirebase(service);
      count++;
    }
    for (const booking of initialData.bookings) {
      await saveBookingToFirebase(booking);
      count++;
    }
    for (const c of initialData.cases) {
      await saveCaseToFirebase(c);
      count++;
    }
    for (const p of initialData.payments) {
      await savePaymentToFirebase(p);
      count++;
    }
    for (const s of initialData.suppliers) {
      await saveSupplierToFirebase(s);
      count++;
    }
    for (const inv of initialData.invoices) {
      await saveInvoiceToFirebase(inv);
      count++;
    }
    return { success: true, count };
  } catch (err) {
    console.error('Error seeding CRM data to Firebase:', err);
    return { success: false, count };
  }
}
