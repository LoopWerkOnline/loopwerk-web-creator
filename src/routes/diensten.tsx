import { createFileRoute, redirect } from "@tanstack/react-router";

/** Oude URL — permanent doorgestuurd naar de nieuwe pagina. */
export const Route = createFileRoute("/diensten")({
  beforeLoad: () => {
    throw redirect({ to: "/oplossingen", replace: true });
  },
});
