import { Webhook } from 'svix';
// import { type WebhookEvent } from '@clerk/nextjs/server';
// import { eq } from 'drizzle-orm';
// import { db } from '@/server/db';
// import { users } from '@/server/db/schema';
import { Request } from 'express';
import { trpc } from '@/trpc';
import { TRPCError } from '@trpc/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  // different for each environment
  const WEBHOOK_SECRET =
    process.env.NODE_ENV === 'production' ? process.env.CLERK_WEBHOOK_SECRET : process.env.CLERK_WEBHOOK_SECRET_TEST;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Get the headers
  const svix_id = req.get('svix-id');
  const svix_timestamp = req.get('svix-timestamp');
  const svix_signature = req.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return trpc.procedure.query(() =>  'Error occured -- no svix headers'));
  }

  // Get the body
  const payload = (await req) as any
  const body = JSON.stringify(payload);

  // Create a new SVIX instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
     throw new TRPCError({
        code:"INTERNAL_SERVER_ERROR",
    })
  }
  console.log(evt)
//   if (evt) {
//     // 👉 Parse the incoming event body into a ClerkWebhook object
//     try {
//       // 👉 `webhook.type` is a string value that describes what kind of event we need to handle

//       // 👉 If the type is "user.updated" the important values in the database will be updated in the users table
//       if (evt.type === 'user.updated') {
//         await db
//           .update(users)
//           .set({
//             username: evt.data.username || '',
//             displayName: `${evt.data.first_name} ${evt.data.last_name}`,
//             userImage: evt.data.image_url,
//             email: evt.data.email_addresses[0]?.email_address || '',
//           })
//           .where(eq(users.id, evt.data.id));
//       }

//       // 👉 If the type is "user.created" create a record in the users table
//       if (evt.type === 'user.created') {
//         await db.insert(users).values({
//           id: evt.data.id,
//           username: evt.data.username || '',
//           displayName: `${evt.data.first_name} ${evt.data.last_name}`,
//           userImage: evt.data.image_url,
//           email: evt.data.email_addresses[0]?.email_address || '',
//         });
//       }

//       // 👉 If the type is "user.deleted", delete the user record and associated blocks
//       if (evt.type === 'user.deleted') {
//         await db.delete(users).where(eq(users.id, evt.data.id || ''));
//       }

//       return new Response('', { status: 201 });
//     } catch (err) {
//       console.error(err);
//       return new Response('Error occured -- processing webhook data', {
//         status: 500,
//       });
//     }
//   }
}
