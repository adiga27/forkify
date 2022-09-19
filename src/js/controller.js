import * as modal from './modal.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import paginationView from './view/paginationView.js';
import bookmarksView from './view/bookmarksView.js';
import addRecipeView from './view/addRecipeView.js';

import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search results
    resultsView.update(modal.getSearchResultPage());

    // 1) Updating Bookmark view
    bookmarksView.update(modal.state.bookmarks);

    // 2) Loading Recipe
    await modal.loadRecipe(id);

    // 3) Rendering recipe
    recipeView.render(modal.state.recipe);
  } catch (err) {
    // alert(err);
    recipeView.renderError();
    console.error(err);
  }
};
// controlRecipes();

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await modal.loadSearchResults(query);

    // 3) Render results
    resultsView.render(modal.getSearchResultPage());

    // 4) Render initial pagination buttons
    paginationView.render(modal.state.search);
  } catch (err) {
    console.log(err);
    // throw err;
  }
};

// controlSearchResults();

const controlPagination = function (goToPage) {
  //1) Render NEW results
  resultsView.render(modal.getSearchResultPage(goToPage));

  //2) Render NEW pagination buttons
  paginationView.render(modal.state.search);
};

const controlServing = function (newServing) {
  //Update the recipe serving (in state)
  modal.updateServings(newServing);

  //Update the recipe view
  recipeView.update(modal.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add/Remove bookmark
  if (!modal.state.recipe.bookmarked) modal.addBookmark(modal.state.recipe);
  else modal.deleteBookmark(modal.state.recipe.id);

  // 2) Update Bookmark
  recipeView.update(modal.state.recipe);

  // 3) Render Bookmarks
  bookmarksView.render(modal.state.bookmarks);
};

const controlBookmark = function () {
  bookmarksView.render(modal.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show Loading Spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await modal.uploadRecipe(newRecipe);
    console.log(modal.state.recipe);

    // Render Recipe
    recipeView.render(modal.state.recipe);

    // Success Message
    addRecipeView.renderMessage();

    // Render Bookmark View
    bookmarksView.render(modal.state.bookmarks);

    // Change ID in the URL
    window.history.pushState(null, '', `#${modal.state.recipe.id}`);
    // window.history.back();

    //Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmark);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServing);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
