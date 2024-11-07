export interface Video {
    id: number,
    created_at: string,
    title: string,
    description: string,
    genres: number[],
    thumbnail_url: string,
    video_url?: string,
}
