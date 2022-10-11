import Link from 'next/link'
import {
	Anchor,
	StyledBaseContainer,
	StyledCopyRight,
	StyledFooter,
} from '@/styles/elements'
import {
	AnchorContainer,
	AnchorContainer2,
	SocialIcon,
	StyledCopyRightContainer,
	StyledFooterAnchor1,
} from '@/styles/elements/footer'

function Footer() {
	return (
		<>
			<StyledBaseContainer>
				<StyledFooter>
					<div className="logo">
						<img src="/images/logo.svg" alt="Online Bakehouse" />
					</div>

					<div className="nav-wrapper">
						<AnchorContainer>
							<Link passHref href="/about-us">
								<Anchor style={{ textAlign: 'center' }}>
									Who we are
								</Anchor>
							</Link>
						</AnchorContainer>
						{/* <AnchorContainer>
							<Link passHref href="/journal">
								<Anchor style={{ textAlign: 'center' }}>
									Journal
								</Anchor>
							</Link>
						</AnchorContainer> */}
						<AnchorContainer>
							<Link passHref href="/contact-us">
								<Anchor style={{ textAlign: 'center' }}>
									Contact
								</Anchor>
							</Link>
						</AnchorContainer>
						<AnchorContainer2>
							<Link passHref href="/faq">
								<Anchor style={{ textAlign: 'center' }}>
									FAQ
								</Anchor>
							</Link>
						</AnchorContainer2>
					</div>

				</StyledFooter>
			</StyledBaseContainer>
			<StyledCopyRight>
				<StyledBaseContainer>
					<StyledCopyRightContainer>
						<div>
							Copyright &copy; Online Bakehouse | All rights
							reserved
						</div>
						<div style={{ minWidth: 75 }}>
							<a
								href="https://www.facebook.com/Onlinebakehouse.sg/"
								target="__blank"
								rel="noopener noreferrer"
							>
								<SocialIcon
									src="/images/icons/fb.svg"
									alt="fb"
								/>
							</a>
							<a
								href="https://www.instagram.com/Onlinebakehouse/"
								target="__blank"
								rel="noopener noreferrer"
							>
								<SocialIcon
									src="/images/icons/ig.svg"
									alt="ig"
								/>
							</a>
						</div>
						<div>
							<Link passHref href="/refund-policy">
								<StyledFooterAnchor1
									style={{ display: 'inline' }}
								>
									Refund Policy
								</StyledFooterAnchor1>
							</Link>
							<Link passHref href="/terms-and-conditions">
								<StyledFooterAnchor1
									style={{ display: 'inline' }}
								>
									Terms and conditions
								</StyledFooterAnchor1>
							</Link>
							<Link passHref href="/privacy-policy">
								<StyledFooterAnchor1
									style={{ display: 'inline' }}
								>
									Privacy Policy
								</StyledFooterAnchor1>
							</Link>
						</div>
					</StyledCopyRightContainer>
				</StyledBaseContainer>
			</StyledCopyRight>
		</>
	)
}

export default Footer
