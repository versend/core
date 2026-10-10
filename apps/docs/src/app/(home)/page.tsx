import Link from "next/link";

const steps = [
  {
    body: "The signature has to match the integration secret.",
    title: "Signature",
  },
  {
    body: "Excluded events and targets are dropped.",
    title: "Filters",
  },
  {
    body: "Every configured destination gets the event.",
    title: "Delivery",
  },
] as const;

const destinations = [
  {
    body: "An embed in a channel.",
    href: "/docs/destinations/discord",
    title: "Discord",
  },
  {
    body: "A message in a chat.",
    href: "/docs/destinations/telegram",
    title: "Telegram",
  },
  {
    body: "A card in a channel.",
    href: "/docs/destinations/slack",
    title: "Slack",
  },
  {
    body: "A notification on a topic.",
    href: "/docs/destinations/ntfy",
    title: "ntfy",
  },
  {
    body: "A push to your server.",
    href: "/docs/destinations/gotify",
    title: "Gotify",
  },
] as const;

const DeliveryPreview = () => (
  <figure className="border-fd-border bg-fd-card overflow-hidden rounded-lg border shadow-sm">
    <div className="border-fd-success border-l-4 px-4 py-4">
      <div className="flex items-center gap-2">
        <span className="bg-fd-foreground size-5 rounded-full" />
        <figcaption className="text-sm font-medium">acme</figcaption>
      </div>
      <p className="mt-3 text-base font-semibold">Deployment ready</p>
      <p className="mt-2 text-sm font-medium">Ship the billing page</p>
      <p className="text-fd-muted-foreground mt-1 border-l-2 pl-3 text-sm">
        Invoice download and the failed-payment state.
      </p>
      <dl className="mt-4 grid grid-cols-3 gap-3 text-sm">
        <div>
          <dt className="text-fd-muted-foreground text-xs">Environment</dt>
          <dd className="mt-1">production</dd>
        </div>
        <div>
          <dt className="text-fd-muted-foreground text-xs">Branch</dt>
          <dd className="mt-1">main</dd>
        </div>
        <div>
          <dt className="text-fd-muted-foreground text-xs">Commit</dt>
          <dd className="mt-1 font-mono text-xs">a1b2c3d</dd>
        </div>
      </dl>
      <p className="text-fd-muted-foreground mt-4 text-xs">
        dpl_8f2a · deployment.ready
      </p>
    </div>
  </figure>
);

const HomePage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-16 md:py-24">
    <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div>
        <p className="text-fd-muted-foreground text-sm">Self-hosted relay</p>
        <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight md:text-5xl">
          Vercel events, in the place you already watch.
        </h1>
        <p className="text-fd-muted-foreground mt-4 max-w-lg text-base leading-relaxed">
          Versend checks the webhook, then posts it to Discord, Telegram, Slack,
          ntfy, or Gotify. You run the container. These docs stay hosted.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            className="bg-fd-primary text-fd-primary-foreground rounded-md px-4 py-2 text-sm font-medium"
            href="/docs/setup/docker"
          >
            Run the container
          </Link>
          <Link
            className="border-fd-border rounded-md border px-4 py-2 text-sm font-medium"
            href="/docs"
          >
            Read the guide
          </Link>
        </div>
      </div>
      <DeliveryPreview />
    </div>

    <ol className="border-fd-border mt-20 grid gap-8 border-t pt-10 sm:grid-cols-3">
      {steps.map((step) => (
        <li key={step.title}>
          <h2 className="text-sm font-semibold">{step.title}</h2>
          <p className="text-fd-muted-foreground mt-2 text-sm leading-relaxed">
            {step.body}
          </p>
        </li>
      ))}
    </ol>

    <section className="mt-16">
      <h2 className="text-sm font-semibold">Destinations</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination) => (
          <li key={destination.href}>
            <Link
              className="border-fd-border hover:bg-fd-accent block h-full rounded-lg border p-4"
              href={destination.href}
            >
              <span className="text-sm font-medium">{destination.title}</span>
              <span className="text-fd-muted-foreground mt-2 block text-sm leading-relaxed">
                {destination.body}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  </div>
);

export default HomePage;
