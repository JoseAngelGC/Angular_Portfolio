import { CategoryService } from './../../../services/category.service';
import { CustomTitleService } from './../../../shared/services/custom-title.service';
import { scaleIn400ms } from './../../../../@vex/animations/scale-in.animation';
import { Component, OnInit } from '@angular/core';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { componentSettings } from './category-list-config';
import { DatesFilter } from '@shared/functions/actions';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CategoryManageComponent } from '../category-manage/category-manage.component';
import { delay } from 'rxjs/operators';
import { CategoryDto } from 'src/app/responses/category/models/categoryDto.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'vex-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  animations:[
    stagger40ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class CategoryListComponent implements OnInit {
  component:any;

  constructor(
    customTitle: CustomTitleService,
    public _categoryService:CategoryService,
    public _dialog: MatDialog
    ) { 
      customTitle.set('Categorias');
    }

  ngOnInit(): void {
    this.component = componentSettings; 
  }

  //METHODS DIRECTLY LINKED TO HTML VIEW COMPONENT
  rowClick(e:any){
    let action = e.action;
    let category = e.row;

    switch(action){
      case "edit":
        this.CategoryEdit(category);
        break;
      case "remove":
        this.CategoryRemove(category);
    }

    return false;
  }

  setData(data:any=null){
    this.component.filters.stateFilter = data.value;
    this.component.menuOpen = false;
    this.formatGetImputs();
  }

  search(data:any){
    this.component.filters.numberFilter = data.searchValue;
    this.component.filters.textFilter = data.searchString;
    this.formatGetImputs();
  }

  datesFilterOpen(){
    DatesFilter(this);
  }

  openDialogRegister(){
    let dialogRefRegister = this._dialog.open(CategoryManageComponent, {
      disableClose: true,
      width: '400px'
    })

    dialogRefRegister.afterClosed().subscribe((res) =>{
      if(res){
        delay(3000);
        this.formatGetImputs();
      }
    })
  }

  //END


  //INTERNAL FUNCTION METHODS
  formatGetImputs(){
    let inputs ={
      numberFilter: 0,
      textFilter: "",
      stateFilter: null,
      startDate: null,
      endDate: null
    }

    
    if(this.component.filters.numberFilter != ""){
      
      inputs.numberFilter = this.component.filters.numberFilter;
      inputs.textFilter = this.component.filters.textFilter;
    }

    if(this.component.filters.stateFilter != null){
      inputs.stateFilter = this.component.filters.stateFilter;
    }

    if(this.component.filters.startDate != "" && this.component.filters.endDate != ""){
      inputs.startDate = this.component.filters.startDate;
      inputs.endDate = this.component.filters.endDate;
    }

    this.component.getInputs = inputs;
  }

  CategoryEdit(row: CategoryDto){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = row;

    let dialogRefEdit = this._dialog.open(CategoryManageComponent,{
      data:dialogConfig,
      disableClose:true,
      width: '400px'
    })

    dialogRefEdit.afterClosed().subscribe((res) =>{
      if(res){
        delay(3000);
        this.formatGetImputs();
      }
    })
  }

  CategoryRemove(category:any){
    Swal.fire({
      title: '¿Deseas eliminar la categoria ' + category.name + '?',
      text: 'Se borrará de manera permanente.',
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
      cancelButtonColor: 'rgb(79,109, 253)',
      cancelButtonText:' Cancelar',
      confirmButtonColor: 'rgb(210, 155, 253)',
      confirmButtonText: 'Si, eliminar',
      width: 480
    }).then((result) => {
      if(result.isConfirmed){
        this._categoryService.CategoryRemove(category.id, category).subscribe((res) =>{
          if(res.isSuccess){
            delay(3000);
            this.formatGetImputs();
          }
        })
      }
    })

  }

  //END

}

