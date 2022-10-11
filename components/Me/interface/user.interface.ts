export interface Auth {
	_id: string
	email: string
	uniqueNo: string
	provider: string
	accountType: string
	created: Date
	updated: Date
	__v: number
}

export interface Account {
	provider: string
	providerData?: any
}

export interface User {
	isLoggedIn: boolean
	_id: string
	cart: any[]
	email: string
	firstName: string
	lastName: string
	mobileNo: string
	authUniqueNo: string
	created: Date
	updated: Date
	__v: number
	auth: Auth
	token: string
	accounts: Account[]
}
