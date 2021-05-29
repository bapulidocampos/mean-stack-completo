export class User{
	constructor(
		public _id:string,
		public name:string,
		public surname:string,
		public date_birth:string,
		public nick:string,
		public sexo:string,
		public allergy:any[],
		public email:string,
		public password:string,
		public role:string,
		public image:string,
		public recaptcha:string
	){}
}  