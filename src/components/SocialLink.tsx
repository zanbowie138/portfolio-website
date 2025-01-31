export default function SocialLink({
  link,
  text,
  icon,
}: {
  link: string;
  text: string;
  icon: any;
}) {
  return (
    <div className="flex items-center gap-2 text-xl">
      {icon} 
      <a href={link} className="text-blue-400 underline">
        {text}
      </a>
    </div>
  );
}
