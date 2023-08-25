import { Injectable } from "@angular/core";
import { Action, State, StateContext, Store } from "@ngxs/store";
import { books } from "src/app/models/books";
import { APP_DEFAULT_STATE } from "../app.state-utils";
import { Observable, catchError, throwError, tap } from "rxjs";
import { GetAllBooks, SearchBooks, addToCart, filterBooks, getCartItems, login, removeCartItem } from "../actions/app.actions";
import { Appservice } from "src/app/service/appservice.service";
import { Navigate } from "@ngxs/router-plugin";
import { users } from "src/app/models/users";
import { Cart } from "src/app/models/Cart";

export interface AppStateModel {
  extenderPrice: number;
  routerPrice: number;
  Books: books[];
  title: string,
  authers: string,
  shortDescription: string,
  thumbnailUrl: string,
  category: string,
  rating: Number,
  review: string,
  price: Number
  isAbsolute: boolean;
  salesPersonName: string;
  salesPersonEmail: string;
  speedAvailable: string;
  addressDetails: [];
  isInitialGetMyLocation: boolean;
  addressData: [];
  apiCallStatus: boolean
  isArcGisFalied: boolean;
  intsallPrice: number;
  isAutherized: boolean;
  userData: users[];
  cartItems : Cart[];
}

@Injectable()
@State<AppStateModel>({
  name: 'app',
  defaults: APP_DEFAULT_STATE
})
export class AppState {
  constructor(private store: Store, private appService: Appservice) { }
  @Action(GetAllBooks)
  GetAllBooks({ patchState, dispatch }: StateContext<AppStateModel>, { pageNumber }: any): Observable<any> {
    return this.appService.getAllBooks(pageNumber).pipe(
      catchError((error) => {
        return throwError(error);
      }),
      tap((data) => {
        let AllBooks: books[] = [];
        data?.map((r: any) => {
          AllBooks.push({_id: r._id , title: r.title, authers: r.authers, shortDescription: r.shortDescription, thumbnailUrl: r.thumbnailUrl, category: r.category, rating: r.rating, review: r.review, price: r.price });
        })

        patchState({
          Books: AllBooks
        })
        dispatch(new Navigate(['dashboard']));
      })

    );
  }

  @Action(SearchBooks)
  SearchBooks({ patchState }: StateContext<AppStateModel>, { query }: any): Observable<any> {
    return this.appService.serach(query).pipe(
      catchError((error) => {
        return throwError(error);
      }),
      tap((data) => {
        patchState({
          Books: data?.records?.map((r: any) => {
            return { title: r.title, authers: r.authers, shortDescription: r.shortDescription, thumbnailUrl: r.thumbnailUrl, category: r.category, rating: r.rating, review: r.review, price: r.price };
          })
        })
      })
    );
  }

  @Action(filterBooks)
  filterBooks({ patchState }: StateContext<AppStateModel>, { query }: any): Observable<any> {
    console.log(query);

    return this.appService.filterBooks(query).pipe(
      catchError((error) => {
        return throwError(error);
      }),
      tap((data) => {
        patchState({
          Books: data?.records?.map((r: any) => {
            return { title: r.title, authers: r.authers, shortDescription: r.shortDescription, thumbnailUrl: r.thumbnailUrl, category: r.category, rating: r.rating, review: r.review, price: r.price };
          })
        })
      })
    );
  }

  @Action(addToCart)
  addToCart({ patchState }: StateContext<AppStateModel>, { userId, body }: any): Observable<any> {
    
    console.log(userId,body);
    
    return this.appService.addToCart(userId, body).pipe(
      catchError((error) => {
        return throwError(error);
      }),
      tap((data) => {
        return data;
      })
    );
  }

  @Action(getCartItems)
  getCartItems({ patchState ,dispatch}: StateContext<AppStateModel>, { userId }: any): Observable<any> {
    return this.appService.getAllCartItems(userId).pipe(
      catchError((error) => {
        return throwError(error);
      }),
      tap((data) => {
        let cartItem: Cart[] = [];
        console.log(data);
        
        data?.cart?.products?.map((r: any) => {
          cartItem.push({ productId: r.productId, quantity: r.quantity, id: r._id, total: data.cart.total });
        })
        patchState({
          cartItems: cartItem
        })

        
        dispatch(new Navigate(['cart']));

      })
    );
  }

  @Action(removeCartItem)
  removeCartItem({ patchState ,dispatch}: StateContext<AppStateModel>, { userId, body }: any): Observable<any> {
    console.log(body);
    
    return this.appService.removeCartItem(userId, body).pipe(
      catchError((error) => {
        return throwError(error);
      }),
      tap((data) => {
        console.log(data);
        return data;
      })
    );
  }

  @Action(login)
  login({ patchState ,dispatch}: StateContext<AppStateModel>, { body }: any): Observable<any> {

    return this.appService.login(body).pipe(
      catchError((error) => {
        return throwError(error);
      }),
      tap((data) => {
        console.log(data);
        let usersData: users[] = [];
        localStorage.setItem('token',data.token);
        usersData.push({ username: data.user.username, email: data.user.email, id: data.user._id, token: data.token });
        patchState({
          userData: usersData
        })
        dispatch(new Navigate(['dashboard']));
      })
    );
  }
}

