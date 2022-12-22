/**
 * 
 * this code provide by rahmat putra
 * if you have any problems contact me at rahmatputrawiranata@gmail.com
 * 
 */

type InputValidatorType = {
    status: boolean,
    message?: string
}

export const isEmailValidRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,10}')

const inputValidator = (validator : {[key: string] : string}, input: {[key: string]: undefined}): {status: boolean, errors: {[key: string] : string[]}}  => {

    const errors : {[key: string] : string[]} = {}
    
    let status = true;
    
    Object.keys(validator).forEach(key => {
        const validatorData = validator[key].split('|')
        validatorData.forEach(item => {
            if(item === 'required') {
                const validate = isRequired(key, input[key])
                if(!validate.status) {
                    status = false
                    if(errors[key]) {
                        errors[key].push(String(validate.message))
                    }else{
                        errors[key] = [String(validate.message)]
                    }
                }
            }else if(item === 'email') {
                const validate = isEmailValid(key, input[key])
                if(!validate.status) {
                    status = false
                    if(errors[key]) {
                        errors[key].push(String(validate.message))
                    }else{
                        errors[key] = [String(validate.message)]
                    }
                }
            }else if(item.substring(0, 6) === 'regex:') {
                const items = item.substring(6).split(',message:')
                const validate = regexValid(key, input[key], items[0], items[1])
                if(!validate.status) {
                    status = false
                    if(errors[key]) {
                        errors[key].push(String(validate.message))
                    }else{
                        errors[key] = [String(validate.message)]
                    }
                }
            }
        });
        
    });

    return {
        status,
        errors
    };

}

const isEmailValid = (name: string, value: undefined): InputValidatorType => {

    const isEmailValid = Boolean(isEmailValidRegex.test(String(value)))
    if(!isEmailValid) {
        return {status: false, message: `${name} is not valid email address!`}
    }else{
        return {status: true}
    }
}

const isRequired = (name: string, value: undefined): InputValidatorType => {
    if(!value) {
        return {status: false, message: `${name} is required!`}
    }else{
        return {status: true}
    }
}

const regexValid = (name: string, value: undefined, rule: string, message: string): InputValidatorType => {
    if(!Boolean(new RegExp(rule).test(String(value)))) {
        return {status: false, message: `${name} ${message}`}
    }else{
        return {status: true}
    }
}


export default inputValidator;