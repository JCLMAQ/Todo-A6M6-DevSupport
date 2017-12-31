import { Component, ViewChild } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';
import { ACTION, IState, ITodo, IAppState } from "../shared/todo.reducer";
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TodoService } from '../shared/todo.service';
import { ConfirmComponent } from '../shared/confirm/confirm.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent{
  cols: string[] = ['ID', 'description', 'done', 'tools'];
  todos$: Observable<IState>;
  todos: MatTableDataSource<ITodo> = new MatTableDataSource<ITodo>([]);
  current: ITodo;
  count: number = 0;
  editable: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private store: Store<IAppState>,
    private todoService: TodoService
  ) {
    this.refresh();
    this.todos$ = store.select('todo');

    this.todos$.subscribe(res => {
      this.current = res.current;
      this.todos.data = res.list;
      this.count = res.count;
    });
  }

  onSort(a,b,c) {
    let qOptions: any = {
      pageSize: 10,
      start: 0
    };

    if(this.sort.direction){
      qOptions.orderBy = this.sort.active + ' ' + this.sort.direction
    }

    this.todoService.getAll(qOptions);
  }

  refresh() {
    this.todoService.getAll();
  }

  select(todo) {
    this.store.dispatch({
      type: ACTION.SELECT,
      payload: todo
    });
  }

  async remove(todo) {
    const isRemoved = await this.todoService.remove(todo);
    if (isRemoved) {
      this.refresh();
    }
  }

  onNavigate(p) {
    this.todoService.getAll({
      pageSize: p.pageSize,
      start: p.pageSize*p.pageIndex
    });
  }

  async save(todo){
    const isSaved = await todo.save();
    this.editable = false;
    if (isSaved) {
      this.refresh();
    }
  }

  search(value: string, $ev){
    if(
      ($ev.keyCode >= 48 && $ev.keyCode <= 57) ||
      ($ev.keyCode >= 65 && $ev.keyCode <= 90) ||
      ([8].indexOf($ev.keyCode) >= 0)
    ){
      this.todoService.getAll({
        pageSize: 10,
        start: 0,
        filter: "description == :1",
        params: [`*${value}*`]
      });
    }
  }
  async create(todo){
    const Todo = await this.todoService.getClass();
    this.current = Todo.create();
    this.editable = true;
    //this.refresh();
  }
}
