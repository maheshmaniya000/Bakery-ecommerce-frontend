import { useEffect, useState } from 'react'

let MapContainer, TileLayer, Marker, Popup

const ContactUsMap = () => {
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		;(async () => {
			const Leaflet = await import('react-leaflet')
			MapContainer = Leaflet.MapContainer
			TileLayer = Leaflet.TileLayer
			Marker = Leaflet.Marker
			Popup = Leaflet.Popup
			setIsLoaded(true)
		})()
	}, [])

	return (
		<>
			{isLoaded ? (
				<MapContainer
					center={[1.30965, 103.90232]}
					zoom={17}
					scrollWheelZoom={false}
				>
					<TileLayer
						attribution='<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> New OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
						url="https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png"
					/>
					<Marker position={[1.30965, 103.90232]}>
						<Popup>Online Bakehouse</Popup>
					</Marker>
				</MapContainer>
			) : (
				<div>loading ...</div>
			)}
		</>
	)
}

export default ContactUsMap
