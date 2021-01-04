new Vue({
  el: '#vue-app',
  data: {
		currentTab: 0,
		currentModalText: '',
		sms: {
			mobile: "",
			msg: ""
		},
		warning: {
			invalidPhoneNumber: 'Invalid Phone Number',
			sendSmsSuccess: 'Success',
			sendSmsFail: 'Fail'
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
		openModal() {
			$('#warning-modal').modal({ backdrop: true, keyboard: false, focus: true, show: true })
		}
  }
})