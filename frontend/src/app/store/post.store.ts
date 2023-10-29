import { create } from "zustand";

interface PostStore {
    postHtml: React.ReactElement<any, string | React.JSXElementConstructor<any>> | string;
    setPostHtml: (postHtml: React.ReactElement<any, string | React.JSXElementConstructor<any>> | string) => void;
    postTitle: string;
    setPostTitle: (postTitle: string) => void;
    postDescription: string;
    setPostDescription: (postDescription: string) => void;
    postTags: string[];
    setPostTags: (postTags: string[]) => void;
    postMdx: string;
    setPostMdx: (postMdx: string) => void;
}

export const usePostStore = create<PostStore>((set) => ({
    postHtml: "",
    setPostHtml: (postHtml: React.ReactElement<any, string | React.JSXElementConstructor<any>> | string) => set({ postHtml }),
    postTitle: "",
    setPostTitle: (postTitle: string) => set({ postTitle }),
    postDescription: "",
    setPostDescription: (postDescription: string) => set({ postDescription }),
    postTags: [],
    setPostTags: (postTags: string[]) => set({ postTags }),
    postMdx: "",
    setPostMdx: (postMdx: string) => set({ postMdx }),
}));