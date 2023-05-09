import { Component, Inject, OnInit } from '@angular/core';
import icClose from '@iconify/icons-ic/twotone-close';
import * as configs from '../../../../static-data/configs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from '@shared/services/alert.service';
import { CategoryService } from 'src/app/services/category.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'vex-category-manage',
  templateUrl: './category-manage.component.html',
  styleUrls: ['./category-manage.component.scss']
})
export class CategoryManageComponent implements OnInit {
  icClose = icClose;
  configs = configs;

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _categoryService: CategoryService,
    public _dialogRef: DialogRef<CategoryManageComponent>
    ) {
      this.initForm();
      }

  initForm():void{
    this.form = this._fb.group({
      id: [0,[Validators.required]],
      name: ['',[Validators.required, Validators.pattern('^[a-z&ñA-Z&Ñ0-9á-ú]+$')]],
      description: ['',[Validators.pattern('^[a-z&ñA-Z&Ñ0-9á-ú\\s]+$')]],
      state:['',[Validators.required]]
    });
  }

  ngOnInit(): void {
    if(this.data != null){
      this.CategoryById(this.data.data.id);
    }
  }

  actionsForm():void{
    if(this.form.invalid){
      return Object.values(this.form.controls).forEach((controls) =>{
        controls.markAllAsTouched();
      })
    }

    const categoryId = this.form.get('id').value;
    if(categoryId > 0){
      this.CategoryEdit(categoryId);
    }else{
      this.CategoryRegister();
    }
  }

  CategoryRegister():void{
    this._categoryService.CategoryRegister(this.form.value).subscribe((resp) =>{
      if(resp.isSuccess){
        this._alert.success('Excelente',resp.messageResponse);
        this._dialogRef.close();
      }else{
        if((resp.statusResponse >= 500)&&(resp.statusResponse < 600)){
          this._alert.error('Atención',resp.messageResponse);
        }else{
          this._alert.warn('Atención',resp.messageResponse);
        }
      }
    })
  }

  CategoryById(categoryId:number):void{
    this._categoryService.CategoryById(categoryId).subscribe(
      (res) =>{
        this.form.reset({
          id: res.data.id,
          name: res.data.name,
          description: res.data.description,
          state: res.data.state
        })
      }
    )
  }

  CategoryEdit(categoryId:number):void{
    this._categoryService.CategoryEdit(categoryId, this.form.value).subscribe(
      (res) =>{
        if(res.isSuccess){
          this._alert.success('Excelente', res.messageResponse);
          this._dialogRef.close();
        }else{
          this._alert.warn('Atención', res.messageResponse);
        }
      }
    )
  }

}
