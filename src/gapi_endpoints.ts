/*  https://developers.google.com/photos/library/reference/rest     */

export const mediaItems: string = "https://photoslibrary.googleapis.com/v1/mediaItems";
export const albums: string = "https://photoslibrary.googleapis.com/v1/albums?pageSize=50";

export class IAlbum {
    public cover: string;
    public id: string;
    public title: string;
}