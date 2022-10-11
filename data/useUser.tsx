import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import { fetcher } from 'utils/fetcher'

export const useUser = ({ redirectTo = '', redirectIfFound = false }) => {
	const { data: user, mutate, error } = useSWR('/api/user', fetcher)

	const loading = !user && !error

	useEffect(() => {
		if (!redirectTo || !user) return

		if (
			(redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
			(redirectIfFound && user?.isLoggedIn)
		) {
			Router.push(redirectTo)
		}
	}, [user, redirectIfFound, redirectTo])

	return { loading, user, mutate, error }
}
