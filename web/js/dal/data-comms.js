import config from "/js/config.js";
import EventEmitter from "/js/shared/eventEmitter.js";

class DataComms extends EventEmitter {
    constructor(options) {
        super();
        this._topic= options.topic || '';
        this._socket= io('/data');
    }
    get socket() { return this._socket; }

    socketSetup(){
        if (config.verbose) console.log("Setting up Sockets");
        let self = this;
        //self._socket = io(self._channel);
        self._socket.on(`${self._topic}.list`, function(list){
            if (config.verbose) console.log(`${self._topic}.list: ${list.length}`)
            self.emit('list',list)
        });
        self._socket.on(`${self._topic}.item`, function(item){
            if (config.verbose) console.log(`${self._topic}.item: ${JSON.stringify(item)}`)
            self.emit('item',item)
        });
        self._socket.on(`${self._topic}.item.reset`, function(item){
            if (config.verbose) console.log(`${self._topic}.item.reset: ${JSON.stringify(item)}`)
            self.emit('item.reset',item)
        });
        self._socket.on(`${self._topic}.item.edit`, function(evt){
            //evt = {id: id, field: fld, newValue: newV, oldValue: oldV}
            if (config.verbose) console.log(`${self._topic}.item.edit: ${JSON.stringify(evt)}`)
            self.emit('item.edit',evt)
        });
        self._socket.on(`${self._topic}.item.updated`, function(item){
            // Update item and clear from queue
            if (config.verbose) console.log(`${self._topic}.item.updated: ${JSON.stringify(item)}`)
            self.emit('item.updated',item)
        });

        self._socket.on(`${self._topic}.item.add`, function(item){
            if (config.verbose) console.log(`${self._topic}.item.add: ${JSON.stringify(item)}`)
            self.emit('item.add',item)
        });
        self._socket.on(`${self._topic}.item.delete`, function(msg){
            if (config.verbose) console.log(`${self._topic}.item.delete: ${JSON.stringify(item)}`)
            self.emit('item.delete',{ itemId: msg.id })
        });
    }


    // SEND METHODS
    sendRefreshEvent(filter) {
        let title = '';
        if (filter) {
            title = `${this._topic}.get.with.filter`;
            this._socket.emit(title,{filter:filter,options:null});
        } else {
            title = `${this._topic}.get.all`;
            this._socket.emit(title);
        }
        if (config.verbose) console.log(`refresh event sent: ${title}`)
    }
    sendUpdateEvent(packet) {
        this._socket.emit(`${this._topic}.item.update`, packet.update);
    }
    sendAddEvent(packet) {
        this._socket.emit(`${this._topic}.item.add`, packet);
        // packet = {id: ?, field: ?, newValue: ?, oldValue: ?}
        //this._socket.emit(`${this._topic}.item.add`,packet);
    }
    sendDeleteEvent(packet) {
        // packet = {id: ?, field: ?, newValue: ?, oldValue: ?}
        //this._socket.emit(`${this._topic}.item.delete`,packet);
    }



    sendEditEvent(packet) {
        // packet = {id: ?, field: ?, newValue: ?, oldValue: ?}
        this._socket.emit(`${this._topic}.item.edit`,packet);
    }
    sendPresenceEvent(id, fld) {
        //this._socket.emit('user.activity.grid', {page: 'foundation', row: id, field: fld });
    }

}


export default DataComms;