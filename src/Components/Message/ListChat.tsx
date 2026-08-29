// // ```tsx
// import { useEffect, useState } from "react";
// import {
//   MessageCircle,
//   ArrowLeft,
//   Clock3,
//   CheckCircle2,
//   XCircle,
//   DollarSign,
//   User,
//   Loader2,
// } from "lucide-react";
// import type { Offer,  } from "../../Types/negotiation";

// // import {
// //   getApplicantOffers,
// //   getMyOffers,
// //   getConversationMessages,
// // } from ".";

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
// //   const [offers, setOffers] = useState<Offer[]>([]);
// const [offers, setOffers] = useState<Offer[]>([]);
//   //   const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
//   const [selectedConversation, setSelectedConversation] =
//     useState<ConversationOffer | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);

//   const [loading, setLoading] = useState(true);
//   const [messageLoading, setMessageLoading] = useState(false);
//   const [error, setError] = useState("");

//   // --------------------------------------------------
//   // LOAD OFFERS
//   // --------------------------------------------------

// useEffect(() => {
//   loadOffers();
// }, []);

// const loadOffers = async () => {
//   try {
//     setLoading(true);
//     setError("");

//     const [myOffers, applicantOffers] = await Promise.all([
//       getMyOffers(),
//       getApplicantOffers(),
//     ]);

//     const allOffers = [...myOffers, ...applicantOffers];

//     setOffers(allOffers);
//   } catch (error: any) {
//     console.error("Failed to load offers:", error);
//     setError(error.message || "Failed to load offers");
//   } finally {
//     setLoading(false);
//   }
// };

//   const groupedOffers = Object.values(
//     offers.reduce<Record<number, ConversationOffer>>((groups, offer) => {
//       const conversationId = offer.conversation_id;

//       if (!groups[conversationId]) {
//         groups[conversationId] = {
//           conversation_id: conversationId,
//           task_id: offer.task_id,
//           employer_id: offer.employer_id,
//           applicant_id: offer.applicant_id,
//           username: offer.username,
//           avatar: offer.avatar,
//           offers: [],
//           latestOffer: offer,
//         };
//       }

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
//     } catch (error: any) {
//       console.error("Failed to load messages:", error);

//       setError(error?.message || "Failed to load conversation");
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
//   // LOADING
//   // --------------------------------------------------

//   if (loading) {
//     return (
//       <div className="flex min-h-[400px] items-center justify-center">
//         <Loader2 className="h-6 w-6 animate-spin" />
//       </div>
//     );
//   }

//   // --------------------------------------------------
//   // CONVERSATION VIEW
//   // --------------------------------------------------

//   {
//     selectedConversation && (
//       <div className="flex h-full min-h-[600px] flex-col overflow-hidden rounded-2xl border border-black/10 bg-white">
//         {/* Header */}
//         <div className="flex items-center gap-4 border-b border-black/10 px-5 py-4">
//           <button
//             onClick={handleBack}
//             className="
//           flex
//           h-9
//           w-9
//           cursor-pointer
//           items-center
//           justify-center
//           rounded-full
//           border
//           border-black/10
//           transition
//           hover:bg-black/5
//         "
//           >
//             <ArrowLeft className="h-4 w-4" />
//           </button>

//           {/* Avatar */}
//           <div
//             className="
//         flex
//         h-10
//         w-10
//         shrink-0
//         items-center
//         justify-center
//         overflow-hidden
//         rounded-full
//         bg-[#e8e3d5]
//       "
//           >
//             {selectedConversation.avatar ? (
//               <img
//                 src={selectedConversation.avatar}
//                 alt={selectedConversation.username}
//                 className="h-full w-full object-cover"
//               />
//             ) : (
//               <User className="h-4 w-4" />
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

//         {/* Messages */}
//         <div className="flex-1 space-y-4 overflow-y-auto bg-[#fafafa] p-5">
//           {messageLoading ? (
//             <div className="flex h-full items-center justify-center">
//               <Loader2 className="h-5 w-5 animate-spin" />
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
//                     className={`
//                   max-w-[75%]
//                   rounded-2xl
//                   px-4
//                   py-3
//                   text-sm
//                   ${
//                     isMine
//                       ? "rounded-br-md bg-black text-white"
//                       : "rounded-bl-md bg-[#e8e3d5] text-black"
//                   }
//                 `}
//                   >
//                     <p>{message.content}</p>

//                     <p
//                       className={`
//                     mt-1.5 text-[10px]
//                     ${isMine ? "text-white/50" : "text-black/40"}
//                   `}
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

//   // --------------------------------------------------
//   // OFFERS LIST
//   // --------------------------------------------------

// //   ```tsx
// return (
//   <div className="mx-auto w-full max-w-4xl">
//     {/* Header */}
//     <div className="mb-6">
//       <h1 className="text-2xl font-black tracking-tight">
//         Negotiations
//       </h1>

//       <p className="mt-1 text-sm text-black/50">
//         View your task negotiations, offers, and conversations.
//       </p>
//     </div>

//     {error && (
//       <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600">
//         {error}
//       </div>
//     )}

//     {/* Empty */}
//     {groupedOffers.length === 0 ? (
//       <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 bg-white text-center">
//         <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#e8e3d5]">
//           <MessageCircle className="h-5 w-5" />
//         </div>

//         <h3 className="text-sm font-bold">
//           No negotiations yet
//         </h3>

//         <p className="mt-1 max-w-sm text-xs leading-5 text-black/40">
//           Your task negotiations and applicant offers will
//           appear here when a negotiation starts.
//         </p>
//       </div>
//     ) : (
//       <div className="space-y-3">
//         {groupedOffers.map((conversation) => {
//           const latestOffer = conversation.latestOffer;

//           return (
//             <button
//               key={conversation.conversation_id}
//               onClick={() =>
//                 handleOpenConversation(conversation)
//               }
//               className="
//                 group
//                 flex
//                 w-full
//                 cursor-pointer
//                 items-center
//                 gap-4
//                 rounded-2xl
//                 border
//                 border-black/10
//                 bg-white
//                 p-4
//                 text-left
//                 transition
//                 hover:-translate-y-[1px]
//                 hover:border-black/20
//                 hover:shadow-sm
//               "
//             >
//               {/* Avatar */}
//               <div
//                 className="
//                   flex
//                   h-12
//                   w-12
//                   shrink-0
//                   items-center
//                   justify-center
//                   overflow-hidden
//                   rounded-full
//                   bg-[#e8e3d5]
//                 "
//               >
//                 {conversation.avatar ? (
//                   <img
//                     src={conversation.avatar}
//                     alt={conversation.username}
//                     className="h-full w-full object-cover"
//                   />
//                 ) : (
//                   <User className="h-5 w-5" />
//                 )}
//               </div>

//               {/* Main */}
//               <div className="min-w-0 flex-1">
//                 <div className="flex items-center gap-2">
//                   <h3 className="truncate text-sm font-bold">
//                     {conversation.username}
//                   </h3>

//                   <span
//                     className="
//                       rounded-full
//                       bg-black/5
//                       px-2
//                       py-0.5
//                       text-[10px]
//                       font-semibold
//                       text-black/50
//                     "
//                   >
//                     {conversation.offers.length}{" "}
//                     {conversation.offers.length === 1
//                       ? "offer"
//                       : "offers"}
//                   </span>
//                 </div>

//                 <p className="mt-1 text-xs text-black/45">
//                   Task #{conversation.task_id}
//                 </p>

//                 <div className="mt-2 flex items-center gap-2">
//                   <Clock3 className="h-3 w-3 text-black/30" />

//                   <span className="text-[11px] text-black/40">
//                     {new Date(
//                       latestOffer.created_at,
//                     ).toLocaleString()}
//                   </span>
//                 </div>
//               </div>

//               {/* Latest Offer */}
//               <div className="hidden shrink-0 text-right sm:block">
//                 <p className="text-[10px] font-medium text-black/35">
//                   LATEST OFFER
//                 </p>

//                 <p className="mt-1 text-sm font-black">
//                   ${latestOffer.amount}
//                 </p>

//                 <p className="mt-1 text-[10px] capitalize text-black/40">
//                   {latestOffer.status || "pending"}
//                 </p>
//               </div>

//               {/* Open Conversation */}
//               <MessageCircle
//                 className="
//                   h-4
//                   w-4
//                   shrink-0
//                   text-black/25
//                   transition
//                   group-hover:text-black
//                 "
//               />
//             </button>
//           );
//         })}
//       </div>
//     )}
//   </div>
// );
// // ```;

// }

import { useEffect, useState } from "react";
import { MessageCircle, ArrowLeft, Clock3, User, Loader2 } from "lucide-react";
import type { Offer } from "../../Types/negotiation";
import {
  getApplicantOffers,
  getMyOffers,
  getConversationMessages,
} from "../../Servives/negotiationApi";

// --------------------------------------------------
// TYPES
// --------------------------------------------------

type ConversationOffer = {
  conversation_id: number;
  task_id: number;
  employer_id: number;
  applicant_id: number;
  username: string;
  avatar: string;
  offers: Offer[];
  latestOffer: Offer;
};

type Message = {
  message_id: number;
  conversation_id: number;
  sender_id: number;
  content: string;
  created_at: string;
};

type OffersProps = {
  currentUserId: number;
};

// --------------------------------------------------
// COMPONENT
// --------------------------------------------------

export default function OffersList({ currentUserId }: OffersProps) {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationOffer | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const [loading, setLoading] = useState(true);
  const [messageLoading, setMessageLoading] = useState(false);
  const [error, setError] = useState("");

  // --------------------------------------------------
  // LOAD OFFERS
  // --------------------------------------------------

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    try {
      setLoading(true);
      setError("");

      const [myOffers, applicantOffers] = await Promise.all([
        getMyOffers(),
        getApplicantOffers(),
      ]);

      setOffers([...myOffers, ...applicantOffers]);
    } catch (err: unknown) {
      console.error("Failed to load offers:", err);
      setError(err instanceof Error ? err.message : "Failed to load offers");
    } finally {
      setLoading(false);
    }
  };

  const groupedOffers = Object.values(
    offers.reduce<Record<number, ConversationOffer>>((groups, offer) => {
      const conversationId = offer.conversation_id;

     if (!groups[conversationId]) {
       groups[conversationId] = {
         conversation_id: conversationId,
         task_id: offer.task_id,
         employer_id: offer.employer_id,
         applicant_id: offer.applicant_id,
         username: offer.username ?? "",
         avatar: offer.avatar ?? "",
         offers: [],
         latestOffer: offer,
       };
     }

      groups[conversationId].offers.push(offer);

      if (
        new Date(offer.created_at) >
        new Date(groups[conversationId].latestOffer.created_at)
      ) {
        groups[conversationId].latestOffer = offer;
      }

      return groups;
    }, {}),
  );

  // --------------------------------------------------
  // OPEN CONVERSATION
  // --------------------------------------------------

  async function handleOpenConversation(conversation: ConversationOffer) {
    try {
      setSelectedConversation(conversation);
      setMessageLoading(true);
      setError("");

      const data = await getConversationMessages(conversation.conversation_id);
      setMessages(data);
    } catch (err: unknown) {
      console.error("Failed to load messages:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load conversation",
      );
    } finally {
      setMessageLoading(false);
    }
  }

  // --------------------------------------------------
  // BACK TO OFFERS
  // --------------------------------------------------

  function handleBack() {
    setSelectedConversation(null);
    setMessages([]);
    setError("");
  }

  // --------------------------------------------------
  // LOADING STATE
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-black/50" />
      </div>
    );
  }

  // --------------------------------------------------
  // CONVERSATION VIEW
  // --------------------------------------------------

  if (selectedConversation) {
    return (
      <div className="flex h-full min-h-[600px] flex-col overflow-hidden rounded-2xl border border-black/10 bg-white">
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-black/10 px-5 py-4">
          <button
            onClick={handleBack}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-black/10 transition hover:bg-black/5"
            aria-label="Go back to offers list"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          {/* Avatar */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e8e3d5]">
            {selectedConversation.avatar ? (
              <img
                src={selectedConversation.avatar}
                alt={selectedConversation.username}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-4 w-4 text-black/60" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-sm font-bold">
              {selectedConversation.username}
            </h2>
            <p className="mt-0.5 text-xs text-black/50">
              Task #{selectedConversation.task_id}
            </p>
          </div>

          {/* Latest offer */}
          <div className="text-right">
            <p className="text-[10px] font-medium text-black/40">
              LATEST OFFER
            </p>
            <p className="mt-1 text-sm font-black">
              ${selectedConversation.latestOffer.amount}
            </p>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 space-y-4 overflow-y-auto bg-[#fafafa] p-5">
          {messageLoading ? (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-black/50" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <MessageCircle className="mb-3 h-8 w-8 text-black/20" />
              <p className="text-sm font-semibold">No messages yet</p>
              <p className="mt-1 text-xs text-black/40">
                Start the negotiation from this conversation.
              </p>
            </div>
          ) : (
            messages.map((message) => {
              const isMine = message.sender_id === currentUserId;

              return (
                <div
                  key={message.message_id}
                  className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
                      isMine
                        ? "rounded-br-md bg-black text-white"
                        : "rounded-bl-md bg-[#e8e3d5] text-black"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p
                      className={`mt-1.5 text-[10px] ${
                        isMine ? "text-white/50" : "text-black/40"
                      }`}
                    >
                      {new Date(message.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // OFFERS LIST VIEW
  // --------------------------------------------------

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight">Negotiations</h1>
        <p className="mt-1 text-sm text-black/50">
          View your task negotiations, offers, and conversations.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600">
          {error}
        </div>
      )}

      {/* Empty State */}
      {groupedOffers.length === 0 ? (
        <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 bg-white text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#e8e3d5]">
            <MessageCircle className="h-5 w-5 text-black/70" />
          </div>
          <h3 className="text-sm font-bold">No negotiations yet</h3>
          <p className="mt-1 max-w-sm text-xs leading-5 text-black/40">
            Your task negotiations and applicant offers will appear here when a
            negotiation starts.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {groupedOffers.map((conversation) => {
            const latestOffer = conversation.latestOffer;

            return (
              <button
                key={conversation.conversation_id}
                onClick={() => handleOpenConversation(conversation)}
                className="group flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-black/10 bg-white p-4 text-left transition hover:-translate-y-[1px] hover:border-black/20 hover:shadow-sm"
              >
                {/* Avatar */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e8e3d5]">
                  {conversation.avatar ? (
                    <img
                      src={conversation.avatar}
                      alt={conversation.username}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5 text-black/60" />
                  )}
                </div>

                {/* Main */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-sm font-bold">
                      {conversation.username}
                    </h3>
                    <span className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-semibold text-black/50">
                      {conversation.offers.length}{" "}
                      {conversation.offers.length === 1 ? "offer" : "offers"}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-black/45">
                    Task #{conversation.task_id}
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <Clock3 className="h-3 w-3 text-black/30" />
                    <span className="text-[11px] text-black/40">
                      {new Date(latestOffer.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Latest Offer Details */}
                <div className="hidden shrink-0 text-right sm:block">
                  <p className="text-[10px] font-medium text-black/35">
                    LATEST OFFER
                  </p>
                  <p className="mt-1 text-sm font-black">
                    ${latestOffer.amount}
                  </p>
                  <p className="mt-1 text-[10px] capitalize text-black/40">
                    {latestOffer.status || "pending"}
                  </p>
                </div>

                {/* Action Icon */}
                <MessageCircle className="h-4 w-4 shrink-0 text-black/25 transition group-hover:text-black" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}