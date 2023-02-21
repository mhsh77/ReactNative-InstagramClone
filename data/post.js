import { USERS } from "./users";

export const POSTS = [
    {
        imageuri:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/300px-Gull_portrait_ca_usa.jpg',
        user:USERS[0].user,
        likes:2359,
        caption:'Nice shot from my firend in a cool day',
        profile_pic:USERS[2].image,
        comments:[
            {
                user:'theqazman',
                commment:'Wow You look amazing :)'
            },
            {
                user:'amandadev',
                commment:'Nice Shot'
            }
        ]
    },
    {
        imageuri:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Male_mallard_duck_2.jpg/640px-Male_mallard_duck_2.jpg'  ,      
        user:USERS[1].user,
        likes:2359,
        caption:'Nice shot from my firend in a cool day',
        profile_pic:USERS[3].image,
        comments:[
            {
                user:'theqazman',
                commment:'Wow You look amazing :)'
            },
            {
                user:'amandadev',
                commment:'Nice Shot'
            }
        ]
    },
]