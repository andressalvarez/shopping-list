import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  createItem(@Body() createItemDto: CreateItemDto) {
    return this.itemService.createItem(createItemDto);
  }

  @Get()
  getAllItems() {
    return this.itemService.getAllItems();
  }

  @Get(':id')
  getItemByID(@Param('id') id: string) {
    return this.itemService.getItemByID(+id);
  }

  @Patch(':id')
  updatePlayers(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.updatePlayers(+id, updateItemDto);
  }

  @Delete(':id')
  deletePlayer(@Param('id') id: string) {
    return this.itemService.deletePlayer(+id);
  }
}
