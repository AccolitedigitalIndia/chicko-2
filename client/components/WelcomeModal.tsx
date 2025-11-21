import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { Sparkles } from "lucide-react";

export const WelcomeModal = () => {
  const { user, updateUserName, isNewUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (isNewUser && !user.name) {
      const timer = setTimeout(() => setIsOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isNewUser, user.name]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      updateUserName(name.trim());
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 relative animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">

        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 bg-brand-pink-light rounded-full flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 stroke-brand-pink" />
          </div>
          <h2 className="text-gray-dark text-2xl font-semibold mb-2">
            Welcome to LUMIÈRE
          </h2>
          <p className="text-gray-medium text-sm">
            Let's personalize your experience. What should we call you?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="sr-only">
              Your name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-full border border-gray-border bg-white text-base focus:outline-none focus:ring-2 focus:ring-brand-pink/20 transition-all"
              autoFocus
              maxLength={50}
            />
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full px-6 py-3 bg-brand-pink text-white rounded-full text-base font-medium hover:bg-brand-burgundy transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-98"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};
