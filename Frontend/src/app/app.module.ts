import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Appservice } from './service/appservice.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { httpInterceptor } from './service/http.interceptor';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { NGXS_PLUGINS, NgxsModule } from '@ngxs/store';
import { AppState } from './store/state/app.state';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { logoutPlugin } from './store/app.state-utils';
import { MatRadioModule } from '@angular/material/radio';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthGuard } from './service/auth.guard';
import { SharedModule } from './shared/shared.module';








@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    MatSidenavModule,
    MatRadioModule,
    NgxsStoragePluginModule.forRoot(),
    NgxsModule.forRoot([
      AppState
    ]),
    NgxsSelectSnapshotModule,
    NgxsRouterPluginModule.forRoot(),
    MatDialogModule,
    SharedModule

  ],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    
  ],
  providers: [Appservice, AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: httpInterceptor, multi: true }, { provide: NGXS_PLUGINS, useValue: logoutPlugin, multi: true }],
  bootstrap: [HomeComponent]
})
export class AppModule { }
