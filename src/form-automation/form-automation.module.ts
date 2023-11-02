import { Module } from '@nestjs/common';
import { FormAutomationService } from './form-automation.service';
import { FormAutomationController } from './form-automation.controller';

@Module({
  providers: [FormAutomationService],
  controllers: [FormAutomationController],
})
export class FormAutomationModule {}
