declare interface AddBlog {
    "title": string;
    "body": string;
    "tags": !string[];
}

declare interface Blog {
    "id": string;
    "title": string;
    "body": string;
    "tags": !string[];
    "createdAt": !string;
    "views": number;
    "likes": number;
}

declare interface BlogView {
    "id": string;
    "title": string;
    "description": string;
    "body": string;
    "createdAt": !string;
    "views": !number;
    "likes": !number;
    "tags": !string[];
    "image": string;
    "author": string;
}