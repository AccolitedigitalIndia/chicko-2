import { BottomNav } from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MessageCircle,
  FileText,
} from "lucide-react";

export default function Help() {
  const navigate = useNavigate();

  const faqCategories = [
    {
      icon: (
        <Package className="w-6 h-6 stroke-gray-medium" strokeWidth={1.67} />
      ),
      title: "Orders & Shipping",
      description: "Track orders, shipping info",
    },
    {
      icon: (
        <FileText className="w-6 h-6 stroke-gray-medium" strokeWidth={1.67} />
      ),
      title: "Returns & Refunds",
      description: "Return policy, refund status",
    },
    {
      icon: (
        <CreditCard className="w-6 h-6 stroke-gray-medium" strokeWidth={1.67} />
      ),
      title: "Payment & Billing",
      description: "Payment methods, invoices",
    },
    {
      icon: <User className="w-6 h-6 stroke-gray-medium" strokeWidth={1.67} />,
      title: "Account & Profile",
      description: "Manage your account",
    },
  ];

  const contactOptions = [
    {
      icon: (
        <MessageCircle
          className="w-6 h-6 stroke-brand-pink"
          strokeWidth={1.67}
        />
      ),
      title: "Live Chat",
      description: "Available 24/7",
      action: "Start Chat",
    },
    {
      icon: <Mail className="w-6 h-6 stroke-brand-pink" strokeWidth={1.67} />,
      title: "Email Support",
      description: "support@fashionapp.com",
      action: "Send Email",
    },
    {
      icon: <Phone className="w-6 h-6 stroke-brand-pink" strokeWidth={1.67} />,
      title: "Phone Support",
      description: "1-800-FASHION",
      action: "Call Now",
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="px-6 pt-14 pb-4 border-b border-gray-border flex items-center gap-4">
        <button
          onClick={() => navigate("/profile")}
          className="w-10 h-10 flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6 stroke-gray-dark" strokeWidth={2} />
        </button>
        <h2 className="text-gray-dark text-base font-normal tracking-[-0.312px]">
          Help & Support
        </h2>
      </div>

      <div className="px-6 pt-6 pb-8 flex flex-col gap-6">
        <div>
          <h3 className="text-gray-dark text-base font-normal tracking-[-0.312px] mb-4">
            How can we help you?
          </h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full px-4 py-3 pr-10 border-2 border-gray-border rounded-[10px] text-gray-dark text-base font-normal tracking-[-0.312px] focus:outline-none focus:border-brand-pink"
            />
            <Search
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 stroke-gray-light"
              strokeWidth={2}
            />
          </div>
        </div>

        <div className="border-t border-gray-border pt-6">
          <h3 className="text-gray-dark text-base font-normal tracking-[-0.312px] mb-4">
            Popular Topics
          </h3>
          <div className="flex flex-col gap-2">
            {faqCategories.map((category, index) => (
              <button
                key={index}
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#F9FAFB]"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  {category.icon}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-gray-dark text-base font-normal tracking-[-0.312px]">
                    {category.title}
                  </p>
                  <p className="text-[#6A7282] text-sm tracking-[-0.15px]">
                    {category.description}
                  </p>
                </div>
                <ChevronRight
                  className="w-5 h-5 stroke-gray-light"
                  strokeWidth={1.67}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-border pt-6">
          <h3 className="text-gray-dark text-base font-normal tracking-[-0.312px] mb-4">
            Contact Us
          </h3>
          <div className="flex flex-col gap-3">
            {contactOptions.map((option, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#F9FAFB]"
              >
                <div className="w-12 h-12 rounded-full bg-brand-pink-light flex items-center justify-center flex-shrink-0">
                  {option.icon}
                </div>
                <div className="flex-1">
                  <p className="text-gray-dark text-base font-normal tracking-[-0.312px]">
                    {option.title}
                  </p>
                  <p className="text-[#6A7282] text-sm tracking-[-0.15px]">
                    {option.description}
                  </p>
                </div>
                <button className="px-4 py-2 rounded-full bg-brand-pink text-white text-sm font-normal tracking-[-0.15px]">
                  {option.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-border pt-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-pink to-[#C70036]">
            <p className="text-white text-base font-normal tracking-[-0.312px] mb-2">
              Need immediate assistance?
            </p>
            <p className="text-[#FFE4E6] text-sm tracking-[-0.15px] mb-4">
              Our support team is ready to help you 24/7
            </p>
            <button className="px-6 py-3 rounded-full bg-white text-brand-pink text-base font-normal tracking-[-0.312px]">
              Contact Support
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function Package(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5 9.4L7.5 4.21M21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z"
        stroke="currentColor"
        strokeWidth="inherit"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.27002 6.96L12 12.01L20.73 6.96M12 22.08V12"
        stroke="currentColor"
        strokeWidth="inherit"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CreditCard(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z"
        stroke="currentColor"
        strokeWidth="inherit"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 10H23"
        stroke="currentColor"
        strokeWidth="inherit"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function User(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
        stroke="currentColor"
        strokeWidth="inherit"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Search(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
        stroke="currentColor"
        strokeWidth="inherit"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 21L16.65 16.65"
        stroke="currentColor"
        strokeWidth="inherit"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
