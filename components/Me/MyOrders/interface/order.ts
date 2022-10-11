import { Bundle, BundleProduct } from 'interfaces/Bundle'
import { PromoCode } from 'interfaces/Promo'
import { SliceBox } from 'interfaces/SliceBox'

export interface Recipient {
	firstName: string
	lastName: string
	mobileNo: string
}

export interface Sender {
	firstName: string
	lastName: string
	mobileNo: string
	email: string
}

export interface Method {
	active: boolean
	isOutskirt: boolean
	needPostalCode: boolean
	type: string
	outskirtPrice: number
	deliveryPrice: number
	_id: string
	name: string
	description: string
	icon: string
	specificTimes: any[]
	created: Date
	updated: Date
	__v: number
}

export interface Delivery {
	method: Method
	isOutSkirt: boolean
	price: number
	address: string
	buildingUnitNo: string
	postalCode: number
}

export interface Variant {
	_id: string
	price: number
	size: string
}

export interface Product {
	variant: Variant
	_id: string
	category: Category
	product: Category
	price: number
	quantity: number
	candles: number
	knifes: number
	message: string
}

export interface Customer {
	cart: any[]
	_id: string
	email: string
	firstName: string
	lastName: string
	mobileNo: string
	authUniqueNo: string
	created: Date
	updated: Date
	__v: number
}

export interface Address {
	city?: any
	country?: any
	line1?: any
	line2?: any
	postal_code?: any
	state?: any
}

export interface BillingDetails {
	address: Address
	email?: any
	name: string
	phone?: any
}

export interface Metadata {
	orderId: string
}

export interface Outcome {
	network_status: string
	reason?: any
	risk_level: string
	risk_score: number
	seller_message: string
	type: string
}

export interface Checks {
	address_line1_check?: any
	address_postal_code_check?: any
	cvc_check: string
}

export interface Card {
	brand: string
	checks: Checks
	country: string
	exp_month: number
	exp_year: number
	fingerprint: string
	funding: string
	installments?: any
	last4: string
	network: string
	three_d_secure?: any
	wallet?: any
}

export interface PaymentMethodDetails {
	card: Card
	type: string
}

export interface Refunds {
	object: string
	data: any[]
	has_more: boolean
	total_count: number
	url: string
}

export interface Category {
	products: string[]
	active: boolean
	_id: string
	name: string
	created: Date
	updated: Date
	__v: number
	slug: string
}

export interface Datum {
	id: string
	object: string
	amount: number
	amount_captured: number
	amount_refunded: number
	application?: any
	application_fee?: any
	application_fee_amount?: any
	balance_transaction: string
	billing_details: BillingDetails
	calculated_statement_descriptor: string
	captured: boolean
	created: number
	currency: string
	customer?: any
	description: string
	destination?: any
	dispute?: any
	disputed: boolean
	failure_code?: any
	failure_message?: any
	invoice?: any
	livemode: boolean
	metadata: Metadata
	on_behalf_of?: any
	order?: any
	outcome: Outcome
	paid: boolean
	payment_intent: string
	payment_method: string
	payment_method_details: PaymentMethodDetails
	receipt_email: string
	receipt_number?: any
	receipt_url: string
	refunded: boolean
	refunds: Refunds
	review?: any
	shipping?: any
	source?: any
	source_transfer?: any
	statement_descriptor?: any
	statement_descriptor_suffix?: any
	status: string
	transfer_data?: any
	transfer_group?: any
}

export interface Charges {
	object: string
	data: Datum[]
	has_more: boolean
	total_count: number
	url: string
}

export interface Metadata2 {
	orderId: string
}

export interface Card2 {
	installments?: any
	network?: any
	request_three_d_secure: string
}

export interface PaymentMethodOptions {
	card: Card2
}

export interface PaymentLog {
	id: string
	object: string
	allowed_source_types: string[]
	amount: number
	amount_capturable: number
	amount_received: number
	application?: any
	application_fee_amount?: any
	canceled_at?: any
	cancellation_reason?: any
	capture_method: string
	charges: Charges
	client_secret: string
	confirmation_method: string
	created: number
	currency: string
	customer?: any
	description: string
	invoice?: any
	last_payment_error?: any
	livemode: boolean
	metadata: Metadata2
	next_action?: any
	next_source_action?: any
	on_behalf_of?: any
	payment_method: string
	payment_method_options: PaymentMethodOptions
	payment_method_types: string[]
	receipt_email: string
	review?: any
	setup_future_usage?: any
	shipping?: any
	source?: any
	statement_descriptor?: any
	statement_descriptor_suffix?: any
	status: string
	transfer_data?: any
	transfer_group?: any
}

export interface Order {
	recipient: Recipient
	sender: Sender
	promoCode: PromoCode
	delivery: Delivery
	giftMessage: string
	fees: number
	type: string
	status: string
	totalAmount: number
	tags: any[]
	_id: string
	orderDate: Date
	products: Product[]
	customer: Customer
	uniqueNo: string
	created: Date
	updated: Date
	__v: number
	paymentLog: PaymentLog
	paymentType: string
	discount: number
	unpaid?: number
	paid?: number
	usedCode?: string
	note?: string
	virtualDiscount?: number
	peakDaySurcharge?: number
	sliceBoxes?: SliceBox[]
	bundles?: OrderBundle[]
}

export interface OrderBundle {
	_id: string
	bundle: Bundle
	quantity: number
	price: number
	products: OrderBundleProduct[]
}

export interface OrderBundleProduct {
	_id: string
	product: BundleProduct
	cakeText: string
	candles: number
	knife: boolean
}
