import { useUser } from "@/context/UserContext";
import { getPersonalizedGreeting } from "@/lib/greetings";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

  if (!user.name) {
    return (
      <Link
        to="/profile"
        className="absolute right-6 top-1/2 -translate-y-1/2 animate-in fade-in slide-in-from-right-4 duration-500 group"
      >
        <p className="text-brand-burgundy/70 text-sm font-normal tracking-wide group-hover:text-brand-burgundy transition-colors">
          {greeting} · <span className="underline">Add your name</span>
        </p>
      </Link>
    );
  }

  return (
    <div className="absolute right-6 top-1/2 -translate-y-1/2 animate-in fade-in slide-in-from-right-4 duration-500">
      <p className="text-brand-burgundy/70 text-sm font-normal tracking-wide">
        {greeting}
      </p>
    </div>
  );
};
