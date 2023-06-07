import { Component, Input } from '@angular/core';
import { DrawerSelectEvent } from '@progress/kendo-angular-layout';

@Component({
  selector: 'Bi-Sidebar',
  templateUrl: './bi-side-bar.component.html',
  styleUrls: ['./bi-side-bar.component.scss']
})
export class BISideBarComponent {
    public selected = "";
    @Input() items!: Array<{
      text?: string;
      icon?: string;
      path?: string;
      speratorTitle?: string;
      selected?: boolean;
      separator?: boolean;
      disabeld?: boolean,
      children?: any;
    }>;
    collapsed: any;
    // items!: Array<{
    //   text?: string;
    //   icon?: string;
    //   path?: string;
    //   speratorTitle?: string;
    //   selected?: boolean;
    //   separator?: boolean;
    //   disabeld?: boolean,
    //   children?: any;
    // }>;
  constructor(){
  }
  ngOnInit(): void {
    // this.items = [
    //   {
    //     text: "Dashboard", icon: 'assets/icons/Dashboard.svg', path:"Supervisor/screen/371"
    //   },
    //   {
    //     text: "Supervisor", icon: "assets/icons/Adminstration.svg", children: [
    //       {
    //         text: "Setup", icon: 'assets/icons/Home.svg', children: [
    //           { text: "Visit Steps", icon: 'assets/icons/Home.svg', path: "Supervisor/screen/12" },
    //           { text: "Salesman Type Visit Steps", icon: 'assets/icons/Home.svg', path: "Supervisor/screen/17" },
    //           { text: "Exceptions Configuration", icon: 'assets/icons/Home.svg', path: "Supervisor/screen/88" },
    //           { text: "Competitors", icon: 'assets/icons/Home.svg', path: "Supervisor/screen/132" },
    //           { text: "Questions", icon: 'assets/icons/Home.svg', path: "Supervisor/screen/148" },
    //           { text: "Data Collection", icon: 'assets/icons/Home.svg', path: "Supervisor/screen/150" },
    //           { text: "Online Request Settings", icon: 'assets/icons/Home.svg', path: "Supervisor/screen/203" },
    //         ]
    //       },
    //       {
    //         text: "Journals", children: [
    //           { text: "Transfer Request", path: "Supervisor/screen/1" },
    //           { text: "Pending Approvals", path: "Supervisor/screen/10" },
    //           { text: "Journey Plan", path: "Supervisor/screen/2" },
    //           { text: "Unload Requests", path: "Supervisor/screen/6" },
    //           { text: "Sales Order", path: "Supervisor/screen/28" },
    //           { text: "Simplified Sales Order", path: "Supervisor/screen/30" },
    //           { text: "Salesman Requests", path: "Supervisor/screen/40" },
    //           { text: "Exceptions", path: "Supervisor/screen/80" },
    //           { text: "Salesman Route", path: "Supervisor/screen/143" },
    //           { text: "Review Captured Images", path: "Supervisor/screen/209" },
    //           { text: "Online requests", path: "Supervisor/screen/204" },
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     text: "Inventory Management", icon: "assets/icons/InventoryManagement.svg", children: [
    //       {
    //         text: "Setup", children: [
    //           {
    //             text: "Warehouse", children: [
    //               { text: "Warehouse Definition", path: "Supervisor/screen/202" }
    //             ]
    //           },
    //           {
    //             text: "Manufacturer", path: "Supervisor/screen/181"
    //           }
    //         ]
    //       },
    //       {
    //         text: "Journals", children: [
    //           {
    //             text: "Salesman Stock Count", path: "Supervisor/screen/219"
    //           },
    //           {
    //             text: "Inventory Transaction", path: "Supervisor/screen/211"
    //           }
    //         ]
    //       }
    //     ]
    //   },
    //   { separator: true },
    //   {
    //     text: "Reports", icon: "assets/icons/AccountsReceivable.svg", children: [
    //       {
    //         text: "Report Configuration", path: "Supervisor/screen/245"
    //       },
    //       {
    //         text: "visitPr", path: "Supervisor/screen/392"
    //       }
    //     ]
    //   },
    //   {
    //     text: "General Ledger", icon: "assets/icons/GeneralLedger.svg", children: [
    //       {
    //         text: "Journals", children: [
    //           { text: "General Journal", path: "Supervisor/screen/222?Module=0" }
    //         ]
    //       }
    //     ]
    //   },
    //   { separator: true },
    //   {
    //     text: "Accounts Receivable", icon: "assets/icons/AccountsReceivable.svg", children: [
    //       {
    //         text: "Setup", children: [
    //           {
    //             text: "Customer", children: [
    //               {
    //                 text: "Customer Categories", path: "Supervisor/screen/202"
    //               }
    //             ]
    //           },
    //           {
    //             text: "Geography", children: [
    //               {
    //                 text: "Region", path: "Supervisor/screen/372"
    //               }
    //             ]
    //           },
    //           {
    //             text: "Employee", children: [
    //               {
    //                 text: "HH_AR_SalesmenCats", path: "Supervisor/screen/373"
    //               },
    //               {
    //                 text: "Salesman Day Opening", path: "Supervisor/screen/244"
    //               }
    //             ]
    //           },
    //           {
    //             text: "VisitManagement", children: [
    //               {
    //                 text: "HH_ReturnReasons", path: "Supervisor/screen/375"
    //               }
    //             ]
    //           },
    //           {
    //             text: "CDA Lists", path: "Supervisor/screen/167"
    //           },
    //           {
    //             text: "Reasons", path: "Supervisor/screen/163"
    //           },
    //           {
    //             text: "Rebate group", path: "Supervisor/screen/164"
    //           },
    //           {
    //             text: "Target Net Revenue", path: "Supervisor/screen/155"
    //           },
    //           {
    //             text: "Employee Definition", path: "Supervisor/screen/210"
    //           }
    //         ]
    //       },
    //       {
    //         text: "Journals", children: [
    //           {
    //             text: "Sales Order",  path: "Supervisor/screen/256"
    //           },
    //           {
    //             text: "General Journal", path: "Supervisor/screen/222?Module=1"
    //           }
    //         ]
    //       },
    //       {
    //         text: "Periodic", children: [
    //           {
    //             text: "Stock Check Availablity", path: "Supervisor/screen/351"
    //           }
    //         ]
    //       },
    //       {
    //         text: "Sales Order", path: "Supervisor/screen/256"
    //       }
    //     ]
    //   },
    //   {
    //     text: "Accounts Payable", icon: "assets/icons/Accounts Payable.svg", children: [
    //       {
    //         text: "Journals", children: [
    //           {
    //             text: "Purchase Order",  path: "Supervisor/screen/371"
    //           },
    //           {
    //             text: "General Journal", path: "Supervisor/screen/222?Module=2"
    //           }
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     text: "Tools", icon: "assets/icons/AccountsReceivable.svg", children: [
    //       {
    //         text: "Import", path: "Supervisor/screen/11"
    //       },
    //       {
    //         text: "Competition", path: "Supervisor/screen/22"
    //       }
    //     ]
    //   }
    // ];
    // this.items = [
    //   { text: "Home", icon: 'assets/icons/Home.svg' },
    //   { text: "Recent", icon: "assets/icons/Recent.svg" },
    //   { text: "Favourite", icon: "assets/icons/Favorite.svg" },
    //   { separator: true },
    //   {text: "My data", disabled}
    //   { text: "Dashboard", icon: "assets/icons/Dashboard.svg" },
    //   { text: "Activites", icon: "assets/icons/Activities.svg" },
    //   { separator: true, text: "MODULES" },
    //   {text: "Adminstration", icon: "assets/icons/Adminstration.svg"},
    //   {text: "Accounts Receivable", icon: "assets/icons/AccountsReceivable.svg"},
    //   {text: "Merchandising", icon: "assets/icons/Merchandising.svg"},
    //   {text: "Inventory Management", icon: "assets/icons/InventoryManagement.svg"},
    //   {text: "General Ledger", icon: "assets/icons/GeneralLedger.svg"},
    //   {text: "Accounts Payable", icon: "assets/icons/Accounts Payable.svg"},
    //   {text: "Point of Sale", icon: "assets/icons/Point of Sale.svg"},
    //   {text: "Sales Commissions", icon: "assets/icons/Sales Commissions.svg"},
    //   {text: "Fixed Assets", icon: "assets/icons/Fixed Assets.svg"},
    //   {text: "Fleet Integration", icon: "assets/icons/Fleet Integration.svg"},
    //   {text: "Field Service", icon: "assets/icons/Field Service.svg"},
    // ];
  }
    
    public onSelect(ev: DrawerSelectEvent): void {
      this.collapsed = true;
      this.selected = ev.item.text;
    }
    changeBackGround(): void{
  this.collapsed = !this.collapsed;
    }
}
