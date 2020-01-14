import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrganizationService } from './organization.service';
import { Observable } from 'rxjs';
import { Group, GroupWithDetails } from '../model/group';
import { flatMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GroupService {

    constructor(
        private http: HttpClient, 
        private organizationService: OrganizationService) {
    }

    findAllGroupsFor(organizationName: string): Observable<Group[]> {
        return this.organizationService.getOrganizationId(organizationName).pipe(flatMap(orgId => {
            return this.http.get<Group[]>(`/admin/api/group/for/${orgId}`, {params: {showAll: "true" }});
        }))
    }

    disableGroup(group: Group): Observable<any> {
        return this.http.delete(`/admin/api/group/for/${group.organizationId}/id/${group.id}`);
    }

    create(organizationName: string, toCreate: any) {
        return this.organizationService.getOrganizationId(organizationName).pipe(flatMap(orgId => {
            toCreate.organizationId = orgId;
            return this.http.post(`/admin/api/group/for/${orgId}/new`, toCreate);
        }));
    }

    getDetailFor(group: Group): Observable<GroupWithDetails> {
        return this.http.get<GroupWithDetails>(`/admin/api/group/for/${group.organizationId}/detail/${group.id}`);
    }

}