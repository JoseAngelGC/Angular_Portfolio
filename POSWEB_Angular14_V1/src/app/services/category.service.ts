import { CategoryRequest } from './../requests/category/commands/category-request.interface';
import { FilteredListCategoryRequest } from './../requests/category/queries/filtered-list-category-request.class';
import { CommonApiResponse } from './../commons/responses/common-api-response.interface';
import { CategoryEndpoints as endpoint } from './../shared/apis/category/categoryEndpoints.const';
import { environment as env} from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../shared/services/alert.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})
export class CategoryService {

  constructor(
    private _http:HttpClient,
    private _alert:AlertService) { }

    GetAll(
      size,
      sort,
      order,
      page,
      getInputs
    ):Observable<CommonApiResponse>{
      const requestUrl = env.api + endpoint.LIST_CATEGORIES;
      const requestParams: FilteredListCategoryRequest = new FilteredListCategoryRequest(
        page + 1,
        order,
        sort,
        size,
        getInputs.numberFilter,
        getInputs.textFilter,
        getInputs.stateFilter,
        getInputs.startDate,
        getInputs.endDate
      )
      

      return this._http.post<CommonApiResponse>(requestUrl, requestParams).pipe(
        map((data:CommonApiResponse)=>{
          
          data.data.forEach(function(e:any){
            
            switch(e.state){
              case 0:
                e.badgeColor = 'text-gray bg-gray-light';
                break;
              case 1:
                e.badgeColor = 'text-green bg-green-light';
                break;
              default:
                e.badgeColor = 'text-gray bg-gray-light';
                break;
            }
          })
          
          return data;
        })
      )
    }


    CategoryRegister(requestParams:CategoryRequest):Observable<CommonApiResponse>{
      
      const requestUrl = env.api + endpoint.CATEGORY_REGISTER;
      return this._http.post(requestUrl, requestParams).pipe(
        map((resp:CommonApiResponse) =>{ 
          return resp;
        })
      )
    }

    CategoryById(categoryId: number):Observable<CommonApiResponse>{
      const requestUrl = env.api + endpoint.CATEGORY_BY_ID + categoryId;
      return this._http.get(requestUrl).pipe(
        map((resp:CommonApiResponse) =>{
          return resp;
        })
      )
    }

    CategoryEdit(categoryId:number, requestParams:CategoryRequest):Observable<CommonApiResponse>{
      const requestUrl = env.api + endpoint.CATEGORY_EDIT + categoryId;
      return this._http.put(requestUrl,requestParams).pipe(
        map((resp:CommonApiResponse) =>{
          return resp;
        })
      )
    }

    CategoryRemove(categoryId:number, requestParams:CategoryRequest):Observable<CommonApiResponse>{
      const requestUrl = env.api + endpoint.CATEGORY_REMOVE + categoryId;
      return this._http.delete(requestUrl,{body:requestParams}).pipe(
        map((resp:CommonApiResponse) =>{
          if(resp.isSuccess){
            this._alert.success('Excelente', resp.messageResponse);
          }
          return resp;
        })
      )
    }
}
