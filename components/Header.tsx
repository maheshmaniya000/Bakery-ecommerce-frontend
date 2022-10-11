import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'

import {
	StyledNavAnchor,
	StyledHeader,
	StyledNavToggle,
	StyledNav,
} from '@/styles/elements'
import { useUser } from '../data/useUser'
import { AnimatePresence } from 'framer-motion'
import Search from '@/components/Search/Search'
import { useRouter } from 'next/router'
import Popover from '@/components/PopOver/PopOver'
import { StyledHeaderSearch } from '@/styles/elements/header'
import { ApplicationContext } from 'context/ApplicationContext'
import styled from '@emotion/styled'
import { useIsMobile } from 'utils/helper'
import useSWR from 'swr'
import { fetcher } from 'utils/fetcher'
import { SubLink } from '@/styles/elements/SubLink'

const CartContainer = styled.div`
	position: relative;
`

const CartCount = styled.div`
	position: absolute;
	top: -12px;
	right: -8px;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	font-size: 1.2rem;
	background-color: #7e5000;
`

const CartMobile = styled.div`
	margin: 8px 20px 0px auto;

	@media (min-width: 769px) {
		display: none;
	}
`

const CartDesktop = styled.div`
	@media (max-width: 768px) {
		display: none;
	}
`

export const Header = () => {
	const router = useRouter()
	const [showNav, toggleShowNav] = useState(false)
	const [showSearch, toggleShowSearch] = useState(false)
	const [clickedBakes, toggleClickedBakes] = useState<boolean>()
	const [clickedGiftings, toggleClickedGiftings] = useState<boolean>()

	const { cart } = useContext(ApplicationContext)
	const isMobile = useIsMobile()
	const { data } = useSWR(
		process.env.NEXT_PUBLIC_API_URL + '/announcements',
		fetcher
	)
	const isBanner = (data?.docs || []).some(
		(doc) => doc.type === 'BANNER' && doc.active === true
	)
	const { user } = useUser({})
	// search query
	const { s } = router.query
	const handleSearch = (keywords) => {
		toggleShowNav(false)
		router.push(`/search?s=${keywords}`)
	}

	// NOTE: Close nav bar on nav change
	useEffect(() => {
		toggleShowNav(false)
	}, [router.asPath])

	function handleBakesClick(e) {
		e.preventDefault()

		if (window.innerWidth <= 768) {
			if (typeof clickedBakes === 'undefined') {
				toggleClickedBakes(true)
			} else {
				toggleClickedBakes(!clickedBakes)
			}
		} else {
			toggleShowNav(false)
			toggleClickedBakes(undefined)
			router.push('/cakes/whole-cakes')
		}
	}

	function handleGiftingsClick(e) {
		e.preventDefault()

		if (window.innerWidth <= 768) {
			if (typeof clickedGiftings === 'undefined') {
				toggleClickedGiftings(true)
			} else {
				toggleClickedGiftings(!clickedGiftings)
			}
		} else {
			toggleClickedGiftings(undefined)
		}
	}

	return (
		<StyledHeader isBanner={isBanner}>
			<section className="nav">
				{/* Left navigation */}
				<Link href="/">
					<a>
						<div className="logo" style={{ cursor: 'pointer' }}>
							<img src="/images/logo.svg" alt="Online Bakehouse" />
						</div>
					</a>
				</Link>

				<StyledNav active={showNav}>
					<div className="nav-wrapper">
						<div className="main-navigation">
							<Link passHref href="/">
								<StyledNavAnchor
									onClick={(e) => {
										e.preventDefault()
										toggleShowNav(false)
										router.push('/')
									}}
									active={true}
								>
									HOME
								</StyledNavAnchor>
							</Link>

							<SubLink>
								<StyledNavAnchor onClick={handleBakesClick}>
									BAKES +
								</StyledNavAnchor>

								<div
									className="content"
									style={
										typeof clickedBakes !== 'undefined'
											? {
													display: clickedBakes
														? 'block'
														: 'none',
											  }
											: null
									}
								>
									<Link passHref href="/cakes/whole-cakes">
										<StyledNavAnchor
											onClick={(e) => {
												e.preventDefault()
												toggleShowNav(false)
												router.push(
													'/cakes/whole-cakes'
												)
											}}
										>
											Whole Cakes
										</StyledNavAnchor>
									</Link>

									<Link passHref href="/sliced-cakes">
										<StyledNavAnchor
											onClick={(e) => {
												e.preventDefault()
												toggleShowNav(false)
												router.push('/sliced-cakes')
											}}
										>
											Sliced Cakes
										</StyledNavAnchor>
									</Link>

									<Link passHref href="/cakes/everyday-bakes">
										<StyledNavAnchor
											onClick={(e) => {
												e.preventDefault()
												toggleShowNav(false)
												router.push(
													'/cakes/everyday-bakes'
												)
											}}
										>
											Everyday Bakes
										</StyledNavAnchor>
									</Link>

									<Link passHref href="/cakes/gift-bundles">
										<StyledNavAnchor
											onClick={(e) => {
												e.preventDefault()
												toggleShowNav(false)
												router.push(
													'/cakes/gift-bundles'
												)
											}}
										>
											Gift Bundles
										</StyledNavAnchor>
									</Link>

									<Link
										passHref
										href="/cakes/cake-accessories"
									>
										<StyledNavAnchor
											onClick={(e) => {
												e.preventDefault()
												toggleShowNav(false)
												router.push(
													'/cakes/cake-accessories'
												)
											}}
										>
											Cake Accessories
										</StyledNavAnchor>
									</Link>
								</div>
							</SubLink>

							<Link passHref href="/cakes/brews">
								<StyledNavAnchor
									onClick={(e) => {
										e.preventDefault()
										toggleShowNav(false)
										router.push('/cakes/brews')
									}}
								>
									BREWS
								</StyledNavAnchor>
							</Link>

							{/* <Link passHref href="/bundles">
								<StyledNavAnchor
									onClick={(e) => {
										e.preventDefault()
										toggleShowNav(false)
										router.push('/bundles')
									}}
								>
									Bundles
								</StyledNavAnchor>
							</Link> */}

							<SubLink>
								<StyledNavAnchor onClick={handleGiftingsClick}>
									GIFTING +
								</StyledNavAnchor>

								<div
									className="content"
									style={
										typeof clickedGiftings !== 'undefined'
											? {
													display: clickedGiftings
														? 'block'
														: 'none',
											  }
											: null
									}
								>
									<Link passHref href="/cakes/books-&-cards">
										<StyledNavAnchor
											onClick={(e) => {
												e.preventDefault()
												toggleShowNav(false)
												router.push(
													'/cakes/books-&-cards'
												)
											}}
										>
											Books &amp; Cards
										</StyledNavAnchor>
									</Link>
									<Link passHref href="/cakes/gift-bundles">
										<StyledNavAnchor
											onClick={(e) => {
												e.preventDefault()
												toggleShowNav(false)
												router.push(
													'/cakes/gift-bundles'
												)
											}}
										>
											Gift Bundles
										</StyledNavAnchor>
									</Link>
								</div>
							</SubLink>

							{/* <Link passHref href="/slice-box">
								<StyledNavAnchor
									onClick={(e) => {
										e.preventDefault()
										toggleShowNav(false)
										router.push('/slice-box')
									}}
								>
									SLICE BOX
								</StyledNavAnchor>
							</Link> */}

							<Link passHref href="/journal">
								<StyledNavAnchor
									onClick={(e) => {
										e.preventDefault()
										toggleShowNav(false)
										router.push('/journal')
									}}
								>
									JOURNAL
								</StyledNavAnchor>
							</Link>
						</div>

						<ul className="nav-right-menu">
							<li>
								<img
									src="/images/icons/search.svg"
									alt="Search"
									className="icon"
									onClick={() => toggleShowSearch(true)}
								/>
								<AnimatePresence>
									{showSearch && (
										<Popover
											style={{
												left: isMobile ? 30 : -60,
												top: 80,
											}}
											onClose={() =>
												toggleShowSearch(false)
											}
										>
											<StyledHeaderSearch>
												<Search
													onClose={() =>
														toggleShowSearch(false)
													}
													onSearch={handleSearch}
													defaultValue={
														(s || '') + ''
													}
												/>
											</StyledHeaderSearch>
										</Popover>
									)}
								</AnimatePresence>
							</li>
							<li>
								<CartDesktop>
									<Link href="/shopping-cart">
										<a>
											<CartContainer>
												<img
													src="/images/icons/cart.svg"
													alt="Search"
													className="icon"
												/>
												<CartCount>
													{cart
														.map((i) => i.quantity)
														.reduce(
															(acc, curr) =>
																acc + curr,
															0
														)}
												</CartCount>
											</CartContainer>
										</a>
									</Link>
								</CartDesktop>
							</li>
							{user && user?.isLoggedIn ? (
								<li>
									<Link href="/me/orders">
										<a>
											<img
												src="/images/icons/user.svg"
												alt="user"
												className="icon"
											/>
										</a>
									</Link>
								</li>
							) : (
								<>
									<li>
										<Link passHref href="/?action=sign-in">
											<StyledNavAnchor
												style={{ marginBottom: 0 }}
												onClick={(e) => {
													e.preventDefault()
													toggleShowNav(false)
													router.push(
														'/?action=sign-in'
													)
												}}
											>
												Login
											</StyledNavAnchor>
										</Link>
									</li>
									<li>
										<Link passHref href="/?action=register">
											<StyledNavAnchor
												style={{ marginBottom: 0 }}
												onClick={(e) => {
													e.preventDefault()
													toggleShowNav(false)
													router.push(
														'/?action=register'
													)
												}}
											>
												Register
											</StyledNavAnchor>
										</Link>
									</li>
								</>
							)}
						</ul>
					</div>
				</StyledNav>
				<CartMobile>
					<Link href="/shopping-cart">
						<a>
							<CartContainer>
								<img
									src="/images/icons/cart.svg"
									alt="Search"
									className="icon"
								/>
								<CartCount>{cart.length}</CartCount>
							</CartContainer>
						</a>
					</Link>
				</CartMobile>
				<StyledNavToggle
					active={showNav}
					onClick={() => toggleShowNav(!showNav)}
				>
					<span className="top" />
					<span className="middle" />
					<span className="bottom" />
				</StyledNavToggle>
			</section>
		</StyledHeader>
	)
}
