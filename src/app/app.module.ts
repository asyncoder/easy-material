import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";

import { ExampleModule } from "./examples";
import { ExampleService } from "./examples/example.service";

@NgModule({
  declarations: [AppComponent],
  exports: [],
  imports: [BrowserModule, ExampleModule],
  providers: [ExampleService],
  bootstrap: [AppComponent]
})
export class AppModule {}
