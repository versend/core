import Link from "next/link";

const HomePage = () => (
  <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
    <p className="text-fd-muted-foreground mb-3 text-sm">versend.io</p>
    <h1 className="max-w-xl text-4xl font-semibold tracking-tight">
      Vercel events, delivered where you already are.
    </h1>
    <p className="text-fd-muted-foreground mt-4 max-w-md">
      Verify a Vercel webhook, then send it to Discord, Telegram, or any HTTP
      endpoint.
    </p>
    <Link className="mt-8 font-medium underline" href="/docs">
      Set it up
    </Link>
  </div>
);

export default HomePage;
