export interface ServiceMetrics {
  returnPolicy: string;
  returnSuccessRate: number;
  deliveryRating: number;
  customerSupportScore: number;
  sellerResponseTime: string;
  sarcasticServiceVerdict: string;
}

export interface ProductReview {
  slug: string;
  productName: string;
  brand: string;
  category: string;
  images: {
    official: string[];
    review: string[];
  };
  sellerRating: number;
  realityScore: number;
  totalReviews: number;
  fakeReviewPercent: number;
  price: string;
  source: "amazon.in" | "flipkart" | "both";
  sarcasticVerdict: string;
  whatTheySay: string;
  whatTheyMean: string;
  serviceMetrics: ServiceMetrics;
  aiAnalysis: {
    sentimentBreakdown: {
      genuine: number;
      suspicious: number;
      copypasta: number;
      bribed: number;
    };
    topSarcasticInsight: string;
    realPros: string[];
    realCons: string[];
    buyOrCry: "buy" | "cry" | "maybe";
  };
  reviews: {
    author: string;
    rating: number;
    text: string;
    sarcasticTranslation: string;
    flagged: "genuine" | "suspicious" | "copypasta" | "bribed";
  }[];
}

export type BuyOrCry = ProductReview["aiAnalysis"]["buyOrCry"];
