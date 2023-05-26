import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipesService,
    private authService: AuthService
  ) {}
  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http
      .put(
        'https://ng-course-recipe-book-8571e-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  //   fetchRecipes() {
  //     return this.authService.user.pipe(
  //       take(1),
  //       exhaustMap((user) => {
  //         return this.http.get<Recipe[]>(
  //           'https://ng-course-recipe-book-8571e-default-rtdb.firebaseio.com/recipes.json',
  //           {
  //             params: new HttpParams().set('auth', user.token),
  //           }
  //         );
  //       }),
  //       map((recipes) => {
  //         return recipes.map((recipe) => {
  //           return {
  //             ...recipe,
  //             ingredients: recipe.ingredients ? recipe.ingredients : [],
  //           };
  //         });
  //       }),
  //       tap((recipes) => {
  //         this.recipeService.setRecipes(recipes);
  //       })
  //     );
  //   }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-course-recipe-book-8571e-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
