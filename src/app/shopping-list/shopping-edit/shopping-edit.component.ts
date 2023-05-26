import {
  Component,
  ViewChild,
  // ElementRef,
  // EventEmitter,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient-model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private shoppinlistservice: ShoppingListService) {}
  ngOnInit(): void {
    this.subscription = this.shoppinlistservice.startedEdition.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppinlistservice.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }
  onAddItem(form: NgForm) {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppinlistservice.updateIngredient(
        this.editedItemIndex,
        newIngredient
      );
      this.editMode = false;
      this.slForm.reset();
      return;
    }
    this.shoppinlistservice.addIngredients(newIngredient);
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete() {
    console.log(this.editedItemIndex);

    this.shoppinlistservice.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
