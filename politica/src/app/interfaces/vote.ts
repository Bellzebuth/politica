export interface IVote {
    _id: String,
    label: String,
    for_vote: number,
    against_vote: number,
    percentageFor: number,
    percentageAgainst: number,
    author: String,
    dateTime: Date,
    closeDate: Date,
    voted: Boolean,
}
