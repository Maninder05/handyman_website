"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface SideMenuProps {
  isOpen: boolean; //control if the menu is visible
  onClose: () => void;
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Background overlay */}
          <motion.div
            className="flex-1"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer ss*/}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="w-64 bg-white h-full shadow-lg p-6 fixed right-0 top-0 z-50"
          >
            <h2 className="text-lg font-bold mb-6">Menu</h2>
            <ul className="space-y-4">
              <li>
                <Link href="/view-services" onClick={onClose}>
                  View Services
                </Link>
              </li>
              <li>
                <Link href="/book-services" onClick={onClose}>
                  Book Services
                </Link>
              </li>
              <li>
                <Link href="/account" onClick={onClose}>
                  Track Orders
                </Link>
              </li>
              <li>
                <Link href="/membership" onClick={onClose}>
                  Membership Plan
                </Link>
              </li>
              <li>
                <Link href="/faqs" onClick={onClose}>
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/settings" onClick={onClose}>
                  Account Settings
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
