import { getActionTypeFromInstance } from "@ngxs/store";
import { AppStateModel } from "./state/app.state"
import { ClearState } from "./actions/app.actions";

export const APP_DEFAULT_STATE: AppStateModel = {
  extenderPrice: 0,
  routerPrice: 0,
  Books: [],
  isAbsolute: false,
  isAutherized: false,
  title: "",
  authers: "",
  shortDescription: "",
  thumbnailUrl: "",
  category: "",
  rating: 0,
  review: "",
  price: 0,
  userData: [],
  cartItems: [],
  isInitialGetMyLocation: false,
  addressData: [],
  productsdetails: [],
  role: ''
}

export function logoutPlugin(state: any, action: any, next: any): void {
    if (getActionTypeFromInstance(action) === ClearState.type) {
      state = {
        app: APP_DEFAULT_STATE
      };
    }
  
    return next(state, action);
  }