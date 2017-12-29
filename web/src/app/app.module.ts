import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { MaterialModule } from './shared/material.module';

import { todoReducer } from "./shared/todo.reducer";
import { HomeComponent } from './home/home.component';

import { APP_ROUTING, APP_ROUTING_PROVIDERS } from "./app.routes";
import { WakandaService } from "./shared/wakanda.service";
import { TodoService } from './shared/todo.service';
import { FormsModule } from '@angular/forms';
import { ConfirmComponent } from './shared/confirm/confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoDetailsComponent,
    HomeComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    StoreModule.forRoot({
      todo: todoReducer
    }),
    APP_ROUTING,
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    })
  ],
  entryComponents: [ConfirmComponent],
  providers: [
    APP_ROUTING_PROVIDERS,
    WakandaService,
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
