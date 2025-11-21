import { useUser } from "@/context/UserContext";
import { getPersonalizedGreeting } from "@/lib/greetings";
import { useState, useEffect } from "react";

export const PersonalizedGreeting = () => {
  const { user } = useUser();
  const [greeting, setGreeting] = useState(() => getPersonalizedGreeting(user.name));

  useEffect(() => {
    setGreeting(getPersonalizedGreeting(user.name));
    
    const interval = setInterval(() => {
      setGreeting(getPersonalizedGreeting(user.name));
    }, 60000);

    return () => clearInterval(interval);
  }, [user.name]);

  return (
    <div className="absolute right-6 top-1/2 -translate-y-1/2 animate-in fade-in slide-in-from-right-4 duration-500">
      <p className="text-brand-burgundy/70 text-sm font-normal tracking-wide">
        {greeting}
      </p>
    </div>
  );
};
