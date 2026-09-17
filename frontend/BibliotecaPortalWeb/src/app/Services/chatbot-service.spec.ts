import { TestBed } from '@angular/core/testing';

import { ChatbotServiceTs } from './chatbot-service.ts';

describe('ChatbotServiceTs', () => {
  let service: ChatbotServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatbotServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
