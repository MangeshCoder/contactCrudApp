import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import{MatTableModule} from '@angular/material/table';
import{MatFormFieldModule} from '@angular/material/form-field';
import{MatInputModule} from '@angular/material/input';
import{MatButtonModule} from '@angular/material/button';
import{MatCardModule} from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


const material =[
    ToastrModule.forRoot(),
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSortModule,
    MatPaginatorModule
]

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      material
    ],
    exports:[
        material
    ]
  })
  export class MaterialModule { }