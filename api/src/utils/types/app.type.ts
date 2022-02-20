export type Direction = 'asc' | 'desc';

export interface RepoPayload {
    q?: string;
    sort?: {
        [sort: string]: Direction;
    };
    usePage?: boolean;
    page?: string;
    limit?: string;
    select?: string;
}
