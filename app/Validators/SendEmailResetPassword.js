'use strict'

class SendEmailResetPassword {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'required|email',
      redirect_url: 'required|url'
    }
  }
}

module.exports = SendEmailResetPassword
