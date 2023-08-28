import { Injectable } from "@angular/core";
import { Action, State, StateContext, Store } from "@ngxs/store";
import { books } from "src/app/models/books";
import { APP_DEFAULT_STATE } from "../app.state-utils";
import { Observable, catchError, throwError, tap } from "rxjs";
import { GetAllBooks, SearchBooks, addBook, addToCart, decreaseItemFromCart, filterBooks, findBookById, getCartItems, increaseItemFromCart, login, placeOrder, removeCartItem, setAuth } from "../actions/app.actions";
import { Appservice } from "src/app/service/appservice.service";
import { Navigate } from "@ngxs/router-plugin";
import { users } from "src/app/models/users";
import { Cart } from "src/app/models/Cart";
import { order } from "src/app/models/order";

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
  isInitialGetMyLocation: boolean;
  addressData: [];
  isAutherized: boolean;
  userData: users[];
  cartItems: Cart[];
  productsdetails: books[];
  role: any;
  subtotal: any;
  orderItems : order[];
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
          AllBooks.push({ _id: r._id, title: r.title, authers: r.authers, shortDescription: r.shortDescription, thumbnailUrl: r.thumbnailUrl, category: r.category, rating: r.rating, review: r.review, price: r.price });
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



    return this.appService.addToCart(userId, body).pipe(
      catchError((error) => {
        alert(JSON.stringify(error.error.message));
        return throwError(error);
      }),
      tap((data) => {
        alert("added to cart");
        return data;
      })
    );
  }

  @Action(getCartItems)
  getCartItems({ patchState, dispatch }: StateContext<AppStateModel>, { userId }: any): Observable<any> {
    return this.appService.getAllCartItems(userId).pipe(
      catchError((error) => {
        alert(JSON.stringify(error.error.message));
        return throwError(error);
      }),
      tap((data) => {
        let cartItem: Cart[] = [];
        let subtotal : any=0;
        data?.cart?.products?.map((r: any) => {
          subtotal += r.total;
          cartItem.push({ productId: r.productId, producttitle: r.producttitle, quantity: r.quantity, id: r._id, total: r.total, productimage: r.productimage, rating: r.rating, productprice: r.productprice , subtotal: data?.cart?.subtotal});
        })
        patchState({
          cartItems: cartItem,
          subtotal: subtotal
        })


        dispatch(new Navigate(['cart']));

      })
    );
  }

  @Action(removeCartItem)
  removeCartItem({ patchState, dispatch }: StateContext<AppStateModel>, { userId, body }: any): Observable<any> {

    return this.appService.removeCartItem(userId, body).pipe(
      catchError((error) => {
        alert(JSON.stringify(error.error.message));
        return throwError(error);
      }),
      tap((data) => {
        let cartItem: Cart[] = [];
        let subtotal : any=0 ;
        data?.updatedCart?.products?.map((r: any) => {
          subtotal += r.total;
          cartItem.push({ productId: r.productId, producttitle: r.producttitle, quantity: r.quantity, id: r._id, total: r.total, productimage: r.productimage, rating: r.rating, productprice: r.productprice,subtotal: data?.cart?.subtotal });
        })
          
        patchState({
          cartItems: cartItem,
          subtotal : subtotal
        })
        alert("removed")
      })
    );
  }

  @Action(login)
  login({ patchState, dispatch }: StateContext<AppStateModel>, { body }: any): Observable<any> {

    return this.appService.login(body).pipe(
      catchError((error) => {
        alert(JSON.stringify("email or password is wrong try again"));
        return throwError(error);
      }),
      tap((data) => {
        let usersData: users[] = [];
        localStorage.setItem('token', data.token);
        usersData.push({ username: data.user.username, email: data.user.email, id: data.user._id, token: data.token });
        patchState({
          userData: usersData,
          isAutherized: true,
          role: data.user.role
        })
        if (data.user.role == 'admin') {
          dispatch(new Navigate(['admindashboard']));
        }
        else {
          dispatch(new Navigate(['dashboard']));
        }

      })
    );
  }

  @Action(findBookById)
  findBookById({ patchState, dispatch }: StateContext<AppStateModel>, { bookid }: any): Observable<any> {

    return this.appService.findBookById(bookid).pipe(
      catchError((error) => {
        alert(JSON.stringify(error.error.message));

        return throwError(error);
      }),
      tap((data) => {
  
        let pdetails: books[] = [];
        pdetails.push({ _id: data.doc._id, title: data.doc.title, authers: data.doc.authers, shortDescription: data.doc.shortDescription, thumbnailUrl: data.doc.thumbnailUrl, category: data.doc.category, rating: data.doc.rating, review: data.doc.review, price: data.doc.price });
        patchState({
          productsdetails: pdetails
        })
        dispatch(new Navigate(['productdetails']));

      })
    );
  }


  @Action(setAuth)
  setAuth({ patchState }: StateContext<AppStateModel>): any {

    patchState({
      isAutherized: false
    })
  }

  @Action(decreaseItemFromCart)
  decreaseItemFromCart({ patchState, dispatch }: StateContext<AppStateModel>, { userId, body }: any): Observable<any> {
    return this.appService.decreaseItemFromCart(userId, body).pipe(
      catchError((error) => {
        alert(JSON.stringify(error.error.message));
        return throwError(error);
      }),
      tap((data) => {
        let cartItem: Cart[] = [];
        let subtotal : any=0;
        data?.updatedCart?.products?.map((r: any) => {
          subtotal += r.total;
          cartItem.push({ productId: r.productId, producttitle: r.producttitle, quantity: r.quantity, id: r._id, total: r.total, productimage: r.productimage, rating: r.rating, productprice: r.productprice ,subtotal: data?.cart?.subtotal});
        })
        patchState({
          cartItems: cartItem,
          subtotal: subtotal
        })
      })
    );
  }

  @Action(increaseItemFromCart)
  increaseItemFromCart({ patchState, dispatch }: StateContext<AppStateModel>, { userId, body }: any): Observable<any> {

    return this.appService.increaseItemFromCart(userId, body).pipe(
      catchError((error) => {
        alert(JSON.stringify(error.error.message));
        return throwError(error);
      }),
      tap((data) => {
        let cartItem: Cart[] = [];
        let subtotal : any=0;
        data?.updatedCart?.products?.map((r: any) => {
          subtotal += r.total;
          cartItem.push({ productId: r.productId, producttitle: r.producttitle, quantity: r.quantity, id: r._id, total: r.total, productimage: r.productimage, rating: r.rating, productprice: r.productprice ,subtotal: data?.cart?.subtotal});
        })
        patchState({
          cartItems: cartItem,
          subtotal: subtotal
        })
      })
    );
  }


  @Action(addBook)
  addBook({ patchState, dispatch }: StateContext<AppStateModel>, { body }: any): Observable<any> {
    return this.appService.addBook(body).pipe(
      catchError((error) => {
        alert(JSON.stringify(error.error.message));
        return throwError(error);
      }),
      tap((data) => {
        alert("added book");
        return data;
      })
    );
  }

  @Action(placeOrder)
  placeOrder({ patchState, dispatch }: StateContext<AppStateModel>, { userId,body }: any): Observable<any> {
    return this.appService.placeOrder(userId,body).pipe(
      catchError((error) => {
        alert(JSON.stringify(error.error.message));
        return throwError(error);
      }),
      tap((data) => {
        let orderItems: order[] = [];
        data?.products?.map((r: any) => {
          orderItems.push({ productId: r.productId, producttitle: r.producttitle, quantity: r.quantity, total: r.total, productimage: r.productimage,  productprice: r.productprice ,subtotal: data?.subtotal});
        })
        patchState({
          orderItems: orderItems,
        })
        dispatch(new Navigate(['placeorder']))
      })
    );
  }
}



