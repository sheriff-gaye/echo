import { ConvexError, v } from "convex/values";
import { mutation, query } from "../_generated/server";




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

        if (!conversations) return null;

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


        const threadId = "1243";

        const conversationId = await ctx.db.insert("conversations", {
            contactSessionId: session._id,
            status: "unresolved",
            threadId,
            organizationId: args.organizationId
        })

        return conversationId

    }
})