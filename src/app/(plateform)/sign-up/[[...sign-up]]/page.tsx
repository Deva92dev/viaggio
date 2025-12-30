import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="min-h-screen m-auto py-24 flex items-center justify-center">
      <SignUp />
    </section>
  );
}
