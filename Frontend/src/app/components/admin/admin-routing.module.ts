import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddbookComponent } from './addbook/addbook.component';
import { EditbookComponent } from './editbook/editbook.component';
import { DeletebookComponent } from './deletebook/deletebook.component';
import { ViewbooksComponent } from './viewbooks/viewbooks.component';

const routes: Routes = [{
  path : "",
  component: AdminComponent
},
{
  path: "books/add",
  component : AddbookComponent
},
{
  path: "books/edit",
  component : EditbookComponent
},
{
  path: "books/delete",
  component : DeletebookComponent
},
{
  path: "books/view",
  component : ViewbooksComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
