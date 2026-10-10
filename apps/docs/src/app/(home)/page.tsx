import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <p className="mb-3 text-sm text-neutral-500">versend.io</p>
      <h1 className="max-w-xl text-4xl font-semibold tracking-tight">
        Vercel events, delivered where you already are.
      </h1>
      <p className="mt-4 max-w-md text-neutral-500">
        Verify a Vercel webhook, then send it to Discord, Telegram, or any HTTP
        endpoint.
      </p>
      <Link className="mt-8 font-medium underline" href="/docs">
        Set it up
      </Link>
    </div>
  );
}
