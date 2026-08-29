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
  const isReceiver = offer.created_by !== currentUserId;
  return (
    <div className="my-3 flex justify-center">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase text-gray-500">
            Offer
          </span>

          <span className="text-xs capitalize text-gray-500">
            {offer.status}
          </span>
        </div>

        <div className="mt-3">
          <p className="text-3xl font-bold">${offer.amount}</p>
        </div>

        {offer.message && (
          <p className="mt-3 text-sm text-gray-600">{offer.message}</p>
        )}

        {offer.status === "pending" && isReceiver && (
          <div className="mt-5 flex gap-2">
            <button
              onClick={() => onReject(offer)}
              className="flex-1 rounded-xl border px-4 py-3 text-sm font-medium"
            >
              Reject
            </button>

            <button
              onClick={() => onAccept(offer)}
              className="flex-1 rounded-xl bg-black px-4 py-3 text-sm font-medium text-white"
            >
              Accept
            </button>
          </div>
        )}

        {offer.status === "pending" && !isReceiver && (
          <p className="mt-4 text-center text-xs text-gray-500">
            Waiting for response
          </p>
        )}

        {offer.status === "accepted" && (
          <div className="mt-4 rounded-lg bg-gray-100 p-3 text-center text-sm font-medium">
            Offer accepted
          </div>
        )}

        {offer.status === "rejected" && (
          <div className="mt-4 rounded-lg bg-gray-100 p-3 text-center text-sm">
            Offer rejected
          </div>
        )}
      </div>
    </div>
  );
}
