import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPEN_API_KEY');

    if (!apiKey) {
      throw new Error(
        'OPEN_API_KEY is not defined. Please define it in your environment variables.',
      );
    }

    this.openai = new OpenAI({
      apiKey,
    });
  }
}
