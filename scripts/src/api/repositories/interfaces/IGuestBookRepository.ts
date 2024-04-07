import {GuestBookEntry} from "../../models/GuestBookEntry";

export interface IGuestBookRepository {
    submitGuestBookEntry(entry: GuestBookEntry): Promise<void>;
}