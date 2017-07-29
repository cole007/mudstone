import { Homepage } from './homepage'
import { About } from './about'

export const transitions = [
	{
		namespace: 'Homepage',
		transition: Homepage
	},
	{
		path: '/b',
		transition: About
	}
]