type likeVal = "Like" | "Dislike";

type Idea1 = {
    id: number,
    content: string,
    createdAt: string,
    updatedAt: string,
    Author: {
        username: string,
        profile: {
            firstname: string,
            lastname: string
        }
    },
    _count: {
        comments: number
    },
    likes: {
        value: likeVal,
        likedby: {
            username: string
        }
    }[]
}

type Idea2 = Omit<Idea1, "_count"> & {
    comments: {
        id: number,
        value: string,
        commentby: {
            username: string,
            profile: {
                firstname: string,
                lastname: string
            }
        }
    }[]
}

type authStatus = "unauth" | "auth";
type userInfo = { username: string, name: string, userId: string };

type authObject = {
    status: "auth",
    userInfo: userInfo
} | {
    status: "unauth" | "loading",
    userInfo?: userInfo
}

type theme = "dark" | "light";
type voidFN<T> = (inp: T) => void;
type emptyVoidFN = () => void;