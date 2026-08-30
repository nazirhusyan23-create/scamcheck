import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-sm font-semibold text-blue-600">404</p>
      <h1 className="mt-2 text-3xl font-extrabold text-slate-900">Page not found</h1>
      <p className="mt-3 text-slate-600">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Go to homepage
        </Link>
        <Link
          href="/guides"
          className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-blue-400"
        >
          Browse guides
        </Link>
      </div>
    </div>
  );
}
