import { createFileRoute, redirect } from "@tanstack/react-router";

/** Oude URL — permanent doorgestuurd naar de homepage. */
export const Route = createFileRoute("/werkwijze")({
  beforeLoad: () => {
    throw redirect({ to: "/", replace: true });
  },
});
