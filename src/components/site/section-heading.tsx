export function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl font-medium leading-tight text-foreground md:text-6xl">
        {title}
      </h2>
      {copy && (
        <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
          {copy}
        </p>
      )}
    </div>
  );
}
