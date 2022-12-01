import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';

import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list'
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ChatComponent } from './components/chat/chat.component';
import { SelectComponent } from './components/select/select.component';
import { GaugeComponent } from './components/gauge/gauge.component';
import { LinechartComponent } from './components/linechart/linechart.component';
import { LoginSuccessComponent } from './dialog/login-success/login-success.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    ChatComponent,
    SelectComponent,
    GaugeComponent,
    LinechartComponent,
    LoginSuccessComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgApexchartsModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    ChatComponent,
    SelectComponent,
    GaugeComponent,
    LinechartComponent,
    LoginSuccessComponent,
  ]
})
export class SharedModule { }
