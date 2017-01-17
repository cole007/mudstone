import Base from '../helpers/base'

export class test extends Base {
	constructor(tag) {
		super(tag, false)
	}

	events = [
		'click button : clickHandle'
	]

	clickHandle(e) {
		log(e.currentTarget)
		this._removeEvents()
	}

	render() {
		this._addEvents()
	}

}



export class test2 extends Base {
	constructor(tag) {
		super(tag)
	}

	events = [
		'click button : clickHandle'
	]

	clickHandle() {
		log('aids2')
	}
}
