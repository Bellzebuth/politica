import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';

import { UsersComponent } from './components/users/users.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';


import { CalendarModule } from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    UsersComponent,
    MenuAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CalendarModule,
    FormsModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    InputTextModule,
  ]
})
export class RootModule { }
