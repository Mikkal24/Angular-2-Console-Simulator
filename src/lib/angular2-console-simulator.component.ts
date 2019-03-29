import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";

@Component({
  selector: "console-simulator",
  templateUrl: "./angular2-console-simulator.html",
  styleUrls: ["./angular2-console-simulator.scss"],
  host: {
    "(document:keypress)": "_handleKeyPress($event)",
    "(document:keydown)": "_handleKeyDown($event)"
  }
})
export class ConsoleSimulator implements OnInit {
  _command: string = "";
  _logHistory: string[] = [];
  _location: string = "~";
  _controller: any;
  _defaultFunctions;

  @Input("config") config: any;
  @ViewChild("terminal") terminal: ElementRef;
  constructor() {}
  ngOnInit() {
    this._controller = this.config || {commands: []};
    this._defaultFunctions = [
      {
        alias: "help",
        function: this._help.bind(this),
        description: "unsurprisingly, this is the help function"
      },
      {
        alias: "goodbye",
        function: this._goodbye.bind(this),
        description: "goodbye :("
      },
      {
        alias: "currentscript",
        function: this._currentScript.bind(this),
        description: "logs whatever script the browser is currently running"
      },
      {
        alias: "tor",
        function: this._tor.bind(this),
        description: "Like the linux 'top' command except it lists resources on the page"
      }
    ];

    this._controller.commands = this._controller.commands.concat(
      this._defaultFunctions
    );
  }

  private _handleKeyPress(event: KeyboardEvent) {
    if (event.key === "Enter") return this._executeCommand(this._command);
    this._addLetter(event.key);
  }

  private _handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case "Backspace":
        this._removeLetter();
        break;
    }
  }

  private _addLetter(letter: string) {
    this._command += letter;
  }

  private _removeLetter() {
    this._command = this._command.substring(0, this._command.length - 1);
  }

  private _log(text) {
    this._logHistory.push(text);
    setTimeout(() => {
      this.terminal.nativeElement.scrollTop = 1000000000;
    }, 100);
  }

  private _executeCommand(fullCommand: string) {
    if (fullCommand.length < 1) {
      return this._log(this._location + " > " + fullCommand);
    }
    const command = fullCommand.toLowerCase().split(" ")[0];
    this._log(this._location + " > " + fullCommand);
    this._clearCommand();
    const foundFunc = this._controller.commands.find(func => {
      return func.alias === command;
    });

    if (typeof foundFunc !== "undefined") {
      let args = fullCommand.split(" ");
      args.shift();
      const windowLog = console.log;
      console.log = this._log.bind(this);
      foundFunc.function(args);
      console.log = windowLog;
    } else {
      this._log(
        `${command}: command not found. To see the list of available commands type "help"`
      );
    }
  }

  private _clearCommand() {
    this._command = "";
  }

  private _help() {
    this._log("This is the list of available commands:");
    this._controller.commands.forEach((func, i) => {
      this._log(`${i + 1}. ${func.alias}: ${func.description}`);
    });
  }

  private _goodbye() {
    this._log("... Oh no.");
    this._log("You say Goodbye and I say Hello, hello, hello");
    this._log("I don't know why you say Goodbye I say Hello");
  }

  private _currentScript(){
    this._log(document.currentScript || "no script is currently running");
  }

  private _tor(args: string[]){
    //table of resources
    const option:string = args[0];
    const value:string = args[1];
    let entries: any[];
    this._log("Resource List")
    switch(option){
      case "-n":
      case "-name":
        entries = window.performance.getEntriesByName(value)
        
        break;
      case "-t":
      case "-type":
        entries = window.performance.getEntriesByType(value)
        break;
      default:
        entries = window.performance.getEntries()
    }
    
    entries.forEach((entry,i) => {
      this._log(`${i}: ${entry.name} | ${entry.entryType} | ${entry.duration.toFixed(2)}`)
    })
    
  }
}
