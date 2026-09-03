import { createFileRoute, redirect } from "@tanstack/react-router";

/** Verwijderde pagina — permanent doorgestuurd naar de homepage. */
export const Route = createFileRoute("/sectoren")({
  beforeLoad: () => {
    throw redirect({ to: "/", replace: true });
  },
});
