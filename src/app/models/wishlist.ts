import { Game } from "./game";

export interface Wishlist {
    id?: number
    visible?: number
    
    userIdString?: string
    games?: Game[]
}