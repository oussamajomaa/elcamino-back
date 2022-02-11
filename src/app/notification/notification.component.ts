import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DataService } from '../services/data.service';
import { ToastrService } from 'ngx-toastr';


@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
	notifications: any = []
	category: string = ''
	title: string = ''
	body: string = ''
	constructor(
		private dataService: DataService,
		private toastService: ToastrService,
		) { this.getNotification() }

	getNotification() {
		this.dataService.getNotification().subscribe(res => {
			let notifications = res.map(item => {
				return {
					title: item.payload.doc.get('title'),
					body: item.payload.doc.get('body')
				}
			})
			this.notifications = notifications
		})
	}


	ngOnInit(): void {
		this.getNotification()
	}

	sendNotification() {
		if (this.category !== '') {
			if (this.title !== '') {
				if (this.body !== '') {
					let notification = {
						// date:new Date().toISOString().slice(0, 10)+' '+new Date().toISOString().slice(11, 19),
						date:Date.now(),
						category:this.category,
						title:this.title,
						body:this.body
					}
					this.dataService.addNotification(notification)
					this.category=''
					this.title = ''
					this.body=''
					this.toastService.success("La notification a été envoyé");
				}
				else this.toastService.warning("Le contenu ne doit pas être vide");
			}
			else this.toastService.warning("Le titre ne doit pas être vide");
		}
		else this.toastService.warning("La catégorie ne doit pas être vide");
	}
}
