import { useContext, useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Element, scroller as scroll } from 'react-scroll'
import { StyledField, StyledInput } from '@/styles/elements/form'
import { StyledButton } from '@/styles/elements'
import moment from 'moment-timezone'
import {
	StyledAddressContainer,
	StyledDeliveryGroup,
	StyledFormGrid,
	StyledFormGroup,
} from './CheckoutForm.style'
import ErrorField from '@/components/Form/FormErrorField'
import SizeSelect from '@/components/SizeSelect/SizeSelect'
import { useDeliveryMethods } from 'data/useDeliveryMethods'
import { CheckoutDate } from '../CheckoutDate/CheckoutDate'
import { ApplicationContext } from '../../../../context/ApplicationContext'
import { useUser } from '../../../../data/useUser'
import styled from '@emotion/styled'
import AsyncSelect from 'react-select/async'
import { useMediaQuery } from 'react-responsive'

export const ReviewPay = styled(StyledButton)`
	width: 300px;
	max-width: 100%;
`

interface Props {
	submit: (values) => void
	formRef: any
	orderData: any
}

const Edit = styled.span`
	margin-left: 4px;
	font-weight: bold;
	font-size: 1.5rem;
	line-height: 1rem;
	text-align: right;
	letter-spacing: 0.05em;
	text-decoration-line: underline;
	color: #7e5000;
	cursor: pointer;
`

const customSelectStyles = {
	container: () => ({
		borderRadius: 4,
		border: '1px solid #7C7167',
	}),
	valueContainer: () => ({
		padding: '16px 10px',
	}),
	option: (provided, { isDisabled, isFocused, isSelected }) => ({
		...provided,
		backgroundColor: isDisabled
			? null
			: isSelected
			? '#7E5000'
			: isFocused
			? '#F4F1ED'
			: null,
	}),
}

export const CheckoutForm: React.FC<Props> = ({
	submit,
	formRef,
	orderData = {},
}) => {
	const [initialValues, setInitialValues] = useState(null)
	const [isShowPostalSelect, setIsShowPostalSelect] = useState(true)
	const { data: methods } = useDeliveryMethods()
	const { user } = useUser({})
	const isDesktop = useMediaQuery({
		query: '(min-width: 992px)',
	})
	const {
		checkCartItemsHaveDeliverableDate,
		setDeliveryMethod,
		checkoutFormStep1Temp,
		setCheckoutFormStep1Temp,
	} = useContext(ApplicationContext)

	// recall the stored initial values on start
	useEffect(() => {
		setInitialValues(checkoutFormStep1Temp)
	}, [])

	const handleChangeDeliveryMethod = (deliveryMethod, postalCode, timeId) => {
		setDeliveryMethod({
			deliveryMethodId: deliveryMethod._id,
			timeId,
			postalCode,
		})
	}

	function handleSubmit(values) {
		submit(values)
	}

	function handleAddressSearch(value) {
		if (value) {
			return fetch(
				`https://developers.onemap.sg/commonapi/search?searchVal=${value}&returnGeom=Y&getAddrDetails=Y`
			)
				.then((response) => response.json())
				.then((data) =>
					data.results
						.filter((item) => item.POSTAL !== 'NIL')
						.map((item) => ({
							...item,
							value: item.POSTAL,
							label: item.ADDRESS,
						}))
				)
		}

		return Promise.resolve([])
	}

	function getValidation() {
		return Yup.object().shape({
			orderDate: Yup.string().required('Order date is required'),
			method: Yup.object()
				.nullable()
				.required('Delivery method is required.'),
			postalCode: Yup.number().when('method', {
				is: (method) => method?.needPostalCode,
				then: Yup.number().required('Postal code is required'),
				otherwise: Yup.number(),
			}),
			address: Yup.string().when('method', {
				is: (method) => method?.needPostalCode,
				then: Yup.string().required('Address is required'),
				otherwise: Yup.string(),
			}),
			buildingNo: Yup.string().when('method', {
				is: (method) => method?.needPostalCode,
				then: Yup.string().required('Building or unit no is required'),
				otherwise: Yup.string(),
			}),
			preferredTime: Yup.string().when('method', {
				is: (method) => method?.type === 'SPECIFIC',
				then: Yup.string().required('Preferred time is required'),
				otherwise: Yup.string(),
			}),
			senderFirstName: Yup.string().required(
				'Sender First Name is required'
			),
			senderLastName: Yup.string().required(
				'Sender Last Name is required'
			),
			senderMobileNo: Yup.string().required(
				'Sender Mobile Number  is required'
			),
			senderEmail: Yup.string()
				.email('Email is required')
				.required('Sender Email is required'),

			recipientFirstName: Yup.string().required(
				'Recipient First Name is required'
			),
			recipientLastName: Yup.string().required(
				'Recipient Last Name  is required'
			),
			recipientMobileNo: Yup.string()
				.matches(/^[8|9][0-9]{7}$/, 'Require Singapore number')
				.required('Recipient Mobile Number is required'),
		})
	}

	return (
		<div>
			<Formik
				initialValues={{
					postalCode: '',
					buildingNo: '',
					recipientFirstName: initialValues?.recipientFirstName || '',
					recipientLastName: initialValues?.recipientLastName || '',
					recipientMobileNo: initialValues?.recipientMobileNo || '',
					address: '',
					method: null,
					senderFirstName:
						initialValues?.senderFirstName || user?.firstName,
					senderLastName:
						initialValues?.senderLastName || user?.lastName,
					senderMobileNo:
						initialValues?.senderMobileNo || user?.mobileNo || '',
					senderEmail: initialValues?.senderEmail || user?.email,
					preferredTime: '',
					sameAs: initialValues?.sameAs || false,
					orderDate: '',
					copied: false,
				}}
				innerRef={formRef}
				enableReinitialize={true}
				validationSchema={getValidation()}
				onSubmit={(values) => {
					handleSubmit(values)
				}}
			>
				{({
					errors,
					touched,
					setFieldValue,
					values,
					handleChange,
					isSubmitting,
				}) => {
					setCheckoutFormStep1Temp(values)

					if (
						Object.keys(touched).length > 0 &&
						Object.keys(errors).length > 0 &&
						isSubmitting
					) {
						setTimeout(() => {
							const errorNames = Object.keys(errors)
							scroll.scrollTo(errorNames[0], {
								offset: -180,
							})
						}, 0)
					}

					if (values.sameAs && !values.copied) {
						setFieldValue(
							'recipientFirstName',
							values.senderFirstName
						)
						setFieldValue(
							'recipientLastName',
							values.senderLastName
						)
						setFieldValue(
							'recipientMobileNo',
							values.senderMobileNo
						)
						setFieldValue('copied', true)
					} else if (!values.sameAs && values.copied) {
						setFieldValue('copied', false)
					}

					const selectedWeekDay = values.orderDate
						? moment
								.tz(
									(values.orderDate as any).date,
									'Asia/Singapore'
								)
								.weekday()
						: ''

					return (
						<Form id="form" autoComplete="off">
							<Field type="hidden" name="orderDate" />
							<CheckoutDate
								selectDate={(val) => {
									setFieldValue('orderDate', val)
								}}
							/>
							{errors.orderDate && touched.orderDate && (
								<Element name="orderDate">
									<ErrorField error={errors.orderDate + ''} />
								</Element>
							)}

							<h3 className="page-heading">
								How do you wish to get your order?
							</h3>
							<StyledDeliveryGroup id="deliveries-section">
								{methods?.docs.map((item, index) => {
									/* default select for first index as the default if there is no preselected values */
									// if (!values.method && index == 0) {
									// 	setDeliveryMethod({
									// 		deliveryMethodId: item._id,
									// 	})
									// 	setFieldValue('method', item)
									// }

									return (
										<div
											className={
												'item ' +
												(values.method?._id === item._id
													? 'selected'
													: '')
											}
											key={index}
											onClick={() => {
												setDeliveryMethod({
													deliveryMethodId: item._id,
												})

												setFieldValue('method', item)
												setFieldValue(
													'preferredTime',
													''
												)

												if (values.postalCode) {
													handleChangeDeliveryMethod(
														item,
														values.postalCode,
														values.preferredTime ||
															''
													)
												}
											}}
										>
											{item.icon && (
												<img
													src={item.icon}
													alt={item.name}
													width={40}
												/>
											)}

											<div>
												<h4 className="service-heading">
													{item.name}
												</h4>
												<div>{item.description}</div>
											</div>
										</div>
									)
								})}
							</StyledDeliveryGroup>
							{errors.method && touched.method && (
								<Element name="method">
									<ErrorField error={errors.method + ''} />
								</Element>
							)}
							{values.method?.type === 'SPECIFIC' && (
								<StyledFormGroup>
									<SizeSelect
										options={values.method.times
											.filter((_time) =>
												_time.availables.includes(
													selectedWeekDay.toString()
												)
											)
											.map((_time) => ({
												value: _time._id,
												label: _time.name,
											}))}
										label="Preferred Time:"
										name="preferredTime"
										padding="10px 8px 10px 140px"
										defaultSelect={false}
										onSelect={(val) => {
											setDeliveryMethod({
												deliveryMethodId:
													values.method._id,
												timeId: val.value,
												postalCode: values.postalCode,
											})
										}}
									/>
									{errors.preferredTime &&
										touched.preferredTime && (
											<Element name="preffpreferredTime">
												<ErrorField
													error={errors.preferredTime}
												/>
											</Element>
										)}
								</StyledFormGroup>
							)}

							{!values.method?.needPostalCode && (
								<StyledAddressContainer>
									<img
										src="/images/icons/location.svg"
										alt=""
										className="location-icon"
									/>
									<div>
										<h3>Online Bakehouse</h3>
										<p>301 Joo Chiat Rd Singapore 427552</p>
									</div>
								</StyledAddressContainer>
							)}

							{values.method?.needPostalCode && (
								<>
									<StyledFormGroup>
										{isShowPostalSelect && (
											<>
												<AsyncSelect
													cacheOptions
													defaultOptions
													placeholder="Search address or postal code"
													styles={customSelectStyles}
													// value={values.postalCode}
													loadOptions={
														handleAddressSearch
													}
													onChange={(value: any) => {
														setFieldValue(
															'address',
															value.ADDRESS
														)
														setFieldValue(
															'postalCode',
															value.POSTAL
														)

														handleChangeDeliveryMethod(
															values.method,
															value.POSTAL,
															values.preferredTime ||
																''
														)
														setIsShowPostalSelect(
															false
														)
													}}
												/>
												{errors.postalCode &&
													touched.postalCode && (
														<Element name="postalCode">
															<ErrorField
																error={
																	errors.postalCode +
																	''
																}
															/>
														</Element>
													)}
											</>
										)}
									</StyledFormGroup>

									{!isShowPostalSelect && (
										<>
											<StyledFormGroup>
												<StyledAddressContainer>
													<img
														src="/images/icons/location.svg"
														alt=""
														className="location-icon"
													/>
													<div>
														<p>{values.address}</p>
													</div>
													<Edit
														onClick={() => {
															setIsShowPostalSelect(
																true
															)

															setFieldValue(
																'address',
																''
															)
															setFieldValue(
																'postalCode',
																''
															)

															handleChangeDeliveryMethod(
																values.method,
																'',
																values.preferredTime ||
																	''
															)
														}}
													>
														Edit
													</Edit>
												</StyledAddressContainer>
											</StyledFormGroup>
											<StyledFormGroup>
												<StyledField
													name="buildingNo"
													type="text"
													placeholder="Building or unit no"
													autoComplete="off"
												/>
												{errors.buildingNo &&
													touched.buildingNo && (
														<Element name="buildingNo">
															<ErrorField
																error={
																	errors.buildingNo +
																	''
																}
															/>
														</Element>
													)}
											</StyledFormGroup>
										</>
									)}
								</>
							)}

							{/* NOTE: sender info */}
							<h3 className="page-heading">Sender info</h3>
							<StyledFormGrid>
								<StyledFormGroup>
									<StyledField
										name="senderFirstName"
										type="text"
										placeholder="First Name"
										autoComplete="off"
									/>
									{errors.senderFirstName &&
										touched.senderFirstName && (
											<Element name="senderFirstName">
												<ErrorField
													error={
														errors.senderFirstName +
														''
													}
												/>
											</Element>
										)}
								</StyledFormGroup>

								<StyledFormGroup>
									<StyledField
										name="senderLastName"
										type="text"
										placeholder="Last Name"
										autoComplete="off"
									/>
									{errors.senderLastName &&
										touched.senderLastName && (
											<Element name="senderLastName">
												<ErrorField
													error={
														errors.senderLastName +
														''
													}
												/>
											</Element>
										)}
								</StyledFormGroup>
							</StyledFormGrid>

							<StyledFormGroup>
								<StyledInput
									name="senderMobileNo"
									type="tel"
									placeholder="Mobile no"
									autoComplete="off"
									value={values.senderMobileNo}
									onChange={function (e) {
										const value = e.target.value

										if (value && !!value.match(/^\d+$/)) {
											setFieldValue(
												'senderMobileNo',
												value
											)
										} else {
											setFieldValue(
												'senderMobileNo',
												value
											)
										}
									}}
								/>
								{errors.senderMobileNo &&
									touched.senderMobileNo && (
										<Element name="senderMobileNo">
											<ErrorField
												error={
													errors.senderMobileNo + ''
												}
											/>
										</Element>
									)}
							</StyledFormGroup>

							<StyledFormGroup>
								<StyledField
									name="senderEmail"
									type="email"
									placeholder="Email"
									autoComplete="off"
								/>
								{errors.senderEmail && touched.senderEmail && (
									<Element name="senderEmail">
										<ErrorField
											error={errors.senderEmail + ''}
										/>
									</Element>
								)}
							</StyledFormGroup>

							{/* recipient info */}
							<h3 className="page-heading">Recipient info</h3>
							<section style={{ margin: '20px 0' }}>
								<label>
									<Field type="checkbox" name="sameAs" /> Same
									details as sender info
								</label>
							</section>
							<StyledFormGrid>
								<StyledFormGroup>
									<StyledField
										name="recipientFirstName"
										type="text"
										placeholder="First Name"
										autoComplete="off"
									/>
									{errors.recipientFirstName &&
										touched.recipientFirstName && (
											<Element name="recipientFirstName">
												<ErrorField
													error={
														errors.recipientFirstName +
														''
													}
												/>
											</Element>
										)}
								</StyledFormGroup>

								<StyledFormGroup>
									<StyledField
										name="recipientLastName"
										type="text"
										placeholder="Last Name"
										autoComplete="off"
									/>
									{errors.recipientLastName &&
										touched.recipientLastName && (
											<Element name="recipientLastName">
												<ErrorField
													error={
														errors.recipientLastName +
														''
													}
												/>
											</Element>
										)}
								</StyledFormGroup>
							</StyledFormGrid>

							<StyledFormGroup>
								<StyledField
									name="recipientMobileNo"
									type="tel"
									placeholder="Mobile no"
									autocomplete="off"
									onChange={(e) => {
										// restrict input for 8 number max
										const { value } = e.target

										if (
											value.length === 1 &&
											value !== '9' &&
											value !== '8'
										) {
											setFieldValue(
												'recipientMobileNo',
												''
											)

											return false
										}

										if (
											// allow for empty string
											value === '' ||
											(value.length <= 8 &&
												!!value.match(/^\d+$/))
										) {
											handleChange(e)
										} else if (
											value.length > 8 &&
											!!value.match(/^\d+$/)
										) {
											handleChange(e)
										}

										return false
									}}
								/>
								{errors.recipientMobileNo &&
									touched.recipientMobileNo && (
										<Element name="recipientMobileNo">
											<ErrorField
												error={
													errors.recipientMobileNo +
													''
												}
											/>
										</Element>
									)}
							</StyledFormGroup>

							{isDesktop && (
								<ReviewPay
									className="button"
									type="submit"
									disabled={
										!checkCartItemsHaveDeliverableDate &&
										!orderData._id
									}
								>
									{orderData._id ? 'Edit' : 'Review & Pay'}
								</ReviewPay>
							)}
						</Form>
					)
				}}
			</Formik>
		</div>
	)
}
