export declare interface RouteInfo {
    path: string;
    title: string;
    class: string;
}
export const eaRoute: RouteInfo[] = [
    { path: 'setup', title: 'Ballot Setup', class: '' },
    { path: 'management', title: 'Ballot Management', class: '' }
];
export const regRoute: RouteInfo[] = [
    { path: 'voter', title: 'Voter management', class: '' },
];
export const homeRoute: RouteInfo[] = [
    { path: 'voting', title: 'Voting', class: '' },
    { path: 'user-profile', title: 'Profile', class: ''},
    { path: 'score-board', title: 'Scoreboard', class: '' }
];

export const homeRoute_Voted: RouteInfo[] = [
    { path: 'vote-result', title: 'Vote result', class: '' },
    { path: 'user-profile', title: 'Profile', class: ''},
    { path: 'score-board', title: 'Scoreboard', class: '' }
];
