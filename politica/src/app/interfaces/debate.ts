export interface IDebate {
    _id: string,
    user: {
        id: string,
        username: string,
        profilPicture: any,
    },
    interest_score: number,
    message: string,
    comment: Array<any>,
    dateTime: Date,
}
