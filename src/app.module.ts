import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './features/item/item.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ItemModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
