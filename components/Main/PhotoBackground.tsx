const MyPhotoString = `export default function MyPhoto(
  props: { src?: string }
) {
  const { src } = props ?? { src: "/images/me.png" };
  
  return (
    <Image src={src} alt="Photo of me" />
  );
}`;

const patterns = [
  { type: "tagBracket", regex: /^([<>]|[/>])/, color: "#FFE49B" },
  {
    type: "keyword",
    regex: /^\b(function|return|const|export|default)\b/,
    color: "#569CD6",
  },
  { type: "function", regex: /^function\s+([a-zA-Z0-9_]+)/, color: "#DCDCAA" },
  { type: "type", regex: /^:\s*([A-Z][a-zA-Z0-9_]*)/, color: "#4EC9B0" },
  { type: "string", regex: /^(['"`])(.*?)\1/, color: "#CE9178" },
  { type: "prop", regex: /^(props|src|alt)/, color: "#9CDCFE" },
  { type: "brace", regex: /^[{}()]/, color: "#DDDDDD" },
  { type: "identifier", regex: /^[a-zA-Z0-9_]+/, color: "#FFE49B" },
];

export default function PhotoBackground({ className }: { className?: string }) {
  let remaining = MyPhotoString;
  const contentTags = [];

  while (remaining.length > 0) {
    let matched = false;

    for (const { type, regex, color } of patterns) {
      const match = remaining.match(regex);
      if (match) {
        contentTags.push(
          <span key={`${type}-${remaining.length}`} style={{ color }}>
            {match[0]}
          </span>,
        );
        remaining = remaining.substring(match[0].length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      contentTags.push(remaining[0]);
      remaining = remaining.substring(1);
    }
  }

  return (
    <code className={className}>
      <pre className="font-mono text-sm p-4 bg-[rgba(0,0,0,0.2)] rounded-4xl text-xl whitespace-pre-wrap h-full">
        {contentTags}
      </pre>
    </code>
  );
}
