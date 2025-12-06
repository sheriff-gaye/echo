import { ConvexError, v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { supportAgent } from "../system/ai/agents/supportAgent";




export const getOne = query({
    args: {
        conversationId: v.id("conversations"),
        contactSessionId: v.id("contactSession")
    },
    handler: async (ctx, args) => {
        const session = await ctx.db.get(args.contactSessionId);

        if (!session || session.expiresAt < Date.now()) {
            throw new ConvexError({
                code: "UNAUTHORIZED",
                message: "Invalid Session"
            })
        }



        const conversations = await ctx.db.get(args.conversationId);

        if (!conversations) {
            throw new ConvexError({
                code: "NOT FOUND",
                message: "Conversation Not Found"
            });
        }

        if (conversations.contactSessionId !== session._id) {
            throw new ConvexError({
                code: "UNAUTHORIZED",
                message: "Incorrect Session"
            })
        }

        return {
            _id: conversations._id,
            status: conversations.status,
            threadId: conversations.threadId
        }



    }

})

export const create = mutation({
    args: {
        organizationId: v.string(),
        contactSessionId: v.id("contactSession")
    },
    handler: async (ctx, args) => {

        const session = await ctx.db.get(args.contactSessionId);

        if (!session || session.expiresAt < Date.now()) {
            throw new ConvexError({
                code: "UNAUTHORIZED",
                message: "Invalid Session"
            })
        }


        const { threadId } = await supportAgent.createThread(ctx, {
            userId: args.organizationId,
        });





        const conversationId = await ctx.db.insert("conversations", {
            contactSessionId: session._id,
            status: "unresolved",
            threadId,
            organizationId: args.organizationId
        })

        return conversationId

    }
})