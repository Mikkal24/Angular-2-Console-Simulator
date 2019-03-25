import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ConsoleSimulator } from "./angular2-console-simulator.component";
import { BlinkerComponent } from "./components/blinker/blinker.component";

@NgModule({
  declarations: [ConsoleSimulator, BlinkerComponent],
  imports: [BrowserModule],
  exports: [ConsoleSimulator]
})
export class Angular2ConsoleSimulatorModule {}
