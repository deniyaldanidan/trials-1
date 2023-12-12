type movieDisplayer = {
    _id: string,
    name: string,
    genre: string,
    year: number,
    reviews: {
        starRating: number
    }[]
}

type CELEB_TITLES = "ACTOR" | "DIRECTOR"

type celebData = {
    _id: string,
    name: string,
    titles: CELEB_TITLES[]
    bio: string
}

type celebSelector = Omit<celebData, "bio">

type celebFormData = Omit<celebData, "_id">;

type USERROLE = "USER"
type ADMINROLE = "ADMIN"

type unAuthedInfo = {
    auth: false,
    username?: undefined
    name?: undefined
    role?: undefined
    userId?: undefined
    token?: undefined
}

type authedInfo = {
    auth: true
    username: string
    name: string
    role: USERROLE | ADMINROLE
    userId: string
    token: string
}

type authInfo = unAuthedInfo | authedInfo;

type movieFormData = {
    name: string
    year: number
    director?: string
    plot: string
    genre: string[]
    actors: string[]
}