export interface IVote {
    _id: string,
    label: string,
    for_vote: number,
    against_vote: number,
    author: string,
    dateTime: Date,
    closeDate: Date,
}
