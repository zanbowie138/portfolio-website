import React from "react";

export default function Tag({ text }: { text: string }) {
  return (
    <div className="bg-slate-700 text-white rounded-2xl px-2 py-[2px] text-xs">
      {text}
    </div>
  );
}
