export const GA_TRACKING_ID = process.env.GA_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
	window.gtag('config', GA_TRACKING_ID, {
		page_path: url, // eslint-disable-line
	})
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
	window.gtag('event', action, {
		event_category: category, // eslint-disable-line
		event_label: label, // eslint-disable-line
		value: value,
	})
}
