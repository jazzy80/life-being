import {IGalleryImageRepository} from "./IGalleryImageRepository";
import {Api} from "../Api";

export class GalleryImageRepository implements IGalleryImageRepository {
    async getImages(forPage: string): Promise<string[]> {
        const resp = await Api.GET("gallery-images/", {page: forPage});
        const json = await resp.json();
        return json["imageFiles"];
    }
}