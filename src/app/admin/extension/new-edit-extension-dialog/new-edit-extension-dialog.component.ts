import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExtensionSupport } from 'src/app/model/extension';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExtensionService, fromPathToOrgAndEventId } from 'src/app/shared/extension.service';
import { OrganizationService } from 'src/app/shared/organization.service';
import { Organization } from 'src/app/model/organization';
import { EventService } from 'src/app/shared/event.service';

@Component({
  selector: 'app-new-edit-extension-dialog',
  templateUrl: './new-edit-extension-dialog.component.html'
})
export class NewEditExtensionDialogComponent implements OnInit {


  extensionForm: FormGroup;
  organizations: Organization[] = [];
  eventsInOrgId: {[orgId: number]: {[eventId: number]: string}} = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public extensionToEdit: ExtensionSupport,
    private dialogRef: MatDialogRef<NewEditExtensionDialogComponent>,
    private fb: FormBuilder,
    private extensionService: ExtensionService,
    private organizationService: OrganizationService,
    private eventService: EventService
    ) {}

  ngOnInit() {
    this.extensionForm = this.fb.group({
      organizationId: '-',
      eventId: '-',
      name: null,
      enabled: true,
      script: null
    });

    this.organizationService.getOrganizations().subscribe(orgs => {
      this.organizations = orgs;
    });

    if (!this.extensionToEdit) {
      this.extensionService.getSample().subscribe(res => {
        this.extensionForm.patchValue({script: res.script});
      });
    } else {
      let orgAndEventIds = fromPathToOrgAndEventId(this.extensionToEdit.path);
      if (orgAndEventIds.orgId !== undefined) {
        this.loadEventsInOrg(orgAndEventIds.orgId);
      }
      this.extensionForm.patchValue({
        organizationId: orgAndEventIds.orgId || '-',
        eventId: orgAndEventIds.eventId || '-',
        name: this.extensionToEdit.name,
        enabled: this.extensionToEdit.enabled,
        script: this.extensionToEdit.script
      });
    }
  }

  private loadEventsInOrg(orgId: number) {
    this.eventService.getEventNamesByOrgId(orgId).subscribe(res => {
      this.eventsInOrgId[orgId] = res;
    });
  }

  orgChanged() {
    let orgId = this.extensionForm.value.organizationId;
    if (orgId !== '-') {
      this.loadEventsInOrg(orgId);
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  create() {
    this.dialogRef.close();
  }

  update() {
    this.dialogRef.close();
  }
}
