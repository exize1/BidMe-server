const UserSchema = require("./UserSchema")

const UsersPostValidation = (req, res, next) => {
    const {body} = req
    const result = UserSchema.validate(body)
  
    const {value, error} = result
  
    const valid = error == null;
    
    if(!valid){
      res.status(422).json({
        message: `${error}`,
        data: value,
        error: `This is your error: ${error}`
      }
      )
    }else next()
  }

module.exports = UsersPostValidation