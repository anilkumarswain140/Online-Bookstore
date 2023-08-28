import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Store } from '@ngxs/store';
import { setAuth } from 'src/app/store/actions/app.actions';
import { AppSelectors } from 'src/app/store/selectors/app.selectors';
import { AppStateModel } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @SelectSnapshot(AppSelectors.getAppState) appstate!: AppStateModel;

  constructor(public router: Router, private store : Store) {

  }
  ngOnInit(): void {
    if (this.appstate.role != "admin") {
      this.router.navigate(["/login"]);
      this.store.dispatch(new setAuth());
      alert("you are not autherized for this page");
    }
  }


}
