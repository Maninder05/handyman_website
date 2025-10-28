export type Offer = {
  _id: string;
  clientId: string;
  handymanId: string;
  title: string;
  note?: string;
  amountCents: number;
  currency: string; // e.g., "cad"
  status?: 'pending' | 'accepted' | 'declined' | string;
  createdAt?: string;
  bookingID?: string; // may appear after accept
};

export type CreateIntentResponse = { clientSecret: string };
