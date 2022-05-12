export interface Review {
    id?: number
    gameId?: number
    text?: string
    posted?: Date
    isRecommended?: string
    like?: number
    dislike?: number

    userId?: string
}