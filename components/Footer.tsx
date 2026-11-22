import Link from "next/link";
import {
  FiClock,
  FiMail,
  FiMapPin,
  FiPhone,
  FiScissors,
} from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Browse Services" },
  { href: "/sign-in", label: "Sign In" },
  { href: "/sign-up", label: "Sign Up" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

const socialLinks = [
  { href: "https://facebook.com", label: "Facebook", icon: FaFacebookF },
  { href: "https://instagram.com", label: "Instagram", icon: FaInstagram },
  { href: "https://youtube.com", label: "YouTube", icon: FaYoutube },
];

export default function Footer() {
  return (
    <footer className="border-t border-rose-100 bg-stone-900 text-stone-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
            <FiScissors className="text-rose-400" />
            SalonBook
          </Link>
          <p className="mt-3 text-sm leading-relaxed">
            Book your favourite salon services online. Choose a service, pick a
            time slot and pay securely after confirmation.
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-rose-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-white">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <FiMapPin className="mt-0.5 shrink-0 text-rose-400" />
              House 12, Road 5, Dhanmondi, Dhaka
            </li>
            <li className="flex items-center gap-2">
              <FiPhone className="shrink-0 text-rose-400" />
              +880 1700-000000
            </li>
            <li className="flex items-center gap-2">
              <FiMail className="shrink-0 text-rose-400" />
              hello@salonbook.com
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-white">Opening Hours</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FiClock className="shrink-0 text-rose-400" />
              Sat - Thu: 10:00 AM - 8:00 PM
            </li>
            <li className="pl-6">Friday: 3:00 PM - 9:00 PM</li>
          </ul>

          <div className="mt-5 flex gap-3">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-800 hover:bg-rose-600"