import { Webhook } from "svix";
import UserModel from "../db/models/user.model.js";

export const clerkWebhook = async (req, res) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET

    if(!webhookSecret) {
        throw new Error('Undefined webhook secret key.')
    }

    const payload = req.body;
    const headers = req.headers;

    const svix_id = headers["svix-id"];
    const svix_timestamp = headers["svix-timestamp"];
    const svix_signature = headers["svix-signature"];

    /*
        Note to self:
        If I got a 'message timestamp too new' or '... too old' error using
        windows os, don't forget to synchronize your pc's date/time.
        As the time of this writing, my OS sometimes doesn't 
        synchronize time correctly. Thus, I need to synchronize it
        manually.
    */
    //console.log(headers)
    //console.log(new Date(svix_timestamp*1000).toString())
    //const sec = parseInt(Number(Date.now()/1000).toString())
    //console.log(new Date(Date.now()).toString())
    //console.log(new Date(sec*1000).toString())

    const wh = new Webhook(webhookSecret);
    let event;
    try {
        event = wh.verify(payload, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        });
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            message: 'Webhook Verification Failed!'
        });
    }

    if (event.type === 'user.created') {
       const user = new UserModel({
        clerk_id: event.data.id,
        username: event.data.username,
        email: event.data.email_addresses[0].email_address,
        avatar: event.data.profile_image_url,

       })
       await user.save()
    }

    res.status(200).json({
        message: 'Webhook received.'
    })
}