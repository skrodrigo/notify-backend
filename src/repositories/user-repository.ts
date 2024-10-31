import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import type { User, UserCreate } from '../models/user-model'

export class UserRepository {
  private prisma: PrismaClient = new PrismaClient()

  public async create(data: UserCreate): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    })

    return user
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    })
    return user
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    })
    return user
  }
}
