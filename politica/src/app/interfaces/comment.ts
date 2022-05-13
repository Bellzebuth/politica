export interface IComment {
    _id: string,
    debate_id: string,
    user_id: string,
    user: {
        username: string,
        profilPicture: any,
    },
    politicalParti: string,
    interest_score: number,
    comment: string,
    side: boolean,
    dateTime: Date,
}
