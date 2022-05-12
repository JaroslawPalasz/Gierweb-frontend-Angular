import { Timestamp } from "rxjs";
import { Gamelikes } from "./gamelikes";
import { News } from "./news";
import { Recommendedgames } from "./recommendedgames";
import { Roles } from "./roles";
import { Wishlist } from "./wishlist";

export interface User {
    public_id?: string
    email?: string
    // passwordHash?: string
    firstName?: string
    lastName?: string
    profilePic?: string
    dateCreated?: Date

    token?: string

    role?: Roles
    wishlist?: Wishlist
    gamelikes?: Gamelikes[]
    recommendedgames?: Recommendedgames
    news?: News[]
    
}