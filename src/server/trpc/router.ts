import { router } from "./init";

export const appRouter = router({
  // Sub-routers will be added here as we build each phase
  // e.g. log: logRouter, alert: alertRouter, etc.
});

export type AppRouter = typeof appRouter;
