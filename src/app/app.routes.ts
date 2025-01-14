import { Routes } from '@angular/router'
import { AdminLayoutDemoComponent } from './components/demo/admin-layout/admin-layout-demo.component'
import { ContentProjectionDemoComponent } from './components/demo/content-projection/content-projection-demo.component'
import { EventHandlingDemoComponent } from './components/demo/event-handling/event-handling-demo.component'
import { FormDemoComponent } from './components/demo/form/form-demo.component'
import { HostDemoComponent } from './components/demo/host-demo/host-demo.component'
import { InputOutputDemoComponent } from './components/demo/input-output-demo/parent.component'
import { DemoParentComponent } from './components/demo/life-cycle/demo-parent.component'
import { OneWayBindingDemoComponent } from './components/demo/one-way-binding/one-way-binding-demo.component'
import { OxGameDemoComponent } from './components/demo/ox-game/ox-game-demo.component'
import { PropertyDrillingDemoComponent } from './components/demo/property-drilling/property-drilling-demo.component'
import { RxjsDemoComponent } from './components/demo/rxjs-demo/rxjs-demo.component'
import { ServiceDemoComponent } from './components/demo/service-demo/service-demo.component'
import { SignalDemoComponent } from './components/demo/signal-demo/signal-demo.component'
import { SnakeLadderDemoComponent } from './components/demo/snake-ladder/snake-ladder-demo.component'
import { TemplateDemoComponent } from './components/demo/template/template-demo.component'
import { TwoWayParentComponent } from './components/demo/two-way-binding/parent.component'
import { ViewQueryDemoComponent } from './components/demo/view-query-demo/view-query-demo.component'
import { LoginComponent } from './modules/auth/components/login/login.component'
import { AuthGuard } from './modules/auth/guards/auth.guard'
import { MainComponent } from './pages/main/main.component'
import { NotFoundComponent } from './pages/not-found/not-found.component'

export const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: 'demo',
    canActivate: [AuthGuard],
    children: [
      { path: 'admin-layout-demo', component: AdminLayoutDemoComponent },
      { path: 'content-projection-demo', component: ContentProjectionDemoComponent },
      { path: 'event-handling-demo', component: EventHandlingDemoComponent },
      {
        path: 'form-demo',
        component: FormDemoComponent,
      },
      { path: 'host-demo', component: HostDemoComponent },
      {
        path: 'input-output-demo',
        component: InputOutputDemoComponent,
      },
      { path: 'life-cycle-demo', component: DemoParentComponent },
      { path: 'one-way-binding-demo', component: OneWayBindingDemoComponent },
      { path: 'ox-game-demo', component: OxGameDemoComponent },
      { path: 'property-drilling-demo', component: PropertyDrillingDemoComponent },
      { path: 'rxjs-demo', component: RxjsDemoComponent },
      { path: 'service-demo', component: ServiceDemoComponent },
      { path: 'signal-demo', component: SignalDemoComponent },
      { path: 'snake-ladder-demo', component: SnakeLadderDemoComponent },
      { path: 'template-demo', component: TemplateDemoComponent },
      { path: 'two-way-binding-demo', component: TwoWayParentComponent },
      { path: 'view-query-demo', component: ViewQueryDemoComponent },
      { path: 'demo-module', loadChildren: () => import('./modules/todo/todo.routes').then((m) => m.TODO_ROUTES) },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  // Not found route - should be last
  {
    path: '**',
    component: NotFoundComponent,
  },
]
