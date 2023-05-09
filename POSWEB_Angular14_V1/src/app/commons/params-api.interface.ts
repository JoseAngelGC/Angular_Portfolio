export class params {
    constructor(
        private paginator: boolean,
        private numberPage: number,
        private order: 'desc' | 'asc',
        private sort: string,
        private records: 10 | 20 | 50,
        private download: boolean,
        private numberFilter: number = 0,
        private textFilter: string = "",
        private stateFilter: number = null,
        private stateFilterTwo?: number
    ) { }
}

export interface UserToken {
    message: string;
}