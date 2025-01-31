interface TextColorAnimProps {
  className?: string;
  text: string;
}
export default function TextColorAnim({ className, text }: TextColorAnimProps) {
  return <h1 className={className}>{text}</h1>;
}
