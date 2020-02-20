import { Component, OnInit } from '@angular/core';
import { Position } from '../data/position';
import { PositionService } from '../data/position.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {
  positions: Position[];
  getPositionSub;
  loadingError: boolean = false;

  constructor(private positionService: PositionService, private router: Router) { }

  ngOnInit() {
    this.getPositionSub = this.positionService.getPositions().subscribe(data => {
      this.positions = data;
    },
      function(err) {
        this.loadingError = true;
      });
  }

  routePosition(id: string) {
    this.router.navigate(['/position', id]);
  }

  ngOnDestroy() {
    if (this.getPositionSub) {
      this.getPositionSub.unsubscribe();
    }
  }
}

