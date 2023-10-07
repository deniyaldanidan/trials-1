const url = {
    home: {
        label: "Home",
        value: "/"
    },
    login: {
        label: "Login",
        value: "/login"
    },
    register: {
        label: "Register",
        value: "/register"
    },
    createIdea: {
        label: "Post Idea",
        value: "/post-idea"
    },
    updateIdea: {
        value: "/update-idea"
    }
} as const;

export default url;