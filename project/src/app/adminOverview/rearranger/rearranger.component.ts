import { OnInit, Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragExit, CdkDragEnter } from '@angular/cdk/drag-drop';
import { ManagerDTO } from '../models/manager-dto';

@Component({
  selector: 'app-admin-rearranger',
  templateUrl: './rearranger.component.html',
  styleUrls: ['./rearranger.component.css']
})
export class AdminRearrangerComponent implements OnInit {
    managers: ManagerDTO[];
    constructor(private readonly adminService: AdminService) {}
    ngOnInit(): void {
        this.adminService.getManagers().subscribe(
            managers => {
                this.managers = managers;
            },
            error => console.log(error)
        );
    }
    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer !== event.container) {
          transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
        } else {
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        }
        console.log(event.previousContainer.data, event.container.data, this.managers)
      }
      dropped(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
         moveItemInArray(
           event.container.data, 
            event.previousIndex, 
            event.currentIndex
         )
        //  console.log(event.container.data, event.currentIndex);
        } else {
          transferArrayItem(
           event.previousContainer.data,
           event.container.data,
           event.previousIndex,
           event.currentIndex
         );
       }
    }
      entered(event: CdkDragEnter<string[]>) {
     console.log('Entered', event.item.data);
    }
    exited(event: CdkDragExit<string[]>) {
  console.log('Exited', event.item.data);
    }
}
