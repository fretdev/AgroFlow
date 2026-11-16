export default function TransporterDashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 p-6">
      <div className="max-w-md w-full bg-white shadow-sm rounded-lg p-8 border border-zinc-200 text-center space-y-4">
        <span className="inline-block px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full">
          Transporter Portal
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">AgroFlow Farmer Workspace</h1>
        <p className="text-sm text-zinc-600">
          Welcome! Manage your crop listings, monitor supply demand, and connect with verified buyers and transporters.
        </p>
      </div>
    </div>
  );
}