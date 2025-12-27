import bcrypt from "bcryptjs"

export async function compareSalt(password: string, hash: string) {
	const isPasswordValid = await bcrypt.compare(password, hash)
	return isPasswordValid
}

export async function hashSalt(password: string) {
	const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS!))
	const hashedPassword = await bcrypt.hash(password, salt)
	return hashedPassword
}
