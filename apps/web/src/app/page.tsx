import { Footer } from "@/components/core/footer";

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 p-4">
      <h1 className="font-bold text-4xl">Vercord</h1>
      <p className="text-center text-muted-foreground">
        Seamlessly integrate your Vercel deployment notifications with Discord.
      </p>
      <Footer />
    </main>
  );
}
