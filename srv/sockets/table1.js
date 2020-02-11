const channel = '/data',
	dal = require("../dal"),
	cmp = new dal.SampleOne();

module.exports.listen = io => {
	let dataChnl = io.of(channel);
	dataChnl.on('connection', socket => {
		console.log('a user connected');

		socket.on('disconnect', () => {
			console.log('user disconected')
		})
		
		socket.on('ping.me', msg => {
			console.log(`message ${msg}`)
			socket.emit('pong.me', msg)
		})
		socket.on('ping.us', msg => {
			console.log(`message ${msg}`)
			socket.broadcast.emit('pong.all', msg)
		})
		
		socket.on('component.get.all', msg => {
			cmp.getAll(msg)
			.then(res => {
				//console.log(`message ${res}`)
				socket.emit('component.list', res)
			})
			.catch(err => {
				console.log(`error ${err}`)
				socket.emit('component.list.err', err)
			})
		})
		socket.on('component.get.one', msg => {
			cmp.getOne(msg.id)
			.then(res => {
				//console.log(`message ${res}`)
				socket.emit('component.item', res)
			})
			.catch(err => {
				console.log(`error ${err}`)
				socket.emit('component.list.err', err)
			})
		})

		socket.on('component.item.edit', msg => {
			// msg = {id, fld, newV, oldV}
			socket.broadcast.emit('component.item.edit', msg)
		})
		socket.on('component.item.reset', msg => {
			// msg = [id,id,id]
			socket.broadcast.emit('component.item.reset', msg)
		})

		socket.on('component.item.update', msg => {
			let id = msg.Id
			delete msg.Id
			cmp.update(id, msg)
			.then(res => {
				msg.Id = id
				console.log(res)
				socket.broadcast.emit('component.item', msg)
				socket.emit('component.item.updated', msg)
			})
			.catch(err => {
				console.log("error", err)
				socket.emit('component.item.update.err', err)
			})
		})

	})
}