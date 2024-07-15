import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { randomUUID } from 'crypto';

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Post('create')
  async createUser(@Body() body: any) {
    const { name, email } = body;
    const user = await this.prisma.user.create({
      data: {
        id: randomUUID(),
        name,
        email,
      },
    });

    return {
      user,
    };
  }
}
