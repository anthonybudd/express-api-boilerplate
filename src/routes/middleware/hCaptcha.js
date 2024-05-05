const hCaptcha = require('./../../providers/hCaptcha');

module.exports = async (req, res, next) => {

    // Skip hCaptcha validation if running tests
    if (typeof global.it === 'function') {
        return next();
    }

    if (!process.env.H_CAPTCHA_SECRET) {
        console.log(`⚠️  Warning: H_CAPTCHA_SECRET not set, skipping captcha validadation`);
        return next();
    }

    if (!req.body.htoken) return res.status(422).json({
        errors: {
            htoken: {
                location: "body",
                param: "htoken",
                msg: "You must complete the captcha"
            }
        }
    });

    const { data } = await hCaptcha.verify(req.body.htoken);

    if (data.success) return next();

    return res.status(422).json({
        errors: {
            htoken: {
                location: "body",
                param: "htoken",
                msg: 'Captcha validation failed.'
            }
        }
    });
};
