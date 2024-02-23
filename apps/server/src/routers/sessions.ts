import { createSessionHandler } from '@controllers/session.controller';
import { publicProcedure, trpc } from '../trpc';
import { SessionCreateSchema } from '@mativated-monorepo/shared/validationSchemas';

const createSessionProcedure = publicProcedure.input(SessionCreateSchema);

export const sessionsRouter = trpc.router({
  createSession: createSessionProcedure.mutation(({ input, ctx }) => createSessionHandler({ input, ctx })),
});

