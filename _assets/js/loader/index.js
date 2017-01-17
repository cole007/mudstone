export default function loader(args, context = document) {
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
				const behaviour = new args[behaviourName](obj.node)
				setTimeout(() => {

					behaviour.init().render()
				})
			} catch(error) {
				log(`${behaviourName} Behaviour not found, ${error}`)
			}
		})
	})
}
