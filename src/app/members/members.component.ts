import { Component, VERSION, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Toast } from 'bootstrap';
import { MembersService } from './members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  public memberRoles: any = [];
  public totalMembers: number = 0;
  public memberData: any = [];
  @ViewChild('closeModalbtn')
  closeModalbtn!: ElementRef;
  @ViewChild('myToast', { static: true })
  toastEl!: ElementRef;
  toast: any
  inviteEmail: string = '';
  selectedMember: string = '';
  teamId: string = '57994f271ca5dd20847b910c';
  toastMessage: string = 'The Url has been copied';
  inviteUrl: string = '';

  constructor(private memberService: MembersService) { }

  ngOnInit(): void {

    this.toast = new Toast(this.toastEl.nativeElement, {})




    this.memberData = {
      "id": "57994f271ca5dd20847b910c",
      "member": {
        "total": 17,
        "administrator": 1,
        "managers": 2,
        "Editors": 3,
        "members": 10,
        "supporters": 1
      },
      "plan": {
        "memberLimit": 100,
        "supporterLimit": 5
      }
    }

    this.memberRoles = this.memberService.memberRoles;

    this.getTeamsData(this.teamId);

    this.totalMembers = this.memberData.member.managers + this.memberData.member.managers
      + this.memberData.member.Editors + this.memberData.member.members;

  }

  getTeamsData(teamId: string) {
    this.memberService.getTeamMembersData(teamId).subscribe(
      res => {

        // assuming the response

        res.data = {
          "id": "57994f271ca5dd20847b910c",
          "member": {
            "total": 17,
            "administrator": 1,
            "managers": 2,
            "Editors": 3,
            "members": 10,
            "supporters": 1
          },
          "plan": {
            "memberLimit": 100,
            "supporterLimit": 5
          }
        }
        this.memberData = res.data;
      }, err => {
        this.toastMessage = 'Error while fetching data';
      });

  }


  changeRole(e: any) {
    let memberRole = {
      "role": e.target.value
    }
    this.memberService.fetchInvitationUrl(this.teamId, memberRole).subscribe(
      res => {
        // assuming the response
        res = {
          "url": "https://example.com/ti/eyJpbnZpdGVJZ"
        }
        this.inviteUrl = res.url;
      }, err => {
        this.toastMessage = 'Error retrieving url';
      }
    )
    // assuming the response with invitaion url
    this.inviteUrl = 'https://example.com/ti/eyJpbnZpdGVJZ';
  }

  copyToClipboard() {
    this.toast.show();
    setTimeout(() => {
      this.toast.hide();
    }, 5000);
    var el = <HTMLInputElement>document.querySelector('#inputUrl')
    el.setAttribute('contenteditable', 'true');
    el.focus();
    document.execCommand('selectAll');
    document.execCommand('copy');
    el.setAttribute('contenteditable', 'false');
    el.blur();
    this.toastMessage = 'The Url has been copied';

  }

  sendMail() {
    let closeModal = <HTMLButtonElement>document.querySelector('#closeModalbtn');
    closeModal.click();
    window.open("mailto:" + this.inviteEmail + "?subject=hello&body=fggf", '_self');
    this.inviteEmail = '';
  }


}
