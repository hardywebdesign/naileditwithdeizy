/**
 * Sets a headline with everything after its first comma in italic, the
 * way a stylist would letter it: "Hand-painted press-ons, *made to fit you.*"
 * Headlines without a comma show as written.
 */
export function Headline({ text, accentClass = "text-lacquer" }: { text: string; accentClass?: string }) {
  const i = text.indexOf(",");
  if (i === -1 || i === text.length - 1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i + 1)}{" "}
      <em className={`font-normal ${accentClass}`}>{text.slice(i + 1).trim()}</em>
    </>
  );
}
