// import { useEffect, useState } from "react";
// import { MessageCircle, ArrowLeft, Clock3, User, Loader2 } from "lucide-react";
// import type { Offer } from "../../Types/negotiation";
// import {
//   getApplicantOffers,
//   getMyOffers,
//   getConversationMessages,
// } from "../../Servives/negotiationApi";

// // --------------------------------------------------
// // TYPES
// // --------------------------------------------------

// type ConversationOffer = {
//   conversation_id: number;
//   task_id: number;
//   employer_id: number;
//   applicant_id: number;
//   username: string;
//   avatar: string;
//   offers: Offer[];
//   latestOffer: Offer;
// };

// type Message = {
//   message_id: number;
//   conversation_id: number;
//   sender_id: number;
//   content: string;
//   created_at: string;
// };

// type OffersProps = {
//   currentUserId: number;
// };

// // --------------------------------------------------
// // COMPONENT
// // --------------------------------------------------

// export default function OffersList({ currentUserId }: OffersProps) {
//   const [offers, setOffers] = useState<Offer[]>([]);
//   const [selectedConversation, setSelectedConversation] =
//     useState<ConversationOffer | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);

//   const [loading, setLoading] = useState(true);
//   const [messageLoading, setMessageLoading] = useState(false);
//   const [error, setError] = useState("");

//   // --------------------------------------------------
//   // LOAD OFFERS
//   // --------------------------------------------------

//   useEffect(() => {
//     loadOffers();
//   }, []);

//   const loadOffers = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const [myOffers, applicantOffers] = await Promise.all([
//         getMyOffers(),
//         getApplicantOffers(),
//       ]);

//       setOffers([...myOffers, ...applicantOffers]);
//     } catch (err: unknown) {
//       console.error("Failed to load offers:", err);
//       setError(err instanceof Error ? err.message : "Failed to load offers");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const groupedOffers = Object.values(
//     offers.reduce<Record<number, ConversationOffer>>((groups, offer) => {
//       const conversationId = offer.conversation_id;

//      if (!groups[conversationId]) {
//        groups[conversationId] = {
//          conversation_id: conversationId,
//          task_id: offer.task_id,
//          employer_id: offer.employer_id,
//          applicant_id: offer.applicant_id,
//          username: offer.username ?? "",
//          avatar: offer.avatar ?? "",
//          offers: [],
//          latestOffer: offer,
//        };
//      }

//       groups[conversationId].offers.push(offer);

//       if (
//         new Date(offer.created_at) >
//         new Date(groups[conversationId].latestOffer.created_at)
//       ) {
//         groups[conversationId].latestOffer = offer;
//       }

//       return groups;
//     }, {}),
//   );

//   // --------------------------------------------------
//   // OPEN CONVERSATION
//   // --------------------------------------------------

//   async function handleOpenConversation(conversation: ConversationOffer) {
//     try {
//       setSelectedConversation(conversation);
//       setMessageLoading(true);
//       setError("");

//       const data = await getConversationMessages(conversation.conversation_id);
//       setMessages(data);
//     } catch (err: unknown) {
//       console.error("Failed to load messages:", err);
//       setError(
//         err instanceof Error ? err.message : "Failed to load conversation",
//       );
//     } finally {
//       setMessageLoading(false);
//     }
//   }

//   // --------------------------------------------------
//   // BACK TO OFFERS
//   // --------------------------------------------------

//   function handleBack() {
//     setSelectedConversation(null);
//     setMessages([]);
//     setError("");
//   }

//   // --------------------------------------------------
//   // LOADING STATE
//   // --------------------------------------------------

//   if (loading) {
//     return (
//       <div className="flex min-h-[400px] items-center justify-center">
//         <Loader2 className="h-6 w-6 animate-spin text-black/50" />
//       </div>
//     );
//   }

//   // --------------------------------------------------
//   // CONVERSATION VIEW
//   // --------------------------------------------------

//   if (selectedConversation) {
//     return (
//       <div className="flex h-full min-h-[600px] flex-col overflow-hidden rounded-2xl border border-black/10 bg-white">
//         {/* Header */}
//         <div className="flex items-center gap-4 border-b border-black/10 px-5 py-4">
//           <button
//             onClick={handleBack}
//             className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-black/10 transition hover:bg-black/5"
//             aria-label="Go back to offers list"
//           >
//             <ArrowLeft className="h-4 w-4" />
//           </button>

//           {/* Avatar */}
//           <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e8e3d5]">
//             {selectedConversation.avatar ? (
//               <img
//                 src={selectedConversation.avatar}
//                 alt={selectedConversation.username}
//                 className="h-full w-full object-cover"
//               />
//             ) : (
//               <User className="h-4 w-4 text-black/60" />
//             )}
//           </div>

//           <div className="min-w-0 flex-1">
//             <h2 className="truncate text-sm font-bold">
//               {selectedConversation.username}
//             </h2>
//             <p className="mt-0.5 text-xs text-black/50">
//               Task #{selectedConversation.task_id}
//             </p>
//           </div>

//           {/* Latest offer */}
//           <div className="text-right">
//             <p className="text-[10px] font-medium text-black/40">
//               LATEST OFFER
//             </p>
//             <p className="mt-1 text-sm font-black">
//               ${selectedConversation.latestOffer.amount}
//             </p>
//           </div>
//         </div>

//         {/* Messages Container */}
//         <div className="flex-1 space-y-4 overflow-y-auto bg-[#fafafa] p-5">
//           {messageLoading ? (
//             <div className="flex h-full items-center justify-center">
//               <Loader2 className="h-5 w-5 animate-spin text-black/50" />
//             </div>
//           ) : messages.length === 0 ? (
//             <div className="flex h-full flex-col items-center justify-center text-center">
//               <MessageCircle className="mb-3 h-8 w-8 text-black/20" />
//               <p className="text-sm font-semibold">No messages yet</p>
//               <p className="mt-1 text-xs text-black/40">
//                 Start the negotiation from this conversation.
//               </p>
//             </div>
//           ) : (
//             messages.map((message) => {
//               const isMine = message.sender_id === currentUserId;

//               return (
//                 <div
//                   key={message.message_id}
//                   className={`flex ${isMine ? "justify-end" : "justify-start"}`}
//                 >
//                   <div
//                     className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
//                       isMine
//                         ? "rounded-br-md bg-black text-white"
//                         : "rounded-bl-md bg-[#e8e3d5] text-black"
//                     }`}
//                   >
//                     <p>{message.content}</p>
//                     <p
//                       className={`mt-1.5 text-[10px] ${
//                         isMine ? "text-white/50" : "text-black/40"
//                       }`}
//                     >
//                       {new Date(message.created_at).toLocaleTimeString([], {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto w-full max-w-4xl">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-black tracking-tight">Negotiations</h1>
//         <p className="mt-1 text-sm text-black/50">
//           View your task negotiations, offers, and conversations.
//         </p>
//       </div>

//       {error && (
//         <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600">
//           {error}
//         </div>
//       )}

//       {/* Empty State */}
//       {groupedOffers.length === 0 ? (
//         <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 bg-white text-center">
//           <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#e8e3d5]">
//             <MessageCircle className="h-5 w-5 text-black/70" />
//           </div>
//           <h3 className="text-sm font-bold">No negotiations yet</h3>
//           <p className="mt-1 max-w-sm text-xs leading-5 text-black/40">
//             Your task negotiations and applicant offers will appear here when a
//             negotiation starts.
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-3">
//           {groupedOffers.map((conversation) => {
//             const latestOffer = conversation.latestOffer;

//             return (
//               <button
//                 key={conversation.conversation_id}
//                 onClick={() => handleOpenConversation(conversation)}
//                 className="group flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-black/10 bg-white p-4 text-left transition hover:-translate-y-[1px] hover:border-black/20 hover:shadow-sm"
//               >
//                 {/* Avatar */}
//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e8e3d5]">
//                   {conversation.avatar ? (
//                     <img
//                       src={conversation.avatar}
//                       alt={conversation.username}
//                       className="h-full w-full object-cover"
//                     />
//                   ) : (
//                     <User className="h-5 w-5 text-black/60" />
//                   )}
//                 </div>

//                 {/* Main */}
//                 <div className="min-w-0 flex-1">
//                   <div className="flex items-center gap-2">
//                     <h3 className="truncate text-sm font-bold">
//                       {conversation.username}
//                     </h3>
//                     <span className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-semibold text-black/50">
//                       {conversation.offers.length}{" "}
//                       {conversation.offers.length === 1 ? "offer" : "offers"}
//                     </span>
//                   </div>

//                   <p className="mt-1 text-xs text-black/45">
//                     Task #{conversation.task_id}
//                   </p>

//                   <div className="mt-2 flex items-center gap-2">
//                     <Clock3 className="h-3 w-3 text-black/30" />
//                     <span className="text-[11px] text-black/40">
//                       {new Date(latestOffer.created_at).toLocaleString()}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Latest Offer Details */}
//                 <div className="hidden shrink-0 text-right sm:block">
//                   <p className="text-[10px] font-medium text-black/35">
//                     LATEST OFFER
//                   </p>
//                   <p className="mt-1 text-sm font-black">
//                     ${latestOffer.amount}
//                   </p>
//                   <p className="mt-1 text-[10px] capitalize text-black/40">
//                     {latestOffer.status || "pending"}
//                   </p>
//                 </div>

//                 {/* Action Icon */}
//                 <MessageCircle className="h-4 w-4 shrink-0 text-black/25 transition group-hover:text-black" />
//               </button>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import {
  MessageCircle,
  ArrowLeft,
  Clock3,
  Loader2,
  Search,
  Send,
  MoreVertical,
  Phone,
  Video,
  CheckCheck,
  Paperclip,
  Smile,
  Circle,
  BriefcaseBusiness,
} from "lucide-react";

import type { Offer } from "../../Types/negotiation";
import {
  getApplicantOffers,
  getMyOffers,
  getConversationMessages,
} from "../../Servives/negotiationApi";

// --------------------------------------------------
// TYPES
// --------------------------------------------------

type Conversation = {
  conversation_id: number;
  task_id: number;
  employer_id: number;
  applicant_id: number;
  username: string;
  avatar: string;
  offers: Offer[];
  latestOffer?: Offer;
  lastMessage?: string;
  unreadCount?: number;
  isOnline?: boolean;
};

type Message = {
  message_id: number;
  conversation_id: number;
  sender_id: number;
  content: string;
  created_at: string;
};

type MessagingPlatformProps = {
  currentUserId: number;
  onSendMessage?: (conversationId: number, content: string) => Promise<void>;
};

// --------------------------------------------------
// HELPERS
// --------------------------------------------------

function formatTime(date: string) {
  const value = new Date(date);
  if (Number.isNaN(value.getTime())) return "";
  return value.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDateLabel(date: string) {
  const value = new Date(date);
  if (Number.isNaN(value.getTime())) return "";
  const now = new Date();

  if (value.toDateString() === now.toDateString()) return "Today";

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (value.toDateString() === yesterday.toDateString()) return "Yesterday";

  return value.toLocaleDateString([], { month: "short", day: "numeric" });
}

function getInitials(name: string) {
  if (!name) return "U";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

// --------------------------------------------------
// COMPONENTS
// --------------------------------------------------

function UserAvatar({
  src,
  name,
  size = "md",
  isOnline = false,
}: {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg";
  isOnline?: boolean;
}) {
  const sizeClass =
    size === "lg"
      ? "h-12 w-12 text-sm"
      : size === "sm"
        ? "h-8 w-8 text-xs"
        : "h-10 w-10 text-xs";

  return (
    <div className="relative shrink-0">
      <div
        className={`flex items-center justify-center overflow-hidden rounded-full bg-[#e8e3d5] font-black text-[#0f172a]/70 ${sizeClass}`}
      >
        {src ? (
          <img src={src} alt={name} className="h-full w-full object-cover" />
        ) : (
          getInitials(name)
        )}
      </div>
      {isOnline && (
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
      )}
    </div>
  );
}

// --------------------------------------------------
// MAIN MESSAGING PLATFORM
// --------------------------------------------------

export default function MessagingPlatform({
  currentUserId,
  onSendMessage,
}: MessagingPlatformProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  // Load Initial Inbox Data
  useEffect(() => {
    loadInbox();
  }, []);

  const loadInbox = async () => {
    try {
      setLoading(true);
      setError("");

      const [myOffers, applicantOffers] = await Promise.all([
        getMyOffers(),
        getApplicantOffers(),
      ]);

      const allOffers = [...myOffers, ...applicantOffers];

      // Group into active conversations
      const grouped = Object.values(
        allOffers.reduce<Record<number, Conversation>>((acc, offer) => {
          const id = offer.conversation_id;
          if (!acc[id]) {
            acc[id] = {
              conversation_id: id,
              task_id: offer.task_id,
              employer_id: offer.employer_id,
              applicant_id: offer.applicant_id,
              username: offer.username ?? "Unknown User",
              avatar: offer.avatar ?? "",
              offers: [],
              latestOffer: offer,
              isOnline: Math.random() > 0.4, // Visual mock state
            };
          }
          acc[id].offers.push(offer);

          if (
            new Date(offer.created_at) >
            new Date(acc[id].latestOffer!.created_at)
          ) {
            acc[id].latestOffer = offer;
          }

          return acc;
        }, {}),
      );

      setConversations(grouped);
      if (grouped.length > 0 && !activeConversation) {
        handleSelectConversation(grouped[0]);
      }
    } catch (err: unknown) {
      console.error("Failed to load conversations:", err);
      setError(err instanceof Error ? err.message : "Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectConversation = async (conversation: Conversation) => {
    try {
      setActiveConversation(conversation);
      setMessagesLoading(true);
      setError("");

      const data = await getConversationMessages(conversation.conversation_id);
      setMessages(data);
    } catch (err: unknown) {
      console.error("Failed to load thread:", err);
      setError(err instanceof Error ? err.message : "Failed to load messages");
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation || sending) return;

    const messageText = newMessage.trim();
    setNewMessage("");

    // Optimistic Update
    const tempMsg: Message = {
      message_id: Date.now(),
      conversation_id: activeConversation.conversation_id,
      sender_id: currentUserId,
      content: messageText,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempMsg]);

    try {
      setSending(true);
      if (onSendMessage) {
        await onSendMessage(activeConversation.conversation_id, messageText);
      }
    } catch (err) {
      console.error("Failed to send message", err);
    } finally {
      setSending(false);
    }
  };

  const filteredConversations = useMemo(() => {
    const query = search.toLowerCase().trim();
    return conversations.filter(
      (c) =>
        c.username.toLowerCase().includes(query) ||
        String(c.task_id).includes(query),
    );
  }, [conversations, search]);

  if (loading) {
    return (
      <div className="flex min-h-[600px] items-center justify-center rounded-[28px] border border-[#0f172a]/10 bg-white">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8e3d5]">
            <Loader2 className="h-6 w-6 animate-spin text-[#0f172a]" />
          </div>
          <p className="mt-3 text-xs font-bold text-[#0f172a]">
            Loading Messages...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="grid h-[800px] overflow-hidden rounded-[28px] border border-[#0f172a]/10 bg-white shadow-xl lg:grid-cols-[340px_1fr]">
        {/* -------------------------------------------------- */}
        {/* SIDEBAR: CONVERSATION LIST */}
        {/* -------------------------------------------------- */}
        <div
          className={`flex flex-col border-r border-[#0f172a]/10 bg-white ${
            activeConversation ? "hidden lg:flex" : "flex"
          }`}
        >
          {/* Header */}
          <div className="border-b border-[#0f172a]/10 p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-black text-[#0f172a]">Messages</h1>
              <span className="rounded-full bg-[#6366f1]/10 px-2.5 py-1 text-xs font-bold text-[#6366f1]">
                {conversations.length} Active
              </span>
            </div>

            {/* Search Input */}
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0f172a]/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search messages..."
                className="h-9 w-full rounded-xl border border-[#0f172a]/10 bg-[#e8e3d5]/30 pl-9 pr-3 text-xs text-[#0f172a] placeholder-[#0f172a]/40 outline-none transition focus:border-[#6366f1]"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto p-2">
            {filteredConversations.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#0f172a]/40">
                No conversations found.
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const isActive =
                  activeConversation?.conversation_id === conv.conversation_id;

                return (
                  <button
                    key={conv.conversation_id}
                    onClick={() => handleSelectConversation(conv)}
                    className={`group relative flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${
                      isActive
                        ? "bg-[#0f172a] text-white"
                        : "hover:bg-[#e8e3d5]/40 text-[#0f172a]"
                    }`}
                  >
                    <UserAvatar
                      src={conv.avatar}
                      name={conv.username}
                      isOnline={conv.isOnline}
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p
                          className={`truncate text-xs font-bold ${
                            isActive ? "text-white" : "text-[#0f172a]"
                          }`}
                        >
                          {conv.username}
                        </p>
                        {conv.latestOffer && (
                          <span
                            className={`text-[10px] ${
                              isActive ? "text-white/50" : "text-[#0f172a]/40"
                            }`}
                          >
                            {formatDateLabel(conv.latestOffer.created_at)}
                          </span>
                        )}
                      </div>

                      <div className="mt-1 flex items-center justify-between gap-1 text-[11px]">
                        <span
                          className={`truncate ${
                            isActive ? "text-white/70" : "text-[#0f172a]/60"
                          }`}
                        >
                          Task #{conv.task_id}
                        </span>

                        {conv.latestOffer && (
                          <span
                            className={`shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-extrabold ${
                              isActive
                                ? "bg-[#6366f1] text-white"
                                : "bg-[#e8e3d5] text-[#0f172a]"
                            }`}
                          >
                            ${conv.latestOffer.amount}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* -------------------------------------------------- */}
        {/* CHAT MAIN WINDOW */}
        {/* -------------------------------------------------- */}
        {activeConversation ? (
          <div
            className={`flex flex-col bg-[#fafaf8] ${
              !activeConversation ? "hidden lg:flex" : "flex"
            }`}
          >
            {/* Active Header */}
            <div className="flex h-16 items-center justify-between border-b border-[#0f172a]/10 bg-white px-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveConversation(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#0f172a]/10 lg:hidden"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>

                <UserAvatar
                  src={activeConversation.avatar}
                  name={activeConversation.username}
                  isOnline={activeConversation.isOnline}
                />

                <div>
                  <h2 className="text-sm font-black text-[#0f172a]">
                    {activeConversation.username}
                  </h2>
                  <p className="flex items-center gap-1.5 text-[10px] text-[#0f172a]/50">
                    <BriefcaseBusiness className="h-3 w-3" />
                    Task #{activeConversation.task_id}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 text-[#0f172a]/60">
                <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#0f172a]/10 hover:bg-[#e8e3d5]/50 hover:text-[#0f172a]">
                  <Phone className="h-4 w-4" />
                </button>
                <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#0f172a]/10 hover:bg-[#e8e3d5]/50 hover:text-[#0f172a]">
                  <Video className="h-4 w-4" />
                </button>
                <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#0f172a]/10 hover:bg-[#e8e3d5]/50 hover:text-[#0f172a]">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Feed */}
            <div className="flex-1 overflow-y-auto p-6">
              {messagesLoading ? (
                <div className="flex h-full items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-[#6366f1]" />
                </div>
              ) : messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8e3d5]">
                    <MessageCircle className="h-6 w-6 text-[#0f172a]/60" />
                  </div>
                  <p className="mt-3 text-xs font-bold text-[#0f172a]">
                    No messages in this chat yet
                  </p>
                  <p className="mt-1 text-[11px] text-[#0f172a]/40">
                    Send a message to kick off the negotiation.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => {
                    const isMine = message.sender_id === currentUserId;

                    return (
                      <div
                        key={message.message_id}
                        className={`flex ${
                          isMine ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div className="max-w-[70%]">
                          <div
                            className={`rounded-2xl px-4 py-3 text-xs leading-5 ${
                              isMine
                                ? "rounded-br-none bg-[#6366f1] text-white"
                                : "rounded-bl-none border border-[#0f172a]/10 bg-white text-[#0f172a] shadow-sm"
                            }`}
                          >
                            {message.content}
                          </div>

                          <div
                            className={`mt-1 flex items-center gap-1 text-[9px] text-[#0f172a]/40 ${
                              isMine ? "justify-end" : "justify-start"
                            }`}
                          >
                            <Clock3 className="h-2.5 w-2.5" />
                            {formatTime(message.created_at)}
                            {isMine && (
                              <CheckCheck className="ml-1 h-3 w-3 text-[#6366f1]" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSend}
              className="border-t border-[#0f172a]/10 bg-white p-4"
            >
              <div className="flex items-center gap-2 rounded-2xl border border-[#0f172a]/10 bg-[#fafaf8] px-3 py-2">
                <button
                  type="button"
                  className="text-[#0f172a]/40 transition hover:text-[#0f172a]"
                >
                  <Paperclip className="h-4 w-4" />
                </button>

                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent text-xs text-[#0f172a] outline-none placeholder:text-[#0f172a]/40"
                />

                <button
                  type="button"
                  className="text-[#0f172a]/40 transition hover:text-[#0f172a]"
                >
                  <Smile className="h-4 w-4" />
                </button>

                <button
                  type="submit"
                  disabled={!newMessage.trim() || sending}
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#6366f1] text-white transition hover:opacity-90 disabled:opacity-40"
                >
                  {sending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Empty Chat Screen State */
          <div className="hidden h-full flex-col items-center justify-center bg-[#fafaf8] text-center lg:flex">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#e8e3d5]">
              <MessageCircle className="h-8 w-8 text-[#0f172a]/60" />
            </div>
            <h3 className="mt-4 text-base font-black text-[#0f172a]">
              Select a Conversation
            </h3>
            <p className="mt-1 max-w-sm text-xs leading-5 text-[#0f172a]/40">
              Pick a thread from your inbox to view full chat history and
              communicate directly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}