import { Injectable } from '@nestjs/common';
import { SessionsClient } from '@google-cloud/dialogflow';

@Injectable()
export class DialogflowService {
  private readonly sessionClient = new SessionsClient();
  private readonly projectId = 'lizza-vnjk';

  async detectIntent(userId: string, text: string) {
    const sessionPath = this.sessionClient.projectAgentSessionPath(
      this.projectId,
      userId,
    );
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text,
          languageCode: 'en-US',
        },
      },
    };
    const [response, ,] = await this.sessionClient.detectIntent(request);
    return response;
  }
}
