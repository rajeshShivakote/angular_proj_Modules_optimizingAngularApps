import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import {
  ActivatedRouteSnapshot,
  ResolveStart,
  RouterStateSnapshot,
  Resolve,
} from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipesService } from './recipes.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipesService
  ) {}
  resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
