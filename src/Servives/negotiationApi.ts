import type { Message, Offer, OfferActionRequest } from "../Types/negotiation";

const API_URL = import.meta.env.VITE_API_URL;

const getHeaders = () => ({
  "Content-Type": "application/json",
  "x-api-key": import.meta.env.VITE_API_KEY,
});

export async function handleResponse(response: Response) {
  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export async function getConversationMessages(
  conversationId: number,
): Promise<Message[]> {
  const response = await fetch(
    `${API_URL}/conversations/${conversationId}/messages`,
    {
      method: "GET",
      credentials: "include",
      headers: getHeaders(),
    },
  );

  const data = await handleResponse(response);

  return data.data;
}


// export async function sendNegotiationMessage(payload: {
//   TaskId: number;
//   EmployerID: number;
//   Status: string;
//   Content: string;
//   offer: {
//     task_id: number;
//     employer_id: number;
//     user_id: number;
//     new_offer: number;
//     status: string;
//   };
// }) {
//   const response = await fetch(`${API_URL}/conversations/meesage`, {
//     method: "POST",
//     credentials: "include",
//     headers: getHeaders(),
//     body: JSON.stringify(payload),
//   });

//   return handleResponse(response);
// }
// ```ts
export async function sendMessage(payload: {
  conversationID: number;
  content: string;
}) {
  const response = await fetch(`${API_URL}/conversations/message`, {
    method: "POST",
    credentials: "include",
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
}
// ```




export async function acceptOffer(payload: OfferActionRequest) {
  const response = await fetch(`${API_URL}/offer/accept`, {
    method: "POST",
    credentials: "include",
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
}


export async function rejectOffer(payload: OfferActionRequest) {
  const response = await fetch(`${API_URL}/offer/reject`, {
    method: "POST",
    credentials: "include",
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
}


export async function getApplicantOffers(): Promise<Offer[]> {
  const response = await fetch(`${API_URL}/offers/applicant`, {
    method: "GET",
    credentials: "include",
    headers: getHeaders(),
  });

  const data = await handleResponse(response);

  return data.data;
}


export async function getMyOffers(): Promise<Offer[]> {
  const response = await fetch(`${API_URL}/offers/my`, {
    method: "GET",
    credentials: "include",
    headers: getHeaders(),
  });

  const data = await handleResponse(response);

  return data.data;
}



