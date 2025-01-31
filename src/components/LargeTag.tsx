export default function LargeTag({ text }: { text: string }) {
  return (
    <div className="bg-slate-800 text-white rounded-md px-2 py-1 text-sm font-semibold">
      {text}
    </div>
  );
}
