export default function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-30" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 700px at 85% -10%, rgb(92 242 176 / 0.07), transparent 60%), radial-gradient(900px 600px at -10% 110%, rgb(255 181 71 / 0.05), transparent 60%)",
        }}
      />
      <div className="noise-layer absolute inset-0 opacity-30" />
    </div>
  );
}
