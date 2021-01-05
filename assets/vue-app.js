new Vue({
  el: '#vue-app',
  data: {
		currentTab: 4,
		currentModalText: '',
		sms: {
			mobile: "",
			msg: ""
		},
		call: {
			mobile: ''
		},
		warning: {
			invalidPhoneNumber: 'Invalid Phone Number',
			sendSmsSuccess: 'Success',
			sendSmsFail: 'Fail'
		},
		ws: {
			message: ''
		}
	},
	watch: {
		currentTab: {
			handler(val) {
				if(val === 1) {
					this.connectWs()
				}
			}
		}
	},
  methods: {
		handleChangeTab(val) {
			this.currentTab = Number(val)
		},
		handleClear(val) {
			if(val === true) {
				this.sms = {
					mobile: '',
					message: ''
				}
			} else {
				this.sms = {
					...this.sms,
					mobile: ''
				}
			}
		},
    handleSendSms() {
      if(this.sms.mobile.length < 10){
				this.currentModalText = this.warning.invalidPhoneNumber
				this.openModal()
				return false
			}
			console.log(app)
			const { mobile, sms } = this.sms
			try {
				this.currentModalText = this.warning.sendSmsSuccess
				app.sms.send(mobile, sms)
			} catch(e) {
				this.warning.sendSmsFail = 'Fail: ' + mobile
				this.currentModalText = this.warning.sendSmsFail
			} finally {
				this.openModal()
				return true
			}
		},
		handleCall() {},
		handleLogout() {},
		handleDisableAccount() {}, 
		handleDeleteAccount() {},
		connectWs() {
			initWs(this)
		},
		openModal() {
			$('#warning-modal').modal({ backdrop: true, keyboard: false, focus: true, show: true })
		}
  }
})

function initWs(vm) {
	const ws = new WebSocket('ws://localhost:8082/path1')

	ws.onopen = function() {
		ws.send('Frontend Says Hello!')
	}

	ws.onmessage = function(message) {
		vm.ws.message = message.data
		console.log(message.data)
	}
}
