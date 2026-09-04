// import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Offer } from "../../Types/negotiation";
import type { Message } from "../../Types/negotiation";
import { acceptOffer } from "../../Servives/negotiationApi";
import { getConversationMessages } from "../../Servives/negotiationApi";
import { sendMessage } from "../../Servives/negotiationApi";
import { rejectOffer } from "../../Servives/negotiationApi";
import { MessageBubble } from "./message";
// import { useLocation } from "react-router-dom";
import { OfferCard } from "./offercard";
import { getApplicantOffers, getMyOffers } from "../../Servives/negotiationApi";

// const API_URL = import.meta.env.VITE_API_URL;

type NegotiationChatProps = {
  conversation: {
    conversation_id: number;
    task_id: number;
    employer_id: number;
    applicant_id: number;
    username: string;
    avatar: string;
    isOnline?: boolean;
    offers: Offer[];
  };
  currentUserId: number;
};


export default function NegotiationChat({
  conversation,
  currentUserId,
}: NegotiationChatProps) {
  const conversationID = Number(conversation.conversation_id);
  const taskID = Number(conversation.task_id);

  const [messages, setMessages] = useState<Message[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  // const getHeaders = () => ({
  //   "Content-Type": "application/json",
  //   "x-api-key": API_KEY,
  // });

  useEffect(() => {
    loadConversation();
  }, [conversationID]);

  async function loadConversation() {
    try {
      setLoading(true);

      // Load messages
      const messagesData = await getConversationMessages(conversationID);

      setMessages(messagesData);

      // Load offers
      const [applicantOffers, myOffers] = await Promise.all([
        getApplicantOffers(),
        getMyOffers(),
      ]);

      const allOffers = [...applicantOffers, ...myOffers];

      const conversationOffers = allOffers.filter(
        (offer) => Number(offer.conversation_id) === conversationID,
      );

      // Remove duplicates
      const uniqueOffers = Array.from(
        new Map(
          conversationOffers.map((offer) => [offer.offer_id, offer]),
        ).values(),
      );

      setOffers(uniqueOffers);
    } catch (error) {
      console.error("Failed to load conversation:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSendMessage() {
    if (!message.trim() || sending) return;

    try {
      setSending(true);

      await sendMessage({
        conversationID,
        content: message.trim(),
      });

      setMessage("");

      await loadConversation();
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setSending(false);
    }
  }

  async function handleAccept(offer: Offer) {
    try {
      await acceptOffer({
        application_id: offer.application_id,
        task_id: offer.task_id,
        offer_id: offer.offer_id,
        conversation_id: offer.conversation_id,
      });

      setOffers((previous) =>
        previous.map((item) =>
          item.offer_id === offer.offer_id
            ? {
                ...item,
                status: "accepted",
              }
            : item,
        ),
      );
    } catch (error) {
      console.error("Failed to accept offer:", error);
    }
  }

  async function handleReject(offer: Offer) {
    // console.log()
    try {
      await rejectOffer({
        application_id: offer.application_id,
        task_id: offer.task_id,
        offer_id: offer.offer_id,
        conversation_id: offer.conversation_id,
      });
      // console

      setOffers((previous) =>
        previous.map((item) =>
          item.offer_id === offer.offer_id
            ? {
                ...item,
                status: "rejected",
              }
            : item,
        ),
      );
    } catch (error) {
      console.error("Failed to reject offer:", error);
    }
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
    {/* <div className="flex h-full flex-col"> */}
      {/* Header */}
      <div className="border-b p-4">
        <h2 className="font-semibold">Negotiation</h2>

        <p className="text-xs text-gray-500">Task #{taskID}</p>
      </div>

      {/* Messages + Offers */}
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {loading ? (
          <div className="text-center text-sm text-gray-500">
            Loading conversation...
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble
                key={message.message_id}
                message={message}
                currentUserId={currentUserId}
              />
            ))}

            {offers.map((offer) => (
              <OfferCard
                key={offer.offer_id}
                offer={offer}
                currentUserId={currentUserId}
                onAccept={handleAccept}
                onReject={handleReject}
              />
            ))}

            {messages.length === 0 && offers.length === 0 && (
              <div className="text-center text-sm text-gray-400">
                No messages or offers yet.
              </div>
            )}
          </>
        )}
      </div>

      {/* Composer */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a message..."
            className="flex-1 resize-none rounded-xl border p-3"
            rows={1}
          />

          <button
            onClick={handleSendMessage}
            disabled={sending || !message.trim()}
            className="rounded-xl bg-black px-5 py-3 text-white disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}