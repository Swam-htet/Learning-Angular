import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { BoardComponent } from './board.component'

@Component({
  selector: 'app-snake-ladder-demo',
  standalone: true,
  imports: [CommonModule, BoardComponent],
  template: ` <app-snake-ladder-board /> `,
})
export class SnakeLadderDemoComponent {}
