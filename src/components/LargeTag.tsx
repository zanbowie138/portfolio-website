export default function LargeTag({ text }: { text: string }) {
  return (
    <div className="bg-slate-800 text-neutral-200 rounded-md px-2 py-1 text-sm font-semibold transform transition-transform duration-200 hover:scale-105 hover:shadow-md select-none">
      {text}
    </div>
  );
}
