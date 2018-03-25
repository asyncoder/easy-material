import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

// import { NavMenuModule } from "./modules/nav-menu";
import { DataTableModule } from "./modules/data-table";
// import { DialogBoxModule } from "./modules/dialog-box";
// import { DataFormModule } from "./modules/data-form";

// import { DataService } from "./data.service";

// import { ExampleNavMenuComponent } from "./examples/nav-menu/example-nav-menu.component";
// import { ExampleDataTableComponent } from "./examples/data-table/example-data-table.component";

import { AppComponent } from "./app.component";
import { AppService } from "./app.service";

@NgModule({
  declarations: [
    AppComponent
    //ExampleNavMenuComponent,
    // ExampleDataTableComponent
  ],
  exports: [
    //ExampleNavMenuComponent,
    // ExampleDataTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    // NavMenuModule,
    DataTableModule
    // DialogBoxModule,
    // DataFormModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule {}
