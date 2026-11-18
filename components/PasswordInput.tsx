"use client";

import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
};

export default function PasswordInput({
  value,
  onChange,
  placeholder = "Password",
  id,
}: Props) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
        className="w-full rounded-lg border border-stone-300 px-4 py-2.5 pr-11 text-sm outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute inset-y-0 right-3 text-stone-500 hover:text-stone-700"
      >
        {show ? <FiEyeOff /> : <FiEye />}
      </button>
    </div>
  );
}