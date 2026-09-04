// ```tsx
import type { Offer } from "../../Types/negotiation";

interface OfferCardProps {
  offer: Offer;
  currentUserId: number;
  onAccept: (offer: Offer) => void;
  onReject: (offer: Offer) => void;
}

export function OfferCard({
  offer,
  currentUserId,
  onAccept,
  onReject,
}: OfferCardProps) {
  const isReceiver = Number(offer.created_by) !== Number(currentUserId);

  return (
    <div className="my-3 flex w-full justify-center px-2 sm:px-4">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-gray-500 sm:text-xs">
            Offer
          </span>

          <span
            className={`max-w-[55%] truncate rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize sm:text-xs ${
              offer.status === "pending"
                ? "bg-amber-50 text-amber-600"
                : offer.status === "accepted"
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600"
            }`}
          >
            {offer.status}
          </span>
        </div>

        {/* Amount */}
        <div className="mt-4">
          <p className="break-all text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
            ${offer.amount}
          </p>
        </div>

        {/* Message */}
        {offer.message && (
          <div className="mt-3 rounded-xl bg-gray-50 p-3 sm:p-3.5">
            <p className="break-words text-xs leading-5 text-gray-600 sm:text-sm">
              {offer.message}
            </p>
          </div>
        )}

        {/* Receiver Actions */}
        {offer.status === "pending" && isReceiver && (
          <div className="mt-4 grid grid-cols-1 gap-2 sm:mt-5 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => onReject(offer)}
              className="min-h-11 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-[0.98]"
            >
              Reject
            </button>

            <button
              type="button"
              onClick={() => onAccept(offer)}
              className="min-h-11 w-full rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
            >
              Accept
            </button>
          </div>
        )}

        {/* Sender Waiting */}
        {offer.status === "pending" && !isReceiver && (
          <div className="mt-4 flex items-center justify-center rounded-xl bg-gray-50 px-3 py-3">
            <p className="text-center text-xs font-medium text-gray-500">
              Waiting for response
            </p>
          </div>
        )}

        {/* Accepted */}
        {offer.status === "accepted" && (
          <div className="mt-4 flex items-center justify-center rounded-xl bg-green-50 px-3 py-3">
            <p className="text-center text-xs font-semibold text-green-700 sm:text-sm">
              ✓ Offer accepted
            </p>
          </div>
        )}

        {/* Rejected */}
        {offer.status === "rejected" && (
          <div className="mt-4 flex items-center justify-center rounded-xl bg-red-50 px-3 py-3">
            <p className="text-center text-xs font-medium text-red-600 sm:text-sm">
              Offer rejected
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
// ```
