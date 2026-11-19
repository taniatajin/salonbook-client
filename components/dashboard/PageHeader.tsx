type Props = { title: string; description?: string };

export default function PageHeader({ title, description }: Props) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-stone-800">{title}</h1>
      {description && <p className="mt-1 text-sm text-stone-600">{description}</p>}
    </div>
  );
}