import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";

import { WakandaService } from "./wakanda.service";
import { ACTION, ITodo } from "./todo.reducer";
import { MatDialog } from '@angular/material';
import { ConfirmComponent } from './confirm/confirm.component';

@Injectable()
export class TodoService {
  constructor(
    private wakanda: WakandaService,
    private store: Store<{ todo: any }>,
    private dialog: MatDialog
  ) {

  }

  async getClass() {
    const ds = await this.wakanda.catalog();
    return ds.Todo;
  }

  async getAll(opts: {
    pageSize: number;
    start: number;
    filter?: string;
    params?: (string)[];
    orderBy?: string
  } = {
    pageSize: 10,
    start: 0
  }) {
    const Todo = await this.getClass();
    const res = await Todo.query(opts);

    this.store.dispatch({
      type: ACTION.LOAD_SUCCESS,
      payload: {
        items: res.entities,
        count: res._count
      }
    });
  }

  remove(todo): Promise<any> {
    let dialogRef = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: { message: "Would you like to remove this entity?" }
    });

    return new Promise((resolve, reject) => {
      dialogRef.afterClosed().subscribe(async isYes => {
        if(isYes){
          await todo.delete();

          this.store.dispatch({
            type: ACTION.REMOVE_ONE,
            payload: todo
          });

          this.getAll();
        }

        resolve(isYes);
      });
    });
  }
}
