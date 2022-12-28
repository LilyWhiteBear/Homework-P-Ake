import { Component, OnInit } from '@angular/core';
import { TableDataService } from 'src/app/service/table-data.service';
import { TableData } from 'src/app/utils/constant/table-data';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import { font } from "../../../assets/font/font";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  public tableData: Array<TableData> = [];
  public tableHeader: Array<any> = [];
  private doc = new jsPDF({

  });

  constructor(
    private tableDataService: TableDataService,
  ) { }

  ngOnInit(): void {
    this.tableData.splice(0, this.tableData.length);
    this.tableHeader.splice(0, this.tableHeader.length);
    this.tableDataService.GetTableData().forEach((data) => {
      this.tableData.push(data);
    });
    this.tableDataService.GetTableHeader().forEach((header) => {
      this.tableHeader.push(header);
    });
    this.CreateAutoTable(this.tableData, this.tableHeader);
  }

  private CreateAutoTable(data: Array<TableData>, header: Array<any>): void {
    this.doc.addFileToVFS("THSarabunNew.ttf", font);
    this.doc.addFont("THSarabunNew.ttf", "THSarabunNew", "normal");
    this.doc.setFont("THSarabunNew", "normal");

    let newHeader = new Array<string>;
    header.forEach((v) => {
      newHeader.push(v.name.toString());
    });

    let newData = this.convertTableData(data);

    let at = document.createElement("table");

    autoTable(this.doc, {
      html: at
    });

    autoTable(this.doc, {
      theme: 'striped',
      headStyles: { fillColor: 'gray' },
      styles: { halign: 'center', font: "THSarabunNew", fontSize: 16 },
      head: [newHeader],
      body: newData,
    });
  }

  public DownloadPDF(): void {
    this.doc.save('table.pdf');
  }

  private convertTableData(originalData: Array<TableData>): Array<Array<any>> {
    let newData = new Array<Array<any>>();
    originalData.forEach((data) => {
      let arr = Object.values(data);
      arr.forEach((v, i) => {
        if (typeof v !== "string") {
          arr[i] = v.toString();
        }
        else {
          arr[i] = v;
        }
      });
      newData.push(arr);
    });
    return newData;
  }

}
