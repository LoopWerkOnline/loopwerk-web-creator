import { createFileRoute, redirect } from "@tanstack/react-router";

/** Oude URL — permanent doorgestuurd naar de oplossingen. */
export const Route = createFileRoute("/hoe-we-werken")({
  beforeLoad: () => {
    throw redirect({ to: "/oplossingen", replace: true });
  },
});
