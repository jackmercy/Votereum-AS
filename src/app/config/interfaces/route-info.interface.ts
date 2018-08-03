export declare interface RouteInfo {
    path: string;
    title: string;
    class: string;
}
export const eaRoute: RouteInfo[] = [
    { path: 'control', title: 'EA', class: '' },
    { path: 'test-route', title: 'Test routing', class: '' }
];
export const regRoute: RouteInfo[] = [
    { path: 'voter', title: 'Voter management', class: '' },
];
export const homeRoute: RouteInfo[] = [
    { path: 'voting', title: 'Voting', class: '' },
    { path: 'score-board', title: 'Scoreboard', class: '' },
    { path: 'vote-result', title: 'Vote result', class: '' }
];
