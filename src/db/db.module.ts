import { Global, Module } from '@nestjs/common';
import { Db } from './db';
@Global()
@Module({
  exports: [Db],
  providers: [Db],
})
export class DbModule {}

