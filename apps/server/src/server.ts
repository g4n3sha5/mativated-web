import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { mergedRouter } from '@/routers';
import { webhookRouter } from '@/routers/webhookRouter';
import { POST } from '@/api/webhooks-clerk/route';
import bodyParser from 'body-parser';

ValidateEnv();

const port = 3000;
const app = express();
// app.use(express);

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);

app.post('/api/webhooks/user', bodyParser.raw({ type: 'application/json' }), (req, res) => POST(req, res));

// app.use('/api/webhooks/user', express.json(), (req, res) => {

//   authWebhook(req.body, req.headers).then(({ code, msg }) => {
//       res.status(code).json({ message: msg });
//   }).catch(() => {
//       res.status(500).json({ message: 'webhook error' });
//   })

// })

app.use('/trpc', createExpressMiddleware({ router: mergedRouter }));

app.listen(port);

export type AppRouter = typeof mergedRouter;
