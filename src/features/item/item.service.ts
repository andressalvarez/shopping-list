import { Injectable } from '@nestjs/common';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from '@prisma/client';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async createItem(data: CreateItemDto): Promise<Item> {
    return this.prisma.item.create({
      data,
    });
  }

  async getAllItems(): Promise<Item[]> {
    return this.prisma.item.findMany();
  }

  async getItemByID(id: number): Promise<Item> {
    return this.prisma.item.findUnique({
      where: {
        id: id,
      },
    });
  }

  async updatePlayers(id: number, data: UpdateItemDto): Promise<Item> {
    return this.prisma.item.update({
      where: {
        id,
      },
      data,
    });
  }

  async deletePlayer(id: number): Promise<Item> {
    return this.prisma.item.delete({
      where: {
        id,
      },
    });
  }
}
