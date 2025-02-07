export default function StringRender({ text, className }: { text: string, className?: string }) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: text }} />
}
