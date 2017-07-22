import { Homepage } from './homepage'
import { Base } from './base'
import { About } from './about'

export const transitions = [
	{
		namespace: 'Homepage',
		transition: Homepage
	},
	{
		path: '/b',
		transition: About
	},
	{
		namespace: 'C',
		transition: Base
	}
]