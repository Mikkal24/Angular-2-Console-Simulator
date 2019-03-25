# Angular 2+ Console Simulator

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.0.

Pull requests welcome!

# Description

The idea behind this project is to simulate a normal command line environment within the web-browser using Angular. The console is also customizable so developers can add their own commands (functions) to their console simulator

# Demo

https://testproj12142017.firebaseapp.com/

![Demo](https://media.giphy.com/media/ctjMwnvwF8liAO980M/giphy.gif)

# Getting Started

> npm i angular2-console-simulator --save

# Example

Step 1. Add the module

```javascript
// app.module.ts
.
.
.
import { Angular2ConsoleSimulatorModule } from "angular2-console-simulator";

@NgModule({
  declarations: [...],
  imports: [..., AppRoutingModule, ...],
  providers: [...],
  bootstrap: [...]
})
export class AppModule {}
```

Step 2. Add configuration to the component you want to add the simulator too.

```javascript
// example.component.ts
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-example",
  templateUrl: "./example.component.html",
  styleUrls: ["./example.component.scss"]
})
export class ExampleComponent implements OnInit {
  consoleConfig;
  bgColor;
  constructor() {}

  ngOnInit() {
    this.consoleConfig = {
      commands: [
        {
          alias: "test",
          function: this.test.bind(this), //note that you need to bind the context to the function in order for it to have access to the required properties.
          description: "this is a test function"
        },
        {
          alias: "color",
          function: this.color.bind(this),
          description: `
          this functions changes the color of the page provided a valid color value as an argument \n
          example: "color red"
          `
        }
      ]
    };
  }

  test() {
    // the simulator overrides the browser console.log so that any console.log called within these functions is output inside the simulators log.
    console.log("test");
  }

  color(arg) {
    if (arg) {
      this.bgColor = arg[0];
    }
  }
}
```

and then inside the template...

```html
<div [ngStyle]="{ backgroundColor: bgColor }">
  <console-simulator [config]="consoleConfig"></console-simulator>
</div>
```

And that's it!
