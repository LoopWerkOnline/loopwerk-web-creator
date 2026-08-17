import { createFileRoute, redirect } from "@tanstack/react-router";

/** Oude URL — permanent doorgestuurd naar de nieuwe pagina. */
export const Route = createFileRoute("/werkwijze")({
  beforeLoad: () => {
    throw redirect({ to: "/hoe-we-werken", replace: true });
  },
});
