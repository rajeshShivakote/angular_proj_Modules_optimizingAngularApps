import { EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient-model';

export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>();
  startedEdition = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngreditents() {
    return this.ingredients.slice();
  }
  addIngredients(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }
  addIngredient(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }
  getIngredient(index: number) {
    return this.ingredients[index];
  }
  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }
  deleteIngredient(index: number) {
    console.log(index);

    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
