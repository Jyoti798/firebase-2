import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { AdminComponent } from "./admin/admin.component";
import { User } from "./models/user/user";
import { UserComponent } from "./user/user.component";
import { adminGuard } from "./guards/admin.guard";
import { authGuard } from "./guards/auth.guard";
import { userGuard } from "./guards/user.guard";

const routes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    {
      path: 'auth',
    component:AuthComponent
    },
    {
      path: 'admin',
component:AdminComponent,
canActivate: [authGuard, adminGuard],
    },
    {
      path: 'user',
component:UserComponent,
canActivate: [authGuard, userGuard],
    },
    { path: '**', redirectTo: 'auth' },
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
  