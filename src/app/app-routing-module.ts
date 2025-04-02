import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { AdminComponent } from "./admin/admin.component";
import { User } from "./models/user/user";
import { UserComponent } from "./user/user.component";

const routes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    {
      path: 'auth',
    component:AuthComponent
    },
    {
      path: 'admin',
component:AdminComponent
    },
    {
      path: 'user',
component:UserComponent
    },
    { path: '**', redirectTo: 'auth' },
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
  