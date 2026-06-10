export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-sm w-full rounded-3xl p-8" style={{ background: "oklch(0.12 0.013 275)" }}>
        <h1 className="text-2xl font-semibold mb-4" style={{ color: "oklch(0.94 0.01 275)" }}>
          Sign in
        </h1>
        <p className="text-sm" style={{ color: "oklch(0.55 0.015 275)" }}>
          Use the login page to authenticate and manage your profile.
        </p>
      </div>
    </div>
  );
}
