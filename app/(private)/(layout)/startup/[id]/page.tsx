export default function StartupPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Startup {params.id}</h1>
    </div>
  );
}
