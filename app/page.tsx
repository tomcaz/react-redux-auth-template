import type { Metadata } from "next";
import { Counter } from "./components/counter/Counter";
import { SessionProvider } from "next-auth/react";

export default function IndexPage({ session }: { session: any }) {
  return
  (<SessionProvider session={session}>
    <Counter />
  </SessionProvider>
  );
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
