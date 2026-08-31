import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Offer } from "../../Types/negotiation";
import type { Message } from "../../Types/negotiation";
import { acceptOffer } from "../../Servives/negotiationApi";
import { getConversationMessages } from "../../Servives/negotiationApi";
import { sendMessage } from "../../Servives/negotiationApi";
import { rejectOffer } from "../../Servives/negotiationApi";
import { MessageBubble } from "./message";
import { useLocation } from "react-router-dom";
import { OfferCard } from "./offercard";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export default function NegotiationChat() {
  const { conversationId, taskId } = useParams();

  const location = useLocation();

  const conversationID = Number(conversationId);


  const taskID = Number(location.state?.taskId);
  const otherUserID = Number(location.state?.employerId);

 ;
  // const applicationID = Number(applicationId);
  //  const amount = Number(otherUserId);

  const [messages, setMessages] = useState<Message[]>([]);

  const [offers, setOffers] = useState<Offer[]>([]);

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);

  const [sending, setSending] = useState(false);

  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const getHeaders = () => ({
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  });

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        credentials: "include",
        headers: getHeaders(),
      });

      const text = await response.text();

      let result;

      try {
        result = JSON.parse(text);
      } catch {
        throw new Error(text || "Invalid server response");
      }

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to get current user");
      }

      setCurrentUserId(result.data.id);

      return result.data.id;
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    loadConversation();
  }, [conversationId]);

  async function loadConversation() {
    try {
      setLoading(true);

      const data = await getConversationMessages(conversationID);

      setMessages(data);
    } catch (error) {
      console.error("Failed to load conversation:", error);
    } finally {
      setLoading(false);
    }
  }

async function handleSendMessage() {
  if (!message.trim() || sending) {
    return;
  }

  if (!Number.isFinite(taskID)) {
    console.error("Invalid taskID:", taskID);
    return;
  }

  if (!Number.isFinite(otherUserID)) {
    console.error("Invalid otherUserID:", otherUserID);
    return;
  }

  if (!Number.isFinite(currentUserId)) {
    console.error("Invalid currentUserID:", currentUserId);
    return;
  }
  if (currentUserId === null) {
    console.error("Invalid currentUserId:", currentUserId);
    return;
  }

  try {
    setSending(true);
    // console.log("PARAMS:", params);
    console.log("TASK ID:", taskID);
    console.log("OTHER USER:", otherUserID);
    console.log("CONVERSATION:", conversationID);
    console.log("Application ID", )

    // await sendNegotiationMessage({
    //   TaskId: taskID,
    //   EmployerID: otherUserID,
    //   Status: "pending",
    //   Content: message.trim(),

    //   offer: {
    //     task_id: taskID,
    //     employer_id: otherUserID,
    //     user_id: currentUserId,
    //     new_offer: amount,
    //     status: "pending",
    //   },
    // });


   await sendMessage({
     conversationID: Number(conversationId),
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
    try {
      await rejectOffer({
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
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b p-4">
        <h2 className="font-semibold">Negotiation</h2>

        <p className="text-xs text-gray-500">Task #{taskId}</p>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {loading ? (
          <div className="text-center text-sm text-gray-500">
            Loading conversation...
          </div>
        ) : (
          currentUserId !== null &&
          messages.map((message) => (
            <MessageBubble
              key={message.message_id}
              message={message}
              currentUserId={currentUserId}
            />
          ))
        )}

        {currentUserId !== null &&
          offers.map((offer) => (
            <OfferCard
              key={offer.offer_id}
              offer={offer}
              currentUserId={currentUserId}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ))}
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
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
