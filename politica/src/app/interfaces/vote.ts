export interface IVote {
    _id: String,
    subject: String,
    for_vote: Number,
    against_vote: Number,
    author: String,
    dateTime: Date,
    closeDate: Date,
}
