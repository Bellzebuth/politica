export interface IDebate {
    _id: string,
    user_id: string,
    user: {
        username: string,
        profilPicture: any,
    },
    politicalParti: string,
    interest_score: number,
    message: string,
    comment: Array<any>,
    source: any,
    dateTime: Date,
}
