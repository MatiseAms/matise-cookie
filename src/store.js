const store = new Vuex.Store({});

store.state = () => ({
	cookieMessage: true,
	cookieData: {
		title: 'Wij maken gebruik van cookies',
		subTitle: 'Cookie instellingen',
		information:
			'Wij hebben een aantal cookies nodig om deze site te laten werken. Deze bewaren geen persoonsgegevens. We gebruiken ook cookies om statistieken over het websitebezoek te verzamelen (Analytics). Tevens gebruiken wij cookies voor het personaliseren van advertenties.',
		options: {
			analytics: {
				title: 'Analytische cookies (verplicht)',
				aria: 'Analytische cookies',
				slug: 'analytics',
				info:
					'Dit zijn cookies die bijhouden hoe gebruikers onze site gebruiken. Hiermee analyseren en verbeteren we onze website. Er worden geen persoonlijke gegevens opgeslagen en er wordt niets doorgegeven aan derden. IP adressen worden anoniem gemaakt.',
				required: true
			},
			functional: {
				title: 'Functionele cookies (verplicht)',
				aria: 'Functionele cookies',
				slug: 'functional',
				info:
					'Deze functionele cookies zijn nodig om de website goed te laten werken. Er worden met deze cookies geen persoonsgegevens opgeslagen. Wel bewaren we hiermee bijvoorbeeld de voorkeuren die je in dit scherm instelt.',
				required: true
			},
			social: {
				title: 'Sociale media cookies',
				aria: 'Sociale media cookies',
				slug: 'social',
				info:
					'Dit zijn cookies die informatie uitwisselen met bekende sociale media, zoals Facebook of Twitter.'
			},
			advertisement: {
				title: 'Advertentie cookies',
				aria: 'Advertentie cookies',
				slug: 'advertisement',
				info:
					'Deze cookies worden gebruikt om je toepasselijke advertenties te tonen.'
			}
		}
	},
	cookieSettings: []
});

store.mutations = {
	setCookieSettings(state, data) {
		state.cookieMessage = false;
		state.cookieSettings = data;
	},
	setCookieData(state, data) {
		if (data) {
			if (data.title) {
				state.cookieData.title = data.title;
			}
			if (data.sub_title) {
				state.cookieData.subTitle = data.sub_title;
			}
			if (data.information) {
				state.cookieData.information = data.information;
			}
			if (data.options) {
				state.cookieData.options = data.options;
			}
		}
	}
};

store.actions = {
	getCookies({ commit }, { req }) {
		if (
			req.headers.cookie &&
			req.headers.cookie.indexOf('cookieSettings') > -1
		) {
			let list = {};
			let rc = req.headers.cookie;
			rc &&
				rc.split(';').forEach(function(cookie) {
					var parts = cookie.split('=');
					list[parts.shift().trim()] = decodeURI(parts.join('='));
				});
			let newCookie = JSON.parse(decodeURIComponent(list.cookieSettings));
			commit('setCookieSettings', newCookie);
		}
	},
	getCookieData({ commit }) {
		return this.$axios.$get('page/cookie').then((result) => {
			commit('setCookieData', result);
		});
	}
};

export default store;
