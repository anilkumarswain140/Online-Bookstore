import { Component, OnInit } from '@angular/core';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Store } from '@ngxs/store';
import { Cart } from 'src/app/models/Cart';
import { decreaseItemFromCart, getCartItems, increaseItemFromCart, placeOrder, removeCartItem } from 'src/app/store/actions/app.actions';
import { AppSelectors } from 'src/app/store/selectors/app.selectors';
import { AppStateModel } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @SelectSnapshot(AppSelectors.getAppState) appstate!: AppStateModel;
  @SelectSnapshot(AppSelectors.getCatItems) cartItems!: Cart[];
  subtotal: number = 0;
  products: any =[];


  constructor(public store: Store) {

  }
  ngOnInit(): void {

  }

  removeCartItem(productid: any) {
    let body = {
      "productId": productid.trim()
    }
    this.store.dispatch(new removeCartItem(this.appstate.userData[0].id, body))
  }


  decreaseItemFromCart(productid: any) {
    let body = {
      "productId": productid
    }
    this.store.dispatch(new decreaseItemFromCart(this.appstate.userData[0].id, body))
  }

  increaseItemFromCart(productid: any) {
    let body = {
      "productId": productid
    }
    this.store.dispatch(new increaseItemFromCart(this.appstate.userData[0].id, body))
  }

  placeOrder() {

    this.cartItems.forEach((item: any)=>{
      this.products.push(item);
    })

   
    let body = {
      "products": 
        this.products
      ,
      "subtotal": this.appstate.subtotal

    }

    this.store.dispatch(new placeOrder(this.appstate?.userData[0].id,body))
  }
}
