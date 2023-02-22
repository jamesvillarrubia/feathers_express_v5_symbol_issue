module.exports = services = app => {
    class MessageService {
      constructor() {
        this.messages = []
      }
        async find (params) { return { data: 'find', params }; }
        async create (data, params) { return { data: 'create', params }; }
        async callRpcMethod (data, params) { return { data: 'rpc', params }; }
      }
    app.use('messages', new MessageService({}));
  };
  
  
  