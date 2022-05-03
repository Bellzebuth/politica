export interface DbUser {
    username: string,
    lastName: string,
    firstName: string,
    genre: string,
    email: string,
    password: string,
    politicalParty: string,
    age: number,
    profilPicture: string,
    debate_liked_id: Array<string>,
    comment_liked: Array<any>,
    votedList: Array<any>,
    journalist: boolean,
    image: string,
    indicator: number
}
