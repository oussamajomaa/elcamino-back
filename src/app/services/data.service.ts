import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable({
	providedIn: 'root'
})
export class DataService {
	authState = new BehaviorSubject(false);
	constructor(
		private firestore: AngularFirestore,
		private auth: AngularFireAuth,
		private router: Router,
		private toastr: ToastrService
	) { }

	getNotification() {
		return this.firestore.collection('notification').snapshotChanges(["added"])
	}
	

	login(user: any) {
		return this.auth.signInWithEmailAndPassword(user.email, user.password)
			.then(response => {
				this.router.navigate(['notification'])
				this.authState.next(true)
			})
			.catch((error) => {
				if (error.code === 'auth/wrong-password') {
					console.log('error code', error.code);
				}
			})
	}


	logout() {
		this.router.navigate(['login']);
		this.authState.next(false)
	}

	isAuthenticated() {
		return this.authState.value
	}

	addNotification(notification: {}) {
		const id = this.firestore.createId()
		return this.firestore.collection('notification').doc(id).set(notification)
	}
}
