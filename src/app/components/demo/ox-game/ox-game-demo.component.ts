import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { BoardComponent } from './board.component'

@Component({
  selector: 'app-ox-game-demo',
  standalone: true,
  imports: [CommonModule, BoardComponent],
  template: `
    <div class="container mx-auto p-4">
      <app-board />
    </div>
  `,
})
export class OxGameDemoComponent {}
