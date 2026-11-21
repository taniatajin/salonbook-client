import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { APIError } from "better-auth/api";
import { jwt } from "better-auth/plugins";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db(process.env.DB_NAME);

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: { enabled: true, minPasswordLength: 6 },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      // input: false = user nijer role/isBlocked signup ba profile update diye change korte parbe na
      role: { type: "string", defaultValue: "customer", input: false },
      isBlocked: { type: "boolean", defaultValue: false, input: false },
      phone: { type: "string", required: false },
    },
  },
  databaseHooks: {
    session: {
      create: {
        // blocked user notun session (login) toiri korte parbe na
        before: async (session) => {
          if (ObjectId.isValid(session.userId)) {
            const user = await db
              .collection("user")
              .findOne({ _id: new ObjectId(session.userId) });
            if (user?.isBlocked) {
              throw new APIError("FORBIDDEN", {
                message: "Your account has been blocked",
              });
            }
          }
          return { data: session };
        },
      },
    },
  },
  plugins: [
    jwt({
      jwt: {
        definePayload: ({ user }) => ({
          id: user.id,
          email: user.email,
          role: (user as { role?: string }).role,
        }),
      },
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;