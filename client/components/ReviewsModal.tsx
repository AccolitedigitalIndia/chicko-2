import { X, Star } from "lucide-react";
import { useEffect } from "react";

interface Review {
  id: number;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  averageRating: number;
  totalReviews: number;
}

const reviews: Review[] = [
  {
    id: 1,
    userName: "Sarah M.",
    rating: 5,
    date: "2 days ago",
    comment:
      "Absolutely love this! The quality is exceptional and fits perfectly. Will definitely buy again.",
    verified: true,
  },
  {
    id: 2,
    userName: "Emily R.",
    rating: 5,
    date: "1 week ago",
    comment:
      "Beautiful piece! The fabric is so soft and the color is exactly as shown. Highly recommend!",
    verified: true,
  },
  {
    id: 3,
    userName: "Jessica L.",
    rating: 4,
    date: "2 weeks ago",
    comment:
      "Great quality and fast shipping. Runs slightly small so I'd recommend sizing up.",
    verified: true,
  },
  {
    id: 4,
    userName: "Amanda K.",
    rating: 5,
    date: "3 weeks ago",
    comment:
      "This exceeded my expectations! So elegant and comfortable. Perfect for any occasion.",
    verified: false,
  },
  {
    id: 5,
    userName: "Rachel P.",
    rating: 4,
    date: "1 month ago",
    comment:
      "Very nice quality. The only reason I'm giving 4 stars is because it took a bit longer to arrive than expected.",
    verified: true,
  },
  {
    id: 6,
    userName: "Michelle S.",
    rating: 5,
    date: "1 month ago",
    comment: "Stunning! I've received so many compliments. Worth every penny.",
    verified: true,
  },
  {
    id: 7,
    userName: "Lauren T.",
    rating: 5,
    date: "2 months ago",
    comment:
      "Perfect fit and beautiful design. This is my third purchase from this brand!",
    verified: true,
  },
  {
    id: 8,
    userName: "Olivia H.",
    rating: 4,
    date: "2 months ago",
    comment: "Really happy with this purchase. Good quality for the price.",
    verified: false,
  },
];

export default function ReviewsModal({
  isOpen,
  onClose,
  productName,
  averageRating,
  totalReviews,
}: ReviewsModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const ratingDistribution = [
    { stars: 5, count: Math.floor(totalReviews * 0.7) },
    { stars: 4, count: Math.floor(totalReviews * 0.2) },
    { stars: 3, count: Math.floor(totalReviews * 0.05) },
    { stars: 2, count: Math.floor(totalReviews * 0.03) },
    { stars: 1, count: Math.floor(totalReviews * 0.02) },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-border px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-gray-dark text-lg font-normal tracking-[-0.312px]">
            Reviews
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6 stroke-gray-dark" strokeWidth={2} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-6">
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-center">
                <p className="text-4xl font-normal text-gray-dark mb-1">
                  {averageRating.toFixed(1)}
                </p>
                <div className="flex gap-0.5 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4"
                      fill={
                        star <= Math.floor(averageRating) ? "#FFB900" : "none"
                      }
                      stroke="#FFB900"
                      strokeWidth={1.33}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-medium">
                  {totalReviews} reviews
                </p>
              </div>

              <div className="flex-1 flex flex-col gap-2">
                {ratingDistribution.map(({ stars, count }) => (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="text-sm text-gray-medium w-4">
                      {stars}
                    </span>
                    <Star
                      className="w-3 h-3 fill-[#FFB900] stroke-[#FFB900]"
                      strokeWidth={1.33}
                    />
                    <div className="flex-1 h-2 bg-gray-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FFB900]"
                        style={{ width: `${(count / totalReviews) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-medium w-8 text-right">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="pb-4 border-b border-gray-border last:border-0"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-gray-dark text-base font-normal tracking-[-0.312px]">
                        {review.userName}
                      </p>
                      {review.verified && (
                        <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-xs">
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4"
                          fill={star <= review.rating ? "#FFB900" : "none"}
                          stroke="#FFB900"
                          strokeWidth={1.33}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-light">{review.date}</span>
                </div>
                <p className="text-gray-medium text-sm leading-5 tracking-[-0.15px]">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
