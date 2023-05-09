import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  success(titleParam: string, messageParam: string){
    Swal.fire({
      title:titleParam,
      text:messageParam,
      icon:'success',
      confirmButtonColor:'rgb(210,155,253)',
      width:430
    });
  }

  warn(titleParam: string, messageParam: string){
    Swal.fire({
      title:titleParam,
      text:messageParam,
      icon:'warning',
      confirmButtonColor:'rgb(210,155,253)',
      width:430
    });
  }
  
  error(titleParam: string, messageParam: string){
    Swal.fire({
      title:titleParam,
      text:messageParam,
      icon:'error',
      confirmButtonColor:'rgb(210,155,253)',
      width:430
    });
  }

}
