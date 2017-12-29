import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITodo } from '../shared/todo.reducer';
import { TodoService } from '../shared/todo.service';
import { ConfirmComponent } from '../shared/confirm/confirm.component';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit {
  editable: boolean = false;
  current: ITodo = {
    ID: "123",
    description: "Hello",
    done: false
  };

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(async p => {
      const Todo = await this.todoService.getClass();
      this.current = await Todo.find(p.id);
    });

    this.route.data.subscribe(d => {
      this.editable = d.editable;
    });
  }

  async save(todo){
    await todo.save();
    this.router.navigate(["/todos"]);
  }

  async remove(todo){
    await this.todoService.remove(todo);
    this.router.navigate(["/todos"]);
  }

  async create(todo){
    const Todo = await this.todoService.getClass();
    this.current = Todo.create();
  }
}
