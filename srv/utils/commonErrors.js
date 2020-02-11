

module.exports = {
	notImplemented(name) {
		return {
			err: `'${name}' Not Implemented`
		}
	},
	mySqlError(err, origin) {
		return {
			err: err,
			source: "mySQL",
			echo: origin
		}
	}
}
