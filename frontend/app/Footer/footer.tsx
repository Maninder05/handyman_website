import Link from "next/link";
import { FiHome, FiMessageCircle, FiHelpCircle, FiBell, FiSettings } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-cyan-500 py-4 mt-auto">
      <div className="flex justify-around items-center text-neutral-900 text-sm font-medium">
        <Link href="/" className="flex flex-col items-center gap-1">
          <FiHome size={20} /> Home
        </Link>
        <Link href="/messages" className="flex flex-col items-center gap-1">
          <FiMessageCircle size={20} /> Messages
        </Link>
        <Link href="/help" className="flex flex-col items-center gap-1">
          <FiHelpCircle size={20} /> Help
        </Link>
        <Link href="/notifications" className="flex flex-col items-center gap-1">
          <FiBell size={20} /> Notifications
        </Link>
        <Link href="/settings" className="flex flex-col items-center gap-1">
          <FiSettings size={20} /> Settings
        </Link>
      </div>
    </footer>
  );
}
