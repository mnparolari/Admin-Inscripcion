import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from 'src/app/core/services/spinner.service';


@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.scss']
})
export class TutorialsComponent implements OnInit, OnDestroy {
  showSpinner = true;
  private subscription!: Subscription;

  constructor(private spinner: SpinnerService) { }

  ngOnInit(): void {
    this.subscription = this.spinner.getSpinner().subscribe((show: boolean) => {
      this.showSpinner = show;
    });
    this.spinner.show();
    this.spinner.hide();
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };
}
