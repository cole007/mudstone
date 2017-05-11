import Listener from './listener'


export default class extends Listener {
	constructor(context, behaviours) {
		super()
		this.context = context
		this.behaviours = behaviours
		this.nodes = []
		this.scoped = []
		this.history()
	}

	history() {
		this.on('page:exit', this.destroyBehaviour)
		this.on('page:change', this.start)
	}

	getNodes(context = document) {
		this.nodes = [...context.querySelectorAll('*[data-behaviour]')]
		return this
	}

	initializeBehaviour() {
		const { nodes, behaviours } = this
		this.scoped = nodes.map((node) => {
			const behaviours = node.getAttribute('data-behaviour').split(' ')
			return {
				node,
				behaviours
			}
		})
		.map((obj) => {
			return obj.behaviours.map((behaviourName) => {
				return new behaviours[behaviourName](obj.node)
			})
		})
		return this
	}

	destroyBehaviour() {
		this.behaviours.forEach(behaviour => {
			if(typeof behaviour.destory === 'function') {
				behaviour.destory()
			}
		})
	}

	start(context = this.context) {
		this.getNodes(context)
		this.initializeBehaviour()
		this.scoped.forEach(node => {
			node.forEach(behaviour => {
				behaviour.initialize()
			})
		})
		
		setTimeout(() => {
			this.mounted()
		})
	}

	beforeLeave() {
		const promises = []
		this.scoped.forEach(node => {
			node.forEach(behaviour => {
				if(typeof behaviour.onLeave === 'function') {
					promises.push(behaviour)
				}
			})
		})
		return new Promise.all(promises)
	}
 
	mounted() {
		this.scoped.forEach(node => {
			node.forEach(behaviour => {
				behaviour.mounted()
			})
		})
	}
}