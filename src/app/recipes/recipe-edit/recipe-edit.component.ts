import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { Ingredient } from 'src/app/shared/ingredient-model';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  receipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      console.log(this.editMode);
      this.initForm();
    });
  }
  get controls() {
    // a getter!
    console.log(this.receipeForm.get('ingredients'));

    return (<FormArray>this.receipeForm.get('ingredients')).controls;
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    this.receipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  onSubmit() {
    console.log(this.receipeForm);
    // const newRecipe = new Recipe(
    //   this.receipeForm.value['name'],
    //   this.receipeForm.value['description'],
    //   this.receipeForm.value['imagePath'],
    //   this.receipeForm.value['ingredients']
    // );
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.receipeForm.value);
    } else {
      this.recipeService.addRecipe(this.receipeForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onAddIngredient() {
    (<FormArray>this.receipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.receipeForm.get('ingredients')).removeAt(index);
  }
}
