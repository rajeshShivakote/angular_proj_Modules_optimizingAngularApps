import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient-model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipesService {
  recipesChanged = new Subject<Recipe[]>();
  recipeSelected = new Subject<Recipe>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'A test Recipe',
  //     'This is simply a test',
  //     'https://assets.epicurious.com/photos/5a3002b504847a34b821cb4a/1:1/w_1920,c_limit/seared-scallops-with-brown-butter-and-lemon-pan-sauce-recipe-BA-121217.jpg',
  //     [new Ingredient('Meat', 1), new Ingredient('French Fries', 2)]
  //   ),
  //   new Recipe(
  //     'A test Recipe 2',
  //     'This is simply a test',
  //     'https://assets.epicurious.com/photos/5a3002b504847a34b821cb4a/1:1/w_1920,c_limit/seared-scallops-with-brown-butter-and-lemon-pan-sauce-recipe-BA-121217.jpg',
  //     [new Ingredient('Buns', 1), new Ingredient('French Fries', 2)]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}
  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredient: Ingredient[]) {
    this.slService.addIngredient(ingredient);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, updatedRecipe: Recipe) {
    this.recipes[index] = updatedRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
