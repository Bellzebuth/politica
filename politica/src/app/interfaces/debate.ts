export interface IDebate {
    _id: String,
    id_user: String,
    interest_score: number,
    message: String,
    comment: Array<any>,
    dateTime: Date,
    liked: Boolean,
}
