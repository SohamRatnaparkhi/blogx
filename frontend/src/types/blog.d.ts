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