const channel = '/data',
	dal = require("../dal"),
	cmp = new dal.Expanses();

module.exports.listen = io => {
	let dataChnl = io.of(channel);
	dataChnl.on('connection', socket => {
		console.log('a user connected');

		socket.on('disconnect', () => {
			console.log('user disconected')
		})
		
		// FOR TESTING
		socket.on('ping.me', msg => {
			console.log(`message ${msg}`)
			socket.emit('pong.me', msg)
		})
		socket.on('ping.us', msg => {
			console.log(`message ${msg}`)
			socket.broadcast.emit('pong.all', msg)
		})
		
		socket.on('expanse.get.all', msg => {
			cmp.getAll(msg)
			.then(res => {
				//console.log(`message ${res}`)
				socket.emit('expanse.list', res)
			})
			.catch(err => {
				console.log(`error ${err}`)
				socket.emit('expanse.list.err', err)
			})
		})
		// socket.on('expanse.get.one', msg => {
		// 	cmp.getOne(msg.id)
		// 	.then(res => {
		// 		//console.log(`message ${res}`)
		// 		socket.emit('expanse.item', res)
		// 	})
		// 	.catch(err => {
		// 		console.log(`error ${err}`)
		// 		socket.emit('expanse.list.err', err)
		// 	})
		// })

		// socket.on('expanse.item.edit', msg => {
		// 	// msg = {id, fld, newV, oldV}
		// 	socket.broadcast.emit('expanse.item.edit', msg)
		// })
		// socket.on('expanse.item.reset', msg => {
		// 	// msg = [id,id,id]
		// 	socket.broadcast.emit('expanse.item.reset', msg)
		// })

		// socket.on('expanse.item.update', msg => {
		// 	let id = msg.Id
		// 	delete msg.Id
		// 	cmp.update(id, msg)
		// 	.then(res => {
		// 		msg.Id = id
		// 		console.log(res)
		// 		socket.broadcast.emit('expanse.item', msg)
		// 		socket.emit('expanse.item.updated', msg)
		// 	})
		// 	.catch(err => {
		// 		console.log("error", err)
		// 		socket.emit('expanse.item.update.err', err)
		// 	})
		// })

	})
}