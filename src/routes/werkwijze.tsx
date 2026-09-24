import { createFileRoute, redirect } from "@tanstack/react-router";

/** Werkwijze is onderdeel van de oplossingspagina's; oude URL doorsturen. */
export const Route = createFileRoute("/werkwijze")({
  beforeLoad: () => {
    throw redirect({ to: "/oplossingen", replace: true });
  },
});
