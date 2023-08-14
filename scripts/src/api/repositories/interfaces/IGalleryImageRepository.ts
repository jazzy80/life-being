export interface IGalleryImageRepository {
    getImages(forPage: string): Promise<string[]>;
}