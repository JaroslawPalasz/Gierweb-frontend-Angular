import { Game } from "./game";

export interface Tag {
    id?: number
    name?: string

    games?: Game[]
}