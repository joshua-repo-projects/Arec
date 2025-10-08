import bcrypt from "bcryptjs"


export const hashPassword = (password: string | number) => {
    if (typeof password === 'number') {
        return bcrypt.hashSync(password.toString(), 10)
    }
    return bcrypt.hashSync(password, 10)
}

export const checkPassword = (password: string | number, hashPassword: string) => {
    return bcrypt.compareSync(password.toString(), hashPassword)
}