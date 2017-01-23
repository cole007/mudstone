import Base from '../helpers/base'

export default function loader(args, context = document) {
	/*
	 find all tags with a data-behavour attribute
	*/
	const nodes = Array.from(context.querySelectorAll('*[data-behaviour]'))
	nodes.map((node) => {
		const behaviours = node.getAttribute('data-behaviour').split(' ')
		return {
			node,
			behaviours
		}
	})
	.forEach((obj) => {
		obj.behaviours.forEach((behaviourName) => {
			try {
				/*
					instantiate data-behaviour
				*/
				const behaviour = new args[behaviourName](obj.node)
				/*
					if the behaviour is extended from the base class
				*/
				if(behaviour instanceof Base) {
					/*
						builds events array if present
						and sets listener for page change events
						triggered via barba - 'page:change'
					*/
					behaviour._init()

					/*
						The default render method binds any events from
						the events array
					*/
					behaviour.render()

					/*
						If the behaviour has a mouted method this
						will be called from the event loop so
						everything should be hunky dory
					*/
					setTimeout(() => {
						if(typeof behaviour.mounted === 'function') {
							behaviour.mounted()
						}
					})
				}

			} catch(error) {
				log(`${behaviourName} Behaviour not found, ${error}`)
			}
		})
	})
}
