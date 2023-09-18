import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    /*
    const newUser = await prisma.user.create({
        data: {
            username: "sara_456",
            email: "sara456@sample.com",
            UserProfile: {
                create: {
                    firstname: "sarah",
                    lastname: "andrew",
                    country: "USA",
                    languages: ["English", "French"]
                }
            }
        }
    });
    console.log(newUser)
    */

    /*
    const user = await prisma.user.findFirst({
        include: {
            UserProfile: true,
            posts: {
                include: { categories: true }
            }
        }
    });
    const cat = await prisma.categories.findFirst({
        where: {
            name: "sample-1"
        },
        include: {
            posts: {
                include: {
                    author: true
                }
            }
        }
    });
    */

    /*

    const uniqUsers = await prisma.user.findUnique({
        where: {
            username: "sara_456"
        },
        include: {
            UserProfile: true,
            posts: {
                where: {
                    title: {
                        contains: "second"
                    }
                }
            }
        }
    })

    console.log(uniqUsers);
    
    */


    // console.log(user);
    // console.log("\n");
    // console.log(cat);

    /*
    const user = await prisma.user.findUnique({
        where: {
            username: "sara_456"
        }
    })

    if (user) {
        await prisma.post.create({
            data: {
                title: "Hello, This is my second second post",
                slug: "hello,-this-is-my-second-second-post",
                content: "Something about something which i know. I think!!",
                author: {
                    connect: user
                },
                categories: {
                    create: {
                        name: "sample-5"
                    }
                }
            }
        })
    }
    */
    /*
    await prisma.user.createMany({
        data: [
            {
                username: "amara_12",
                email: "amara12@example.com",
                role: "ADMIN"
            },
            {
                username: "seline",
                email: "seline@sample.com"
            },
            {
                username: "kat_Wills",
                email: "kateWilliams@test.com"
            },
            {
                username: "dave_541",
                email: "dave541@example.com",
                role: "ADMIN"
            },
            {
                username: "albert_23",
                email: "albert23@test.com",
                role: "BASIC"
            }
        ]
    })
    */

    /*
    const myusers = await prisma.user.findMany({
        // take: 3,
        // skip: 2,
        // orderBy: {
        //     username: "asc"
        // },
        where: {
            // email: {
            //     contains: "sample"
            // },
            // AND: {
            //     username: {
            //         equals: "sara_456"
            //     }
            // },
            // username: {
            //     in: ["sara_456", "amara_12", "seline"]
            // }
            UserProfile: {
                is: {
                    firstname: "sarah"
                }
            }
        }
    })
    console.log(myusers);
    */

    /*
    const posts = await prisma.post.findUnique({
        where: {
            slug: "hello,-this-is-my-fourth-post"
        },
        include: {
            categories: true
        }
    })

    console.log(posts?.categories);
    */

    /*
    const mycats = await prisma.categories.findMany({
        where: {
            // OR: [{ name: "sample-3" }, { name: "sample-2" }, { name: "sample-1" }]
            name: {
                in: ["sample-3", "sample-2", "sample-1"]
            }
        }
    });

    const cat5 = await prisma.categories.findUnique({
        where: { name: "sample-5" }
    })

    // console.log("chosen=>", mycats, "\nremove=>", cat5)

    if (cat5) {
        await prisma.post.update({
            where: {
                slug: "hello,-this-is-my-fourth-post"
            },
            data: {
                categories: {
                    disconnect: cat5,
                    connect: mycats
                }
            }
        })
    }
    */

    // await prisma.user.deleteMany();
    await prisma.categories.deleteMany();
}

main()
    .catch(e => {
        console.error(e)
    }).finally(async () => {
        await prisma.$disconnect()
    })