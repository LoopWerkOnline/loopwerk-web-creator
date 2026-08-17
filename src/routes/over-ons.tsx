import { createFileRoute, redirect } from "@tanstack/react-router";

/** Oude URL — permanent doorgestuurd naar de nieuwe pagina. */
export const Route = createFileRoute("/over-ons")({
  beforeLoad: () => {
    throw redirect({ to: "/over-loopwerk", replace: true });
  },
});
