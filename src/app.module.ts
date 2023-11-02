import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormAutomationModule } from './form-automation/form-automation.module';

@Module({
  imports: [FormAutomationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
