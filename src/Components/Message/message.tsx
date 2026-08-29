import type { Message } from "../../Types/negotiation";

interface MessageBubbleProps {
  message: Message;
  currentUserId: number;
}

export function MessageBubble({ message, currentUserId }: MessageBubbleProps) {
  const mine = message.sender_id === currentUserId;

  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-[70%]
          rounded-2xl
          px-4
          py-3
          text-sm
          ${mine ? "bg-black text-white" : "bg-gray-100 text-black"}
        `}
      >
        <p>{message.content}</p>

        <span
          className={`
            mt-1 block text-[10px]
            ${mine ? "text-gray-300" : "text-gray-500"}
          `}
        >
          {new Date(message.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}
