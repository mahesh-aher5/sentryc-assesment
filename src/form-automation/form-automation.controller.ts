import { Controller, Get, Param, Query } from '@nestjs/common';
import { FormAutomationService } from './form-automation.service';
import data from 'test-data';

@Controller('form-automation')
export class FormAutomationController {
  constructor(private readonly formAutomationService: FormAutomationService) {}

  @Get()
  async submitForm(@Query('headless') headless: string) {
    await this.formAutomationService.fillFormWithData(headless, data);
    return { message: 'Form submitted successfully' };
  }
}
