// types/negotiation.ts

export interface Message {
  message_id: number;
  conversation_id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  created_at: string;
}

export interface Offer {
  offer_id: number;
  application_id: number;
  task_id: number;
  conversation_id: number;
  applicant_id: number;
  employer_id: number;
  created_by: number;
  amount: number;
  message?: string;
  status: "pending" | "accepted" | "rejected" | "";
  username?: string;
  avatar?: string;
  created_at: string;
}

export interface OfferActionRequest {
  application_id: number;
  task_id: number;
  offer_id: number;
  conversation_id: number;
}
