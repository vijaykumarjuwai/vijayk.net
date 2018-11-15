export interface Blogpost {
    title: string;
    author: string;
    body: string;
    category: string;
    comments?: [{ body: String, date?: Date, userName: String }];
    date?: Date;
    hidden: boolean;
}
