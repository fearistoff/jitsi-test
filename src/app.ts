import { defineComponent, nextTick, ref } from "vue";

interface IJitsiMeetOptions {
  roomName: string;
  width?: number | string;
  height?: number | string;
  parentNode: Element;
  jwt: string;
  lang?: string;
  configOverwrite?: {
    prejoinPageEnabled?: boolean;
    hideDisplayName?: boolean;
    participantsPane?: {
      hideModeratorSettingsTab?: boolean;
      hideMoreActionsButton?: boolean;
      hideMuteAllButton?: boolean;
    };
    hideConferenceSubject?: boolean;
    disableProfile?: boolean;
    startWithAudioMuted?: boolean;
    startAudioOnly?: boolean;
    apiLogLevels?: string;
    toolbarButtons?: string[];
    defaultLocalDisplayName?: string;
    defaultRemoteDisplayName?: string;
    prejoinConfig?: {
      enabled?: boolean;
      hideDisplayName?: boolean;
      hideExtraJoinButtons?: string[];
    };
    sandbox?: string;
  };
  devices?: {
    audioInput?: string;
    audioOutput?: string;
    videoInput?: string;
  };
}

export default defineComponent({
  name: "TimeLine",
  setup: () => {
    const meetContainer = ref<HTMLElement | null>(null);
    const meetDomain = ref<string>(
      localStorage.getItem("meetDomain") || "meet.jit.si"
    );
    const roomName = ref<string>(
      localStorage.getItem("roomName") || "someRandomName"
    );
    const userToken = ref<string>(localStorage.getItem("userToken") || "");
    const micOn = ref<boolean>(localStorage.getItem("micOn") === "true");
    const cameraOn = ref<boolean>(localStorage.getItem("cameraOn") === "true");
    const prejoinPage = ref<boolean>(
      localStorage.getItem("prejoinPage") === "true"
    );

    const connect = async () => {
      if (meetContainer.value) {
        meetContainer.value.innerHTML = "";
        await nextTick();
        const options: IJitsiMeetOptions = {
          roomName: roomName.value,
          parentNode: meetContainer.value,
          jwt: userToken.value,
          configOverwrite: {
            startAudioOnly: !cameraOn.value,
            startWithAudioMuted: !micOn.value,
            prejoinPageEnabled: prejoinPage.value,
            prejoinConfig: {
              enabled: prejoinPage.value,
            },
            sandbox: "allow-scripts allow-same-origin allow-popups allow-forms",
          },
          lang: "ru",
        };
        new JitsiMeetExternalAPI(meetDomain.value, options);
      }
    };

    return {
      meetDomain,
      roomName,
      userToken,
      meetContainer,
      micOn,
      cameraOn,
      prejoinPage,
      connect,
    };
  },
});
