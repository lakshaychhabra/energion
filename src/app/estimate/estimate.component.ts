import { Component, OnInit } from '@angular/core';
import { TitleService } from '../title.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MapComponent } from './map/map.component';
import { NotificationService } from '../alerts/notification.service';

@Component({
  selector: 'app-estimate',
  templateUrl: './estimate.component.html',
  styleUrls: ['./estimate.component.css']
})
export class EstimateComponent implements OnInit {
  loading: boolean = false;

  constructor(
    private title: TitleService,
    private fb: FormBuilder,
    private http: HttpClient,
    private modalService: NgbModal,
    private notif: NotificationService
  ) { }

  estForm: FormGroup = this.fb.group({
    address: ['', Validators.required],
    capacity: ['', Validators.required]
  });

  getEstimate() {
    this.loading = true;
    this.http.post('/api/matrix/est', this.estForm.value).subscribe(
      (res: any) => {
        if (res.success) {
          this.loading = false;
          const modalRef = this.modalService.open(MapComponent, { size: 'lg' });
          modalRef.componentInstance.data = res.nodes;
        }
        else {
          this.loading = false;
          this.notif.fire('warning', res.msg);
        }
      },
      (err) => {
        this.loading = false;
        this.notif.fire('danger', err.message);
      }
    );
  }

  ngOnInit() {
    this.title.setTitle('Get Estimate | Energion');
  }
}
