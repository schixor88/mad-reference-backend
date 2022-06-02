class Responsify {
  getSuccess(code: String = '000', message: String = 'success', data: any) {
    return { code: code, message: message, error: null, data: data };
  }

  getError(code: String = '401', message: String = 'error', error: any) {
    return { code: code, message: message, error: error, data: null };
  }
}

export default new Responsify();
