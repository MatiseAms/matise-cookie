<template>

	<div v-if="cookieNotice" class="cookie">

		<section :class="{'hide': !cookieNotice}" class="cookie__notice">

			<h2 class="cookie__title">{{ cookieData.title }}</h2>
			<p class="cookie__explanation">{{ cookieData.information }}</p>

			<div class="button-container">
				<button class="button button--black cookie--agree cookie__button" aria-label="Accepteer alle cookies" type="button" name="button" @click="enableCookies(true)">Sta cookies toe</button>
				<button class="button button--white cookie__button" aria-label="Pas de cookie instellingen aan" type="button" name="button" @click="cookieSettings=true;">Instellingen</button>
			</div>

		</section>

		<section :class="{'hide': !cookieSettings}" class="cookie__settings">
			<h2 class="cookie__title">{{ cookieData.subTitle }}</h2>
			<form class="cookie__settings-form">

				<div class="cookie__settings--disabled  cookie__setting">
					<div v-for="option in requiredFilter(cookieOptions, 'true')" :key="option.slug" class="cookie__settings--option">
						<label v-if="option.slug && option.title && option.aria && option.info" :for="option.slug" class="cookie-settings__label cookie-label--disabled">
							<input :id="option.slug" v-model="option.value" :aria-label="option.aria" type="checkbox" name="setting" disabled class="cookie-settings__input">
							<span class="cookie-settings__title">{{ option.title }}</span>
						</label>
						<p v-if="option.slug && option.title && option.aria && option.info" class="cookie-settings__information">{{ option.info }}</p>
					</div>
				</div>

				<div class="cookie__settings--enabled cookie__setting">
					<div v-for="option in requiredFilter(cookieOptions, 'false')" :key="option.slug" class="cookie__settings--option">
						<label v-if="option.slug && option.title && option.aria && option.info" :for="option.slug" class="cookie-settings__label cookie-label--enabled">
							<input :id="option.slug" v-model="option.value" :aria-label="option.aria" type="checkbox" name="setting" class="cookie-settings__input">
							<span class="cookie-settings__title">{{ option.title }}</span>
						</label>
						<p v-if="option.slug && option.title && option.aria && option.info" class="cookie-settings__information">{{ option.info }}</p>
					</div>
				</div>

				<div class="button-container">
					<button class="button button--black cookie--agree cookie__button" aria-label="Sla de instellingen op" type="button" name="button" @click="enableCookies( )">Instellingen opslaan</button>
				</div>

			</form>
		</section>

	</div>

</template>

<script>
import VueCookie from 'vue-cookie';

export default {
	components: {
		VueCookie
	},
	data() {
		return {
			cookieSettings: false,
			cookieOptions: []
		};
	},
	computed: {
		cookieData() {
			return this.$store.state.cookie.cookieData;
		},
		cookieNotice() {
			return this.$store.state.cookie.cookieMessage;
		}
	},
	created() {
		if (this.cookieNotice) {
			this.modelData();
		}
	},
	mounted() {
		if (this.cookieNotice) {
			document.querySelector('body').style.overflow = 'hidden';
		}
	},
	methods: {
		enableCookies(all) {
			let self = this;
			const collection = self.cookieOptions;
			collection.forEach((option) => {
				if (all) {
					option.model = true;
				}
			});
			this.$cookie.set('cookieSettings', JSON.stringify(collection), {
				expires: '1Y'
			});
			this.$store.commit('cookie/setCookieSettings', collection);
			document.querySelector('body').style.overflow = '';
		},
		requiredFilter: function(data, value) {
			if (data && value) {
				let newData = data.filter(function(e) {
					if (value === 'true' && e.required) {
						return e;
					} else if (value === 'false' && !e.required) {
						return e;
					}
				});
				return newData;
			} else {
				return data;
			}
		},
		modelData: function() {
			// This should be turned on!!!
			// if (
			// 	this.$store.state &&
			// 	this.$store.state.cookie &&
			// 	this.$store.state.cookie.cookieData
			// ) {
			// 	this.cookieOptions = Object.values(
			// 		this.$store.state.cookie.cookieData.options
			// 	);
			// 	this.cookieOptions = this.cookieOptions.map((option) => {
			// 		let modelValue = option.required ? true : false;
			// 		let obj = {
			// 			...option,
			// 			value: modelValue
			// 		};
			// 		return obj;
			// 	});
			// }
		}
	}
};
</script>

<style lang="scss">
//Welcome to the Matise epic Cookie tool. Please adjust scss settings in _cookie.scss instead of this file, thank you :)
//modal
$cookie-modal-width: 50rem !default;
$cookie-modal-padding: 3.75rem !default;
$cookie-modal-layover-background: rgba(0, 0, 0, 0.7) !default;
$cookie-modal-background-color: white !default;
$cookie-modal-shadow: 0 0px 50px 0 rgba(0, 0, 0, 0.5) !default;

// Title
$cookie-title-padding-bottom: 2rem !default;
$cookie-title-color: black !default;

$cookie-settings-font-size: 1.125rem !default;
$cookie-settings-line-height: 1.125rem !default;

// Text
$cookie-text-line-height: 2rem !default;
$cookie-text-font-size: 1rem !default;
$cookie-text-padding-bottom: 2.5rem !default;
$cookie-text-color: black !default;

// Button
$cookie-button-padding: 1rem 2.5rem !default;
$cookie-button-margin-right: 1.25rem !default;
$cookie-button-border: 1px solid black !default;

// Button hovers
$cookie-button-hover-background: black !default;
$cookie-button-hover-color: white !default;
$cookie-button-transition: all 0.2s !default;

// Button colors
//agree
$cookie-button-agree: rgba(0, 255, 0, 1) !default;
$cookie-button-agreeHover: rgba(0, 255, 0, 0.75) !default;
$cookie-button-agreeColor: white !default;

// Settings
$cookie-settings-padding-left: 2.5rem !default;
$cookie-settings-color: black !default;
$cookie-settings-outline-size: 3px !default;
$cookie-settings-outline: #{$cookie-settings-outline-size} solid #{$cookie-settings-color};
$cookie-settings-disabled: 0.5 !default;

$cookie-small-font-size: 1rem !default;
$cookie-small-color: black !default;
$cookie-small-line-height: 2rem !default;

$cookie-mq-small-only: 'screen and (max-width: 750px)';
$cookie-mq-medium-down: 'screen and (max-width: 960px)';

.cookie {
	overflow-y: hidden;
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: $cookie-modal-layover-background;
	z-index: 9999;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	padding: $cookie-modal-padding;
	&__notice,
	&__settings {
		width: 100%;
		max-width: $cookie-modal-width;
		box-shadow: $cookie-modal-shadow;
		background-color: $cookie-modal-background-color;
		position: absolute;
		z-index: 9998;
		box-shadow: $cookie-modal-shadow;
		transition: 0.5s ease-in-out;
		overflow-y: scroll;
		max-height: 100vh;
		padding: $cookie-modal-padding;
		@media #{$cookie-mq-medium-down} {
			width: 100%;
			padding: $cookie-modal-padding / 2;
		}
		&.hide {
			opacity: 0;
			pointer-events: none;
			transition: 0.5s ease-in-out;
		}
	}

	&__title {
		margin: 0;
		padding-bottom: $cookie-title-padding-bottom;
		color: $cookie-title-color;
	}

	&__explanation {
		margin: 0;
		line-height: $cookie-text-line-height;
		font-size: $cookie-text-font-size;
		padding-bottom: $cookie-text-padding-bottom;
		color: $cookie-text-color;
	}

	&__button {
		display: inline-block;
		padding: $cookie-button-padding;
		margin-right: $cookie-button-margin-right;
		transition: $cookie-button-transition;
		cursor: pointer;
		border: $cookie-button-border;

		&:last-child {
			margin: 0;
		}

		&:hover,
		&:focus {
			background: $cookie-button-hover-background;
			color: $cookie-button-hover-color;
		}
		@media #{$cookie-mq-small-only} {
			margin-bottom: $cookie-button-margin-right;
			&:last-child {
				margin: 0;
			}
		}
	}
	&--agree {
		background: $cookie-button-agree;
		border: none;
		color: $cookie-button-agreeColor;
		&:hover,
		&:focus {
			background: $cookie-button-agreeHover;
		}
	}

	&__settings {
		&--option {
			margin: calc(#{$cookie-text-padding-bottom} / 2) 0;
			padding: 0 $cookie-settings-padding-left;
		}
		&-form {
			margin: 0;
			padding: 0;
		}
		&--disabled {
			opacity: $cookie-settings-disabled;
			.cookie-settings__title {
				cursor: auto;
			}
		}
	}
	//option settings
	&-settings {
		&__input,
		&__input[type='checkbox'] {
			appearance: none;
			margin: 0;
			padding: 0;
			overflow: hidden;
			visibility: hidden;
			&:checked + .cookie-settings__title {
				&:after {
					opacity: 1;
				}
			}
		}
		&__title {
			font-size: $cookie-settings-font-size;
			line-height: $cookie-settings-line-height;
			font-weight: bold;
			cursor: pointer;
			position: relative;
			color: $cookie-settings-color;
			&:before {
				content: '';
				display: block;
				position: absolute;
				left: calc(
					-#{$cookie-settings-padding-left} + #{$cookie-settings-outline-size}
				);
				top: 50%;
				transform: translateY(-50%);
				height: 1rem;
				width: 1rem;
				outline: $cookie-settings-outline;
			}
			&:after {
				content: '';
				display: block;
				background: black;
				position: absolute;
				left: calc(
					-#{$cookie-settings-padding-left} + #{$cookie-settings-outline-size}
				);
				top: $cookie-settings-outline-size;
				height: 1rem;
				width: 1rem;
				top: 50%;
				transform: translateY(-50%) scale(0.8);
				opacity: 0;
				transition: opacity 0.3s ease-in-out;
			}
		}
		&__information {
			font-size: $cookie-small-font-size;
			color: $cookie-small-color;
			line-height: $cookie-small-line-height;
		}
	}
}
</style>


<!-- 
Version to use in the project
<style lang="scss">
.cookie {
	background-color: $cookie-modal-layover-background;
	padding: $cookie-modal-padding;
	&__notice,
	&__settings {
		max-width: $cookie-modal-width;
		box-shadow: $cookie-modal-shadow;
		background-color: $cookie-modal-background-color;
		box-shadow: $cookie-modal-shadow;
		padding: $cookie-modal-padding;
		@media #{$cookie-mq-medium-down} {
			padding: calc(#{$cookie-modal-padding} / 2);
		}
	}

	&__title {
		padding-bottom: $cookie-title-padding-bottom;
		color: $cookie-title-color;
	}

	&__explanation {
		line-height: $cookie-text-line-height;
		font-size: $cookie-text-font-size;
		padding-bottom: $cookie-text-padding-bottom;
		color: $cookie-text-color;
	}

	&__button {
		padding: $cookie-button-padding;
		margin-right: $cookie-button-margin-right;
		transition: $cookie-button-transition;
		border: $cookie-button-border;

		&:hover,
		&:focus {
			background: $cookie-button-hover-background;
			color: $cookie-button-hover-color;
		}
		@media #{$cookie-mq-small-only} {
			margin-bottom: $cookie-button-margin-right;
		}
	}
	&--agree {
		background: $cookie-button-agree;
		color: $cookie-button-agreeColor;
		&:hover,
		&:focus {
			background: $cookie-button-agreeHover;
		}
	}

	&__settings {
		&--option {
			margin: calc(#{$cookie-text-padding-bottom} / 2) 0;
			padding: 0 $cookie-settings-padding-left;
		}
		&--disabled {
			opacity: $cookie-settings-disabled;
		}
	}
	//option settings
	&-settings {
		&__title {
			font-size: $cookie-settings-font-size;
			line-height: $cookie-settings-line-height;
			color: $cookie-settings-color;
			&:before {
				left: calc(
					-#{$cookie-settings-padding-left} + #{$cookie-settings-outline-size}
				);
				outline: $cookie-settings-outline;
			}
			&:after {
				left: calc(
					-#{$cookie-settings-padding-left} + #{$cookie-settings-outline-size}
				);
				top: $cookie-settings-outline-size;
			}
		}
		&__information {
			font-size: $cookie-small-font-size;
			color: $cookie-small-color;
			line-height: $cookie-small-line-height;
		}
	}
}


</style>
-->