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

export const BLOGS_ROUTES = {
    "addBlog": "/addBlog",
    "updateBlog": "/updateBlog",
    "deleteBlog": "/deleteBlog",
    "likeBlog": "/likeBlog?post_id=",
    "dislikeBlog": "/dislikeBlog?post_id=",
}

export const FEED_ROUTES = {
    "allPosts": "/allPosts",
    "allPostsPageWise": "/allPostsPageWise?page_no=",
    "postWithId": "/postWithId?post_id=",
    "postWithUserId": "/postWithUserId?user_id=",
    "myPosts": "/myPosts",
    "followingPosts": "/followingUsersPosts",
    "likedPosts": "/myLikedPosts",
}

export const USER_ROUTES = {
    "delete": "/delete",
    "follow": "/follow/toFollowId=",
    "unfollow": "/unfollow/toUnfollowId=",
    "updateBio": "/update/bio",
    "updatePassword": "/update/password",
    "getById": "/get",
    "getByEmail": "/get/email",
}

export const ROUTES = {
    "auth": {
        routes: AUTH_ROUTES,
        url: AUTH_SERVER
    },
    "blogs": {
        routes: BLOGS_ROUTES,
        url: BLOGS_SERVER
    },
    "feed": {
        routes: FEED_ROUTES,
        url: FEED_SERVER
    },
    "user": {
        routes: USER_ROUTES,
        url: USER_SERVER
    }
}