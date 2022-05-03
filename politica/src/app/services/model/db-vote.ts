export interface DbVote {
    _id: String,
    labels: String,
    for_vote: number,
    against_vote: number,
    author: String,
    dateTime: Date,
    closeDate: Date,
    voted: Boolean,
}
