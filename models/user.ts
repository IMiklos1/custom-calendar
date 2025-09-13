export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

export interface Group {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    members: User[];
    owner: User;
    events: Event[];
    isPublic: boolean;
    joinRequests: User[];
}

