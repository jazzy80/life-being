import {IGuestBookRepository} from "./interfaces/IGuestBookRepository";
import {GuestBookEntry} from "../models/GuestBookEntry";
import {Api} from "../Api";

export class GuestBookRepository implements IGuestBookRepository {
    async submitGuestBookEntry(entry: GuestBookEntry): Promise<void> {
        await Api.POST("guestbook/", JSON.stringify({name: entry.name, comment: entry.comment}))
        return Promise.resolve();
    }

}