const middleLayer = "/v1/api"

export const AUTH_SERVER = middleLayer + '/auth'
export const BLOGS_SERVER = middleLayer + '/blogs'
export const FEED_SERVER = middleLayer + '/feed'
export const USER_SERVER = middleLayer + '/user'

export const AUTH_ROUTES = {
    "login": "/login", 
    "register": "/register", 
    "logout": "/logout", 
}

export const ROUTES = {
    "auth": {
        routes: AUTH_ROUTES,
        url: AUTH_SERVER
    }
}