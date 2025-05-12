export default function Tag({ text }: { text: string }) {
  return (
    <div className="bg-slate-700 text-neutral-200 rounded-md px-2 py-[2px] text-xs font-semibold">
      {text}
    </div>
  );
}
