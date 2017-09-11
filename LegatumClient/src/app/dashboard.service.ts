import { Injectable } from '@angular/core';
import { Contract } from './models/contract/contract.interface';
import { UserInfo } from './models/user-info/user-info.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { Observer } from 'rxjs/Observer';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';
import { 
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot} from '@angular/router';

@Injectable()
export class DashboardService {

  userInfo: UserInfo = {
    admin: false,
    createdAt: '',
    email: '',
    pub_key: '',
    ssn: 0,
    updatedAt: '',
    user_id: '',
    username: '',
  };

  // userInfoObservable = new Observable(observer => {
  //   observer.next(this.userInfo);
  // });

  // Store logged in user's email
  userEmail: string;

  // user contracts
  contracts: any[];
  pendingContracts: any[];

  // Give components ability to subscribe for userInfo Changes
  contractsChange$: Observable<any>;
  pendingContractsChange$: Observable<any>;
  userInfoChange$: Observable<any>;
  private _observerContracts: Observer<any>;
  private _observerPendingContractsChange: Observer<any>;
  private _observerUserInfoChange: Observer<any>;
  private subscription: any;

  // hold user profile info
  newContract: any = {
      username: this.userInfo.username,
      contract_nickname: 'default',
      will_text: 'default',
      file_name: 'No file was selected.',
      beneficiary: '1212dddddd3',
      hash: '012741923487'
    };

  // hold new contract info
  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router) {

    this.contractsChange$ = new Observable(observer => {
      this._observerContracts = observer; }).share();
    this.pendingContractsChange$ = new Observable(observer => {
      this._observerPendingContractsChange = observer; }).share();
    this.userInfoChange$ = new Observable(observer => {
      this._observerUserInfoChange = observer; }).share();
  }

  // Holds temporary new contract info for creation
  setContractInfo(contract: Contract) {
    this.newContract = contract;
    console.log('new contract set in DashboardService: ', this.newContract);
  }
  
  // Get contracts for render on the Dashboard
  getAndSetContracts() {

    // Subscribe to changes on userInfo and fetch contracts once userInfo comes in
    console.log('The username sent for contracts is: ', this.userInfo.username);
      this.http.get ('findallcontract', {
        params: new HttpParams().set('username', this.userInfo.username)
      })
        .subscribe((data: any) => {
          console.log('The user wills returned are: ', data);
          this.contracts = data;
          //this._observerContracts.next(this.contracts);
          console.log('the new contracts: ', this.contracts);
        }, error => console.log('Could not load userInfo'));
        console.log('The reset contracts in my-contracts: ', this.contracts);
        
        // this.subscription = this.userInfoChange$.subscribe( item => {
          
          //   console.log('The username sent for contracts is: ', item.username);
          //     this.http.get ('findallcontract', {
            //       params: new HttpParams().set('username', item.username)
            //     })
            //       .subscribe((data: any) => {
              //         console.log('The user wills returned are: ', data);
              //         this.contracts = data;
              //         this._observer.next(data);
              //         console.log('the new contracts: ', this.contracts);
              //       }, error => console.log('Could not load userInfo'));
              // });
              // console.log('The reset contracts in my-contracts: ', this.contracts);
              
              // this.subscription = this.userInfoChange$.subscribe( item => {
                
              //              });

  }

  setUserInfo(userInfo: UserInfo) {
    this.userInfo = userInfo;
    console.log('New userInfo set in DashboardService: ', this.userInfo);
    this.getAndSetContracts();
  }

  // Other components can call this and return the current contracts
  currentContracts(): any {
    return this.contracts;
  }
    /**admin**/
  getAndSetPending() {
    this.http.get ('findpendingcontract')
      .subscribe((data: any) => {
        console.log('The pending user wills returned are: ', data);
        this.pendingContracts = data;
        this._observerPendingContractsChange.next(data);
        console.log('the pending contracts: ', this.pendingContracts);
      });
  }

  /** Can be called from any page within the dashboard and will load user 
  data in order to persist logged in user information*/

  getAndSetUserInfo() {
    // checkLogin(url: string): Promise<any> {
    //   let isLoggedIn;
      return new Promise((resolve, reject) => {
        //this.userEmail = 
        this.afAuth.auth.onAuthStateChanged( firebaseUser => {
          if (firebaseUser) {
            resolve (firebaseUser);
          } else {
            alert('Please log in and try again');
            // Store attempted URL for redirecting
            // this.authService.redirectUrl = url;
            // Navigate to the home page with extras
            this.router.navigate(['/home']);
            reject(false);
          }
        });
      })
      .then((res: any) => {
        if (res) {
          console.log('The logged in user email is: ', res.email);
          // Send an http request with user email to get user info and mount then return as promise
          this.retrieveUserInfoWithEmail(res.email);
 
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log('Error: inside is logged in', err);
      });
    
  }

  retrieveUserInfoWithEmail(email:string): void {
    this.http.get ('findemail', {
      params: new HttpParams().set('email', email)
    })
      .subscribe((data: any) => {
        console.log('The logged in userInfo is ', data);
        this.userInfo = data;
        this.getAndSetContracts();
        console.log('the updated userInfo is ', this.userInfo);
        //Maybe throwing me an error because no subs yet??
        this._observerUserInfoChange.next(data);
      }, err => console.log(err));
  }

  currentPending(): any {
    return this.pendingContracts;
  }
}
