import { Selector } from "@ngxs/store";
import { AppState, AppStateModel } from "../state/app.state";
import { books } from "src/app/models/books";
import { Cart } from "src/app/models/Cart";
import { order } from "src/app/models/order";


export class AppSelectors {

  @Selector([AppState])
  static getBooks(state: AppStateModel): books[] {
    return state.Books;
  }

  @Selector([AppState])
  static getAppState(state: AppStateModel): AppStateModel {
    return state;
  }

  @Selector([AppState])
  static getCatItems(state: AppStateModel): Cart[] {
    return state.cartItems;
  }

  @Selector([AppState])
  static getBookDetails(state: AppStateModel): books[] {
    return state.productsdetails;
  }

  @Selector([AppState])
  static getOrders(state: AppStateModel): order[] {
    return state.orderItems;
  }
}