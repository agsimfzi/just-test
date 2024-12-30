const morgan = require('morgan');

const errorHandler = (err, req, rsp, next) => {
	console.error(err.message);
	morgan('combined', {
		skip: (req, rsp) => rsp.statusCode < 400
	})(req, rsp, () => {
		rsp.status(500).send({ msg: 'Server Error' });
	});
};

module.exports = errorHandler;
