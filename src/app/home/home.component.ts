
import { Application } from '../Model/application';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppService } from '../app.service';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Applications } from '../Model/client';
import { loginService } from '../service/login.service';
import { UserstoreService } from '../service/userstore.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['clientId','clientName','applicationName','serverInfo','portInfo','actions'];

  public users:any=[];
  public givenName:string=""
  formValue !: FormGroup
  allApplications:any;
  application : Applications =new Applications;

addApp:Applications={
   
  C_Id:0,
  C_Name: '',
  Application_Name: '',
  ServerInfo: '',
  PortInfo: ''
}


  
  allApplicationData:any;
  userStore: any;

  

  constructor(private http:AppService,private router:Router,
    private auth:loginService,private user: UserstoreService){
   
  }

  

  ngOnInit(): void {

      this.fetchApplicationData();

      // this.userStore.getgivenNameFromStore()
      // .subscribe((val:any)=>{
      //   let givenNameFromToken = this.auth.getgivenNameFromToken();
      //   this.givenName=val || givenNameFromToken
      // })
   
  }

  fetchApplicationData(): void {
    this.http.getApplications().subscribe(
      data => {
        console.log('Fetched data:', data);
        this.allApplicationData = data;
        console.log('allApplicationData:', this.allApplicationData);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  deleteApplication(id:number){
    this.http.deleteApplications(id).subscribe(res=>{
      alert("Application Record Deleted ")
      this.fetchApplicationData();//quick regresh the data
    })
  }
  update(id:number){
    this.router.navigate(['appEdit',id])
    
  }

}

