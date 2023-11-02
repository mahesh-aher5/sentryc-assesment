import { Controller, Get } from '@nestjs/common';
import { FormAutomationService } from './form-automation.service';
import data from 'dummy-data';

@Controller('form-automation')
export class FormAutomationController {

    constructor(private readonly formAutomationService: FormAutomationService) {}

  @Get()
  async submitForm() {
    await this.formAutomationService.fillFormWithData(data);
    return { message: 'Form submitted successfully' };
  }
}
