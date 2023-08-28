import { Component, OnInit } from '@angular/core';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { order } from 'src/app/models/order';
import { AppSelectors } from 'src/app/store/selectors/app.selectors';
import { AppStateModel } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @SelectSnapshot(AppSelectors.getOrders) orderItems!: order[];
  @SelectSnapshot(AppSelectors.getAppState) appstate!: AppStateModel[];


  ngOnInit(): void {

  }

}
