import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, 
  IonButton, IonButtons, IonIcon, IonLabel, IonCheckbox, IonInput } 
from '@ionic/angular/standalone';
import { IndexedsvcService } from '../services/indexedsvc.service';
import { addIcons } from 'ionicons';
import { trashOutline, add } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TodoItem {
  id?: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule,
    IonLabel, IonIcon, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInput, IonButton, IonCheckbox],
})
export class HomePage implements OnInit {

  todos: TodoItem[] = [];
  newTodotext: string = "";

  constructor(
    private indexsvc: IndexedsvcService
  ) {
    addIcons({trashOutline, add})
  }

 ngOnInit(): void {
    this.loadTodos();
 }

 loadTodos(): void {
  this.indexsvc.getTodo().subscribe({
    next: (data) => {
      this.todos = data;
      console.log("Tareas consultadas", this.todos);
    },
    error: (err) => {
      console.error("Error al consultar tareas", err)
    }
  });
 }

 addTodo(): void {
  if(this.newTodotext.trim())
  {
    const newTodo: TodoItem = {
      text: this.newTodotext.trim(),
      completed: false
    }

    this.indexsvc.addTodo(newTodo).subscribe({

      next: (addedTodo) => {
        this.todos.push(addedTodo);
        this.newTodotext = "";
        console.log("tarea registrada", addedTodo);
      },
      error: (err) => {
      console.error("Error al consultar tareas", err)
      }

    });
  }
 }

toggleCompleted(todo: TodoItem ):void {

  if(todo === undefined) return;

  const updated = {...todo, completed: !todo.completed};

  this.indexsvc.updateTodo(updated).subscribe({

    next: () => {

      const index = this.todos.findIndex((t) => t.id === todo.id);

      if(index > -1)
      {
        this.todos[index] = updated;
      }

      console.log("tarea actualizada", updated);

    },
     error: (err) => {
      console.error("Error al actualizar tarea", err)
      }


  });

}



deleteTodo(id: number | undefined ): void {

  if(id === undefined) return;

  this.indexsvc.deleteTodo(id).subscribe({

    next: () => {

      this.todos = this.todos.filter((todo)=> todo.id !== id);

      console.log("tarea eliminada con el id:", id);

    },
     error: (err) => {
      console.error("Error al eliminar tarea", err)
      }


  });

}


}
