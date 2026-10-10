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
          Versend checks the webhook and posts the event. You run the container.
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
  </div>
);

export default HomePage;
