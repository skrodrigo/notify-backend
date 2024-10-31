import bcrypt from 'bcrypt'
import type { UserCreate } from '../models/user-model'
import { UserRepository } from '../repositories/user-repository'

export class AuthService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async register(userData: UserCreate) {
    const existingUser = await this.userRepository.findByEmail(userData.email)
    if (existingUser) {
      throw new Error('Email already registered')
    }

    const user = await this.userRepository.create(userData)
    return user
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new Error('Invalid credentials')
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      throw new Error('Invalid credentials')
    }

    return user
  }
}
