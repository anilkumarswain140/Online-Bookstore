import { Component } from '@angular/core';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { AppSelectors } from 'src/app/store/selectors/app.selectors';
import { AppStateModel } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  @SelectSnapshot(AppSelectors.getAppState) appstate!: AppStateModel;

}
