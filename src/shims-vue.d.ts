/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare class JitsiMeetExternalAPI {
  constructor(
      domain: string,
      // duplicates external-libraries/jitsi.ts#IJitsiMeetOptions
      options: {
        roomName: string;
        width?: number | string;
        height?: number | string;
        parentNode: Element;
        lang?: string;
      }
  );
  executeCommand(
      command: string | { [key: string]: string[] },
      parameter?: string
  ): void;
  addListener(event: string, listener: Function);
  getCurrentDevices(): Promise<{
    audioInput?: {
      deviceId: string;
      groupId: string;
      kind: string;
      label: string;
    };
    audioOutput?: {
      deviceId: string;
      groupId: string;
      kind: string;
      label: string;
    };
    videoInput?: {
      deviceId: string;
      groupId: string;
      kind: string;
      label: string;
    };
  }>;
  getParticipantsInfo(): any[];
}
