export const FadeInVariants = {
	hidden: {
		opacity: 0,
	},
	show: {
		opacity: 1,
		transition: {
			duration: 0.5,
			type: 'easeInout',
			staggerChildren: 0.2,
		},
	},
}
