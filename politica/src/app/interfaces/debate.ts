export interface IDebate {
    _id: string,
    user: {
        id: string,
        username: string,
        profilPicture: string,
    },
    interest_score: number,
    message: string,
    comment: Array<any>,
    dateTime: Date,
    liked: Boolean,
}
