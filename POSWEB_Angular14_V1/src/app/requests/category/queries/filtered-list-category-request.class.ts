import { convertDateToRequest } from './../../../shared/functions/helpers';
import { params } from './../../../commons/params-api.interface';

export class FilteredListCategoryRequest extends params{
    constructor(
        numberPage:number,
        order:'desc' | 'asc',
        sort: string,
        records:10 | 20 | 50,
        numberFilter:number=0,
        textFilter:string='',
        stateFilter:number,
        private startDate:string,
        private endDate: string
    ){
        super(
            true,
            numberPage,
            order,
            sort,
            records,
            false,
            numberFilter,
            textFilter,
            stateFilter
        );

        this.startDate = convertDateToRequest(this.startDate,'date');
        this.endDate = convertDateToRequest(this.endDate,'date');
    }
}