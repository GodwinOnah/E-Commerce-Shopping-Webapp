import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes =[

  {path:'', component:AdminComponent},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
  
})
export class AdminRoutingModule { }
