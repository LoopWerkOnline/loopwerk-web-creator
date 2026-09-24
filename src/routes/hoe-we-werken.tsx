import { createFileRoute, redirect } from "@tanstack/react-router";

/** Oude URL — permanent doorgestuurd naar de werkwijzepagina. */
export const Route = createFileRoute("/hoe-we-werken")({
  beforeLoad: () => {
    throw redirect({ to: "/werkwijze", replace: true });
  },
});
