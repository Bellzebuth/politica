export interface INews {
    _id: string,
    title: string,
    content: string,
    source: string,
    image: string,
    journalist: {
        id: string,
        username: string,
    },
    dateTime: Date
}
