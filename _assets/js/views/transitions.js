import Barba from 'barba.js'
import { transitionEnd } from '../helpers/utils'
import local from 'local-links'
// import $ from 'jquery'

const $loader = $('.js-loader')

const links = () => {
	Array.from(document.querySelectorAll('a')).forEach((el) => {
		if(local.pathname(el) === null || el.getAttribute('href').indexOf('.pdf') > -1) {
			el.setAttribute('target', '_blank')
		}
	})
}

export const Transition = Barba.BaseTransition.extend({
	start: function() {
		Promise
			.all([this.newContainerLoading, this.transitionOut()])
			.then(this.transitionIn.bind(this))
	},

	transitionOut: function() {
		const deferred = Barba.Utils.deferred()

		$loader.addClass('is-active').one(transitionEnd, () => {
			window.scroll(0, 0)
			deferred.resolve()
		})

		return deferred.promise
	},

	transitionIn: function() {
		$(this.oldContainer).hide()
		$loader.css({opacity: 0}).one(transitionEnd, () => {
			$loader.removeClass('is-active').css({opacity: 1})
			links()
			this.done()
		})
	}
})