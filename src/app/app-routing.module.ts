import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { UsersComponent } from './users/users.component';
import { ApiKeysComponent } from './api-keys/api-keys.component';
import { GroupsComponent } from './groups/groups.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ExtensionComponent } from './extension/extension.component';


const routes: Routes = [
  { path: 'organization/:org', component: EventsComponent },
  { path: 'organization/:org/organizations', component: OrganizationsComponent },
  { path: 'organization/:org/users', component: UsersComponent },
  { path: 'organization/:org/api-keys', component: ApiKeysComponent },
  { path: 'organization/:org/groups', component: GroupsComponent },
  { path: 'organization/:org/configuration', component: ConfigurationComponent },
  { path: 'extension', component: ExtensionComponent },
  { path: 'configuration', component: ConfigurationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
