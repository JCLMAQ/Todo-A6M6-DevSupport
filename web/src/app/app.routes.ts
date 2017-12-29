import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders, Provider } from "@angular/core";

import { HomeComponent } from "./home/home.component";
import { TodoDetailsComponent } from "./todo-details/todo-details.component";
import { TodoListComponent } from "./todo-list/todo-list.component";

const APP_ROUTES: Routes = [{
  path: "",
  component: HomeComponent
}, {
  path: "todos",
  component: TodoListComponent
}, {
  path: "todos/:id",
  component: TodoDetailsComponent,
  data: {
    editable: true
  }
}, {
  path: "todos/:id/view",
  component: TodoDetailsComponent
}];

export const APP_ROUTING_PROVIDERS: Provider[] = [];

export const APP_ROUTING: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES, {
  useHash: true
});
