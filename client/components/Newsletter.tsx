import { Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Successfully subscribed!",
      description: "Thank you for joining our newsletter.",
    });
    
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <div className="bg-gradient-to-br from-brand-pink-light to-white border border-brand-pink/20 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-brand-pink/10 flex items-center justify-center">
          <Mail className="w-6 h-6 stroke-brand-pink" strokeWidth={1.67} />
        </div>
        <div>
          <h3 className="text-gray-dark text-base font-medium">Stay Updated</h3>
          <p className="text-gray-medium text-sm">Get exclusive offers & news</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 rounded-full border border-gray-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-pink/20"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-brand-pink text-white rounded-full text-sm font-medium hover:bg-brand-burgundy transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {isSubmitting ? "..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
}
