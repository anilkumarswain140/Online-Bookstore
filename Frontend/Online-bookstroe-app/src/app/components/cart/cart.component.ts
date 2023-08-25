import { Component, OnInit } from '@angular/core';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Store } from '@ngxs/store';
import { Cart } from 'src/app/models/Cart';
import { getCartItems, removeCartItem } from 'src/app/store/actions/app.actions';
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


  constructor(public store: Store) {

  }
  ngOnInit(): void {
    console.log(this.cartItems);
    
  }

  removeCartItem(productid : any){
   
    
    let body = {
      "productId": productid
   }
   console.log(body);
    this.store.dispatch(new removeCartItem(this.appstate.userData[0].id,body))
  }
  
}
