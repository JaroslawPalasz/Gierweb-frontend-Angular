import { Gamelikes } from "./gamelikes";

export interface Game {
    id?: number
    name?: string
    publisher?: string
    description?: string
    descriptionShort?: string
    imagesLink?: string
    headerImage?: string
    backgroundImage?: string
    videoLink?: string
    steamReviewScore?: number
    reviewScore?: number
    releasedOn?: string
    comingSoon?: boolean
    
    FeaturedGamesId?: number
    gamelikes?: Gamelikes[]
}