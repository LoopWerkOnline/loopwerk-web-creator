import { createFileRoute, redirect } from "@tanstack/react-router";

/** Verwijderde sectorpagina's — permanent doorgestuurd naar de homepage. */
export const Route = createFileRoute("/sectoren/$")({
  beforeLoad: () => {
    throw redirect({ to: "/", replace: true });
  },
});
